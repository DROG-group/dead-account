'use client';

import { useState, useEffect, useRef } from 'react';
import {
  YamlStory,
  StoryState,
  YamlNode,
  YamlChoice,
  getAvailableChoices,
  advanceState,
  applyEffects,
  saveStoryProgress,
  markStoryPlayed,
} from '@/lib/yaml-story';
import { Avatar } from '@/components/ui/Avatar';
import { getInitials } from '@/lib/utils';

// Generate a consistent color from NPC name
function npcColor(name: string): string {
  const colors = [
    '#e0479e', '#f4a261', '#e63946', '#457b9d', '#d36ba6',
    '#2a9d8f', '#a8dadc', '#264653', '#6b8f71', '#d4a373',
    '#e07a5f', '#81b29a', '#9c6644', '#bc4749', '#577590',
    '#ff6b6b', '#4ecdc4', '#ff9ff3', '#48dbfb', '#feca57',
    '#636e72', '#74b9ff', '#a29bfe', '#fdcb6e', '#6c5ce7',
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

interface HistoryEntry {
  node: YamlNode;
  chosenText?: string;
}

interface StoryRendererProps {
  story: YamlStory;
  storyId: string;
  initialState: StoryState;
  onComplete?: () => void;
}

export function StoryRenderer({ story, storyId, initialState, onComplete }: StoryRendererProps) {
  const [state, setState] = useState<StoryState>(initialState);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const currentNode = story.nodes[state.currentNodeId];

  // Build history on mount from state.history
  useEffect(() => {
    const entries: HistoryEntry[] = [];
    for (let i = 0; i < state.history.length; i++) {
      const nodeId = state.history[i];
      const node = story.nodes[nodeId];
      if (node) {
        entries.push({ node });
      }
    }
    setHistory(entries);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, isTyping]);

  // Save progress on state change
  useEffect(() => {
    saveStoryProgress(storyId, state);
  }, [state, storyId]);

  const handleChoice = (choice: YamlChoice, choiceIndex: number) => {
    const node = story.nodes[state.currentNodeId];
    if (!node) return;

    // Add current node to visible history with the chosen text
    setHistory(prev => [...prev, { node, chosenText: choice.text }]);

    // Show typing indicator briefly
    setIsTyping(true);
    setTimeout(() => {
      const newState = advanceState(state, story, choiceIndex);
      setState(newState);
      setIsTyping(false);

      // Check if story is complete
      if (newState.completed || !story.nodes[newState.currentNodeId]) {
        markStoryPlayed(storyId);
        onComplete?.();
      }
    }, 400 + Math.random() * 400);
  };

  const instanceName = story.meta.bot?.display_name || story.meta.title;

  return (
    <div className="min-h-screen flex flex-col" ref={scrollRef}>
      {/* Header */}
      <header className="sticky top-0 z-10 bg-bg-primary/90 backdrop-blur border-b border-border px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white text-sm font-bold">
            {getInitials(instanceName)}
          </div>
          <div>
            <h1 className="text-sm font-bold text-text-primary">{story.meta.title}</h1>
            <p className="text-xs text-text-muted">{instanceName}</p>
          </div>
          {/* Stats */}
          <div className="ml-auto flex gap-3 text-xs text-text-muted">
            {state.vars.evidence_total > 0 && (
              <span className="text-evidence">Evidence: {state.vars.evidence_total}</span>
            )}
            {state.vars.night_witnesses > 0 && (
              <span>Witnesses: {state.vars.night_witnesses}</span>
            )}
          </div>
        </div>
      </header>

      {/* Story Content */}
      <div className="flex-1 max-w-2xl mx-auto w-full">
        {/* History */}
        {history.map((entry, i) => (
          <div key={i}>
            <NodeDisplay node={entry.node} story={story} />
            {entry.chosenText && (
              <div className="px-4 py-2 flex justify-end">
                <div className="bg-accent text-white rounded-2xl rounded-br-sm px-4 py-2 max-w-[80%] text-sm">
                  {entry.chosenText}
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="px-4 py-3">
            <div className="bg-bg-surface rounded-lg px-4 py-3 inline-block">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        {/* Current Node & Choices */}
        {!isTyping && currentNode && !state.completed && (
          <div>
            <NodeDisplay node={currentNode} story={story} />
            <ChoiceList
              node={currentNode}
              vars={state.vars}
              onChoose={handleChoice}
            />
          </div>
        )}

        {/* Completion */}
        {state.completed && (
          <div className="px-4 py-8 text-center">
            <div className="bg-bg-surface border border-border rounded-lg p-6 max-w-md mx-auto">
              <h2 className="text-lg font-bold text-text-primary mb-2">Story Complete</h2>
              <p className="text-text-secondary text-sm mb-4">
                You&apos;ve finished this investigation.
              </p>
              <button
                onClick={() => window.location.href = '/stories'}
                className="mastodon-btn"
              >
                Back to Stories
              </button>
            </div>
          </div>
        )}

        <div ref={bottomRef} className="h-4" />
      </div>
    </div>
  );
}

// ===== Node Display =====

function NodeDisplay({ node, story }: { node: YamlNode; story: YamlStory }) {
  if (node.type === 'tweet') {
    return <TweetNode node={node} story={story} />;
  }
  return <MessageNode node={node} story={story} />;
}

function TweetNode({ node, story }: { node: YamlNode; story: YamlStory }) {
  const npcId = node.from || 'unknown';
  const npcData = story.meta.npcs[npcId];
  const name = npcData?.name || npcId;
  const color = npcColor(name);

  return (
    <article className="border-b border-border px-4 py-3">
      <div className="flex gap-3">
        <Avatar name={name} color={color} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-text-primary text-sm">{name}</span>
            <span className="text-text-muted text-sm">@{npcId}</span>
          </div>
          <div className="mt-1 text-text-primary text-[15px] leading-relaxed whitespace-pre-wrap">
            {node.text}
          </div>
        </div>
      </div>
    </article>
  );
}

function MessageNode({ node, story }: { node: YamlNode; story: YamlStory }) {
  const instanceName = story.meta.bot?.display_name || 'System';

  // Check if the text starts with an NPC name (e.g. "BRIGITTE: ...")
  const npcMatch = node.text.match(/^([A-ZÀÂÇÉÈÊËÎÏÔÛÙÜŸÑÆŒ][A-ZÀÂÇÉÈÊËÎÏÔÛÙÜŸÑÆŒ\s'-]+):\s/);

  if (npcMatch) {
    const npcName = npcMatch[1].trim();
    const text = node.text.substring(npcMatch[0].length);
    // Find the NPC in the story data
    const npcEntry = Object.entries(story.meta.npcs).find(
      ([, v]) => v.name.toUpperCase().startsWith(npcName) || v.name.split(' ')[0].toUpperCase() === npcName
    );
    const displayName = npcEntry ? npcEntry[1].name : npcName.charAt(0) + npcName.slice(1).toLowerCase();
    const color = npcColor(displayName);

    return (
      <div className="px-4 py-3">
        <div className="flex gap-3">
          <Avatar name={displayName} color={color} size="sm" />
          <div className="bg-bg-surface rounded-lg rounded-tl-sm px-4 py-3 max-w-[85%]">
            <p className="text-xs font-bold text-accent mb-1">{displayName}</p>
            <p className="text-text-primary text-sm leading-relaxed whitespace-pre-wrap">{text}</p>
          </div>
        </div>
      </div>
    );
  }

  // System/narrative message
  // Check if it's a quest announcement
  const isQuest = node.text.startsWith('QUEST:');

  if (isQuest) {
    const lines = node.text.split('\n');
    const title = lines[0].replace('QUEST:', '').trim();
    const desc = lines.slice(1).join('\n').trim();

    return (
      <div className="px-4 py-4">
        <div className="bg-accent/10 border border-accent/30 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-accent text-lg">&#9733;</span>
            <h3 className="font-bold text-accent text-sm">{title}</h3>
          </div>
          <p className="text-text-secondary text-sm leading-relaxed whitespace-pre-wrap">{desc}</p>
        </div>
      </div>
    );
  }

  // Regular narrative
  return (
    <div className="px-4 py-3">
      <div className="bg-bg-surface border border-border rounded-lg p-4">
        <p className="text-text-primary text-sm leading-relaxed whitespace-pre-wrap">{node.text}</p>
      </div>
    </div>
  );
}

// ===== Choice List =====

function ChoiceList({
  node,
  vars,
  onChoose,
}: {
  node: YamlNode;
  vars: Record<string, number>;
  onChoose: (choice: YamlChoice, index: number) => void;
}) {
  const available = getAvailableChoices(node, vars);

  if (available.length === 0) return null;

  return (
    <div className="px-4 py-3 space-y-2">
      {available.map((choice, i) => (
        <button
          key={i}
          onClick={() => onChoose(choice, i)}
          className="w-full text-left bg-bg-surface hover:bg-bg-hover border border-border hover:border-accent/50 rounded-lg px-4 py-3 text-sm text-text-primary transition-all cursor-pointer"
        >
          {choice.text}
        </button>
      ))}
    </div>
  );
}
