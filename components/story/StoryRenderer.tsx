'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  YamlStory,
  StoryState,
  YamlNode,
  YamlChoice,
  getAvailableChoices,
  advanceState,
  saveStoryProgress,
  markStoryPlayed,
} from '@/lib/yaml-story';
import { Avatar } from '@/components/ui/Avatar';
import { getInitials } from '@/lib/utils';

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

// Fake engagement numbers from node id
function fakeEngagement(nodeId: string) {
  let hash = 0;
  for (let i = 0; i < nodeId.length; i++) {
    hash = nodeId.charCodeAt(i) + ((hash << 5) - hash);
  }
  const h = Math.abs(hash);
  return {
    likes: (h % 47) + 1,
    boosts: (h % 12),
    replies: ((h >> 4) % 8),
  };
}

// Fake relative time from node id
function fakeTime(nodeId: string): string {
  let hash = 0;
  for (let i = 0; i < nodeId.length; i++) {
    hash = nodeId.charCodeAt(i) + ((hash << 5) - hash);
  }
  const h = Math.abs(hash);
  const options = ['2m', '7m', '14m', '23m', '38m', '1h', '2h', '3h', '5h', '8h', '12h', '1d', '2d', '3d'];
  return options[h % options.length];
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

function buildHistory(story: YamlStory, state: StoryState): HistoryEntry[] {
  return state.history.flatMap((nodeId) => {
    const node = story.nodes[nodeId];
    return node ? [{ node }] : [];
  });
}

export function StoryRenderer({ story, storyId, initialState, onComplete }: StoryRendererProps) {
  const router = useRouter();
  const [state, setState] = useState<StoryState>(initialState);
  const [history, setHistory] = useState<HistoryEntry[]>(() => buildHistory(story, initialState));
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const currentNode = story.nodes[state.currentNodeId];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, isTyping]);

  useEffect(() => {
    saveStoryProgress(storyId, state);
  }, [state, storyId]);

  const handleChoice = (choice: YamlChoice, choiceIndex: number) => {
    const node = story.nodes[state.currentNodeId];
    if (!node) return;

    setHistory(prev => [...prev, { node, chosenText: choice.text }]);
    setIsTyping(true);

    setTimeout(() => {
      const newState = advanceState(state, story, choiceIndex);
      setState(newState);
      setIsTyping(false);

      if (newState.completed || !story.nodes[newState.currentNodeId]) {
        markStoryPlayed(storyId);
        onComplete?.();
      }
    }, 300 + Math.random() * 300);
  };

  const instanceName = story.meta.bot?.display_name || story.meta.title;
  const instanceInitial = getInitials(instanceName).charAt(0);

  // Sidebar nav items for story mode
  const evidenceCount = state.vars.evidence_total || 0;
  const witnessCount = state.vars.night_witnesses || 0;

  return (
    <div className="flex min-h-screen">
      {/* Sidebar — desktop only */}
      <aside className="hidden md:flex flex-col w-64 h-screen sticky top-0 border-r border-border bg-bg-surface p-4">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-white font-bold text-lg">
            {instanceInitial}
          </div>
          <div>
            <div className="font-bold text-text-primary text-sm">{instanceName}</div>
            <div className="text-text-muted text-xs">Investigation Mode</div>
          </div>
        </div>

        <nav className="flex flex-col gap-1 flex-1">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium bg-accent/15 text-accent">
            <span className="text-lg">{'\ud83c\udfe0'}</span>
            <span>Feed</span>
          </div>
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-text-secondary">
            <span className="text-lg">{'\u2709\ufe0f'}</span>
            <span>Messages</span>
          </div>
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-text-secondary">
            <span className="text-lg">{'\ud83d\udccc'}</span>
            <span>Evidence</span>
            {evidenceCount > 0 && (
              <span className="ml-auto bg-evidence/20 text-evidence text-xs px-1.5 py-0.5 rounded-full">
                {evidenceCount}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-text-secondary">
            <span className="text-lg">{'\ud83d\udcdd'}</span>
            <span>Quest Log</span>
          </div>
        </nav>

        <div className="border-t border-border pt-4 mt-4">
          {witnessCount > 0 && (
            <div className="text-xs text-text-muted mb-1">Witnesses: {witnessCount}</div>
          )}
          {evidenceCount > 0 && (
            <div className="text-xs text-evidence">Evidence collected: {evidenceCount}</div>
          )}
          <button
            onClick={() => router.push('/stories')}
            className="mt-3 text-xs text-text-muted hover:text-text-secondary bg-transparent border-none cursor-pointer p-0"
          >
            &larr; All Stories
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-h-screen pb-16 md:pb-0">
        <div className="max-w-2xl mx-auto">
          {/* Page header */}
          <div className="sticky top-0 z-10 bg-bg-primary/90 backdrop-blur border-b border-border px-4 py-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.push('/stories')}
                className="md:hidden text-text-muted hover:text-text-primary bg-transparent border-none cursor-pointer text-sm p-0"
              >
                &larr;
              </button>
              <div>
                <h1 className="font-bold text-text-primary text-lg">Home</h1>
                <p className="text-text-muted text-xs mt-0.5">{instanceName} timeline</p>
              </div>
            </div>
          </div>

          {/* Feed content */}
          {history.map((entry, i) => (
            <div key={i}>
              <NodeDisplay node={entry.node} story={story} />
              {entry.chosenText && (
                <PlayerAction text={entry.chosenText} />
              )}
            </div>
          ))}

          {isTyping && <LoadingPost />}

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

          {state.completed && (
            <div className="px-4 py-8 text-center">
              <div className="bg-bg-surface border border-border rounded-lg p-6 max-w-md mx-auto">
                <h2 className="text-lg font-bold text-text-primary mb-2">Investigation Complete</h2>
                <p className="text-text-secondary text-sm mb-4">
                  You&apos;ve finished this investigation.
                </p>
                <button
                  onClick={() => router.push('/stories')}
                  className="mastodon-btn"
                >
                  Back to Stories
                </button>
              </div>
            </div>
          )}

          <div ref={bottomRef} className="h-4" />
        </div>
      </main>

      {/* Mobile nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-bg-surface border-t border-border flex z-40">
        <div className="flex-1 flex flex-col items-center py-2 text-xs text-accent">
          <span className="text-lg">{'\ud83c\udfe0'}</span>
          <span>Feed</span>
        </div>
        <div className="flex-1 flex flex-col items-center py-2 text-xs text-text-muted">
          <span className="text-lg">{'\u2709\ufe0f'}</span>
          <span>DMs</span>
        </div>
        <div className="flex-1 flex flex-col items-center py-2 text-xs text-text-muted relative">
          <span className="text-lg relative">
            {'\ud83d\udccc'}
            {evidenceCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-evidence text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {evidenceCount}
              </span>
            )}
          </span>
          <span>Evidence</span>
        </div>
        <div className="flex-1 flex flex-col items-center py-2 text-xs text-text-muted">
          <span className="text-lg">{'\ud83d\udcdd'}</span>
          <span>Quest</span>
        </div>
      </nav>
    </div>
  );
}

// ===== Player Action (your chosen response) =====

function PlayerAction({ text }: { text: string }) {
  return (
    <div className="border-b border-border px-4 py-2 bg-accent/5">
      <div className="flex items-center gap-2 text-xs text-accent">
        <span>&rarr;</span>
        <span className="font-medium">{text}</span>
      </div>
    </div>
  );
}

// ===== Loading Post =====

function LoadingPost() {
  return (
    <article className="border-b border-border px-4 py-3">
      <div className="flex gap-3">
        <div className="w-12 h-12 rounded-full bg-bg-surface animate-pulse shrink-0" />
        <div className="flex-1 space-y-2 py-1">
          <div className="h-3 bg-bg-surface rounded animate-pulse w-1/3" />
          <div className="h-3 bg-bg-surface rounded animate-pulse w-2/3" />
          <div className="h-3 bg-bg-surface rounded animate-pulse w-1/2" />
        </div>
      </div>
    </article>
  );
}

// ===== Node Display =====

function NodeDisplay({ node, story }: { node: YamlNode; story: YamlStory }) {
  if (node.type === 'tweet') {
    return <TweetNode node={node} story={story} />;
  }
  return <MessageNode node={node} story={story} />;
}

// ===== Tweet Node — looks like a Mastodon post =====

function TweetNode({ node, story }: { node: YamlNode; story: YamlStory }) {
  const [liked, setLiked] = useState(false);
  const npcId = node.from || 'unknown';
  const npcData = story.meta.npcs[npcId];
  const name = npcData?.name || npcId;
  const handle = npcId.replace(/\s/g, '_').toLowerCase();
  const bio = npcData?.bio || '';
  const color = npcColor(name);
  const { likes, boosts, replies } = fakeEngagement(node.id);
  const time = fakeTime(node.id);

  return (
    <article className="border-b border-border px-4 py-3 hover:bg-bg-surface/50 transition-colors">
      <div className="flex gap-3">
        <div className="shrink-0 group relative">
          <Avatar name={name} color={color} />
          {/* Mini profile tooltip */}
          <div className="hidden group-hover:block absolute left-0 top-full mt-1 z-20 w-64 bg-bg-surface border border-border rounded-lg p-3 shadow-lg">
            <div className="flex items-center gap-2 mb-2">
              <Avatar name={name} color={color} size="sm" />
              <div>
                <p className="font-bold text-text-primary text-sm">{name}</p>
                <p className="text-text-muted text-xs">@{handle}</p>
              </div>
            </div>
            {bio && <p className="text-text-secondary text-xs">{bio}</p>}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-text-primary text-sm hover:underline cursor-pointer">{name}</span>
            <span className="text-text-muted text-sm">@{handle}</span>
            <span className="text-text-muted text-sm">&middot;</span>
            <span className="text-text-muted text-sm">{time}</span>
          </div>
          <div className="mt-1 text-text-primary text-[15px] leading-relaxed whitespace-pre-wrap">
            {node.text}
          </div>
          {/* Action bar */}
          <div className="flex items-center gap-6 mt-2 text-text-muted">
            <span className="flex items-center gap-1.5 text-sm hover:text-accent cursor-pointer transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/>
              </svg>
              {replies}
            </span>
            <span className="flex items-center gap-1.5 text-sm hover:text-green-500 cursor-pointer transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 014-4h14"/><path d="M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 01-4 4H3"/>
              </svg>
              {boosts}
            </span>
            <button
              onClick={() => setLiked(!liked)}
              className={`flex items-center gap-1.5 text-sm cursor-pointer transition-colors bg-transparent border-none p-0 ${
                liked ? 'text-red-500' : 'text-text-muted hover:text-red-500'
              }`}
            >
              {liked ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
                </svg>
              )}
              {likes + (liked ? 1 : 0)}
            </button>
            <span className="flex items-center gap-1.5 text-sm hover:text-accent cursor-pointer transition-colors ml-auto">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/>
              </svg>
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

// ===== Message Node — DMs, narrative, quests =====

function MessageNode({ node, story }: { node: YamlNode; story: YamlStory }) {
  // Check if the text starts with an NPC name (DM conversation)
  const npcMatch = node.text.match(/^([A-Z\u00C0-\u024F][A-Z\u00C0-\u024F\s''-]+):\s/);

  if (npcMatch) {
    const npcName = npcMatch[1].trim();
    const text = node.text.substring(npcMatch[0].length);
    const npcEntry = Object.entries(story.meta.npcs).find(
      ([, v]) => v.name.toUpperCase().startsWith(npcName) || v.name.split(' ')[0].toUpperCase() === npcName
    );
    const displayName = npcEntry ? npcEntry[1].name : npcName.charAt(0) + npcName.slice(1).toLowerCase();
    const npcId = npcEntry ? npcEntry[0] : npcName.toLowerCase();
    const bio = npcEntry ? npcEntry[1].bio : '';
    const color = npcColor(displayName);

    return (
      <div className="border-b border-border">
        {/* DM header */}
        <div className="flex items-center gap-3 px-4 py-2 bg-bg-surface/50">
          <span className="text-text-muted text-xs">{'\u2709\ufe0f'} Direct Message</span>
        </div>
        <div className="px-4 py-3">
          <div className="flex gap-3">
            <div className="shrink-0 group relative">
              <Avatar name={displayName} color={color} size="sm" />
              <div className="hidden group-hover:block absolute left-0 top-full mt-1 z-20 w-64 bg-bg-surface border border-border rounded-lg p-3 shadow-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Avatar name={displayName} color={color} size="sm" />
                  <div>
                    <p className="font-bold text-text-primary text-sm">{displayName}</p>
                    <p className="text-text-muted text-xs">@{npcId}</p>
                  </div>
                </div>
                {bio && <p className="text-text-secondary text-xs">{bio}</p>}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-text-primary text-sm">{displayName}</span>
                <span className="text-text-muted text-xs">@{npcId}</span>
              </div>
              <div className="bg-bg-elevated rounded-lg px-3 py-2">
                <p className="text-text-primary text-sm leading-relaxed whitespace-pre-wrap">{text}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Quest announcement
  if (node.text.startsWith('QUEST:')) {
    const lines = node.text.split('\n');
    const title = lines[0].replace('QUEST:', '').trim();
    const desc = lines.slice(1).join('\n').trim();

    return (
      <div className="border-b border-border px-4 py-4">
        <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <span className="text-xl shrink-0">{'\ud83d\udd0d'}</span>
            <div>
              <h3 className="font-bold text-accent text-sm mb-1">{title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed whitespace-pre-wrap">{desc}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Regular narrative — instance notification style
  return (
    <div className="border-b border-border px-4 py-3">
      <div className="flex gap-3">
        <div className="w-12 h-12 rounded-full bg-bg-surface border border-border flex items-center justify-center text-text-muted text-sm shrink-0">
          {'\ud83d\udce1'}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-bold text-text-primary text-sm">{story.meta.bot?.display_name || 'System'}</span>
            <span className="text-text-muted text-xs">instance notice</span>
          </div>
          <p className="text-text-primary text-sm leading-relaxed whitespace-pre-wrap">{node.text}</p>
        </div>
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
    <div className="px-4 py-3 space-y-2 border-b border-border">
      <p className="text-text-muted text-xs mb-1">Choose your action:</p>
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
