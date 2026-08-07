'use client';

import { useEffect, useRef, useCallback } from 'react';
import { Npc } from '@/types/npc';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { useGame } from '@/contexts/GameContext';
import { getDialogueTree, getEntryNode, getNode } from '@/data/dialogues/index';
import { getAvailableChoices } from '@/engine/selectors';
import { DialogueChoice } from '@/types/dialogue';

interface ConversationProps {
  npc: Npc;
}

export function Conversation({ npc }: ConversationProps) {
  const { state, dispatch } = useGame();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const tree = getDialogueTree(npc.id);
  const conv = state.conversations[npc.id];
  const messages = conv?.messages || [];

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages.length, scrollToBottom]);

  // Start conversation if none exists
  const handleStart = () => {
    if (!tree) return;
    const entry = getEntryNode(tree);
    if (!entry) return;

    dispatch({ type: 'SET_CONVERSATION_NODE', npcId: npc.id, nodeId: entry.id });
    dispatch({
      type: 'SEND_MESSAGE',
      npcId: npc.id,
      message: '',
      choiceId: 'system-start',
    });
    // Add NPC's entry message
    const convState = state.conversations[npc.id] || {
      messages: [], currentNodeId: entry.id, completed: false, unlockedNodes: [],
    };
    const entryTimestamp = (convState.messages.at(-1)?.timestamp ?? 0) + 1;
    dispatch({
      type: 'LOAD_STATE',
      state: {
        ...state,
        conversations: {
          ...state.conversations,
          [npc.id]: {
            ...convState,
            currentNodeId: entry.id,
            messages: [
              ...convState.messages,
              {
                id: `npc-${npc.id}-${entryTimestamp}`,
                fromPlayer: false,
                text: entry.text,
                timestamp: entryTimestamp,
              },
            ],
          },
        },
      },
    });
  };

  const handleChoice = (choice: DialogueChoice) => {
    if (!tree) return;

    const currentMessages = state.conversations[npc.id]?.messages || [];
    const playerTimestamp = (currentMessages.at(-1)?.timestamp ?? 0) + 1;

    // Add player message
    const playerMsg = {
      id: `p-${npc.id}-${playerTimestamp}`,
      fromPlayer: true,
      text: choice.text,
      timestamp: playerTimestamp,
    };
    const newMessages = [...currentMessages, playerMsg];

    // Apply effects
    if (choice.trustChange) {
      dispatch({ type: 'CHANGE_TRUST', npcId: npc.id, amount: choice.trustChange });
    }
    if (choice.setFlag) {
      dispatch({ type: 'SET_FLAG', flag: choice.setFlag });
    }
    if (choice.collectEvidence) {
      dispatch({ type: 'COLLECT_EVIDENCE', evidenceId: choice.collectEvidence });
    }

    // Get next node
    let nextNodeId = choice.nextNodeId;
    let npcMsg = null;

    if (nextNodeId) {
      const nextNode = getNode(tree, nextNodeId);
      if (nextNode) {
        // Check if player meets requirements for this node
        const trust = state.trust[npc.id] || 0;
        const npcTimestamp = playerTimestamp + 1;
        if (nextNode.requiresTrust && trust + (choice.trustChange || 0) < nextNode.requiresTrust) {
          npcMsg = {
            id: `npc-${npc.id}-${npcTimestamp}`,
            fromPlayer: false,
            text: 'I\'m not sure I trust you enough to share that yet.',
            timestamp: npcTimestamp,
          };
          nextNodeId = null;
        } else {
          npcMsg = {
            id: `npc-${npc.id}-${npcTimestamp}`,
            fromPlayer: false,
            text: nextNode.text,
            timestamp: npcTimestamp,
          };
        }
      }
    }

    const finalMessages = npcMsg ? [...newMessages, npcMsg] : newMessages;

    dispatch({
      type: 'LOAD_STATE',
      state: {
        ...state,
        trust: {
          ...state.trust,
          [npc.id]: Math.min(100, Math.max(0, (state.trust[npc.id] || 0) + (choice.trustChange || 0))),
        },
        questFlags: {
          ...state.questFlags,
          ...(choice.setFlag ? { [choice.setFlag]: true } : {}),
        },
        collectedEvidence: choice.collectEvidence && !state.collectedEvidence.includes(choice.collectEvidence)
          ? [...state.collectedEvidence, choice.collectEvidence]
          : state.collectedEvidence,
        conversations: {
          ...state.conversations,
          [npc.id]: {
            messages: finalMessages,
            currentNodeId: nextNodeId,
            completed: nextNodeId === null,
            unlockedNodes: state.conversations[npc.id]?.unlockedNodes || [],
          },
        },
      },
    });
  };

  // Get current choices
  const currentNodeId = conv?.currentNodeId;
  const currentNode = tree && currentNodeId ? getNode(tree, currentNodeId) : null;
  const availableChoices = currentNode ? getAvailableChoices(state, currentNode) : [];

  if (!tree) {
    return (
      <div className="p-8 text-center text-text-muted">
        {npc.displayName} isn&apos;t available for conversation right now.
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] md:h-screen">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-bg-surface">
        <Avatar name={npc.displayName} color={npc.color} size="sm" />
        <div>
          <div className="font-bold text-text-primary text-sm">{npc.displayName}</div>
          <div className="text-text-muted text-xs">@{npc.handle}</div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 && (
          <div className="text-center py-12">
            <Avatar name={npc.displayName} color={npc.color} size="lg" />
            <h3 className="mt-3 font-bold text-text-primary">{npc.displayName}</h3>
            <p className="text-text-muted text-sm mt-1">{npc.bio}</p>
            <Button className="mt-4" onClick={handleStart}>
              Start Conversation
            </Button>
          </div>
        )}
        {messages.filter(m => m.text).map(msg => (
          <div key={msg.id} className={`flex ${msg.fromPlayer ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                msg.fromPlayer
                  ? 'bg-accent text-white rounded-br-sm'
                  : 'bg-bg-elevated text-text-primary rounded-bl-sm'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Choices */}
      {availableChoices.length > 0 && (
        <div className="border-t border-border p-3 space-y-2 bg-bg-surface">
          {availableChoices.map(choice => (
            <button
              key={choice.id}
              onClick={() => handleChoice(choice)}
              className="w-full text-left px-4 py-2.5 rounded-lg bg-bg-elevated hover:bg-bg-hover text-text-primary text-sm transition-colors border border-border hover:border-accent cursor-pointer"
            >
              {choice.text}
            </button>
          ))}
        </div>
      )}

      {conv?.completed && (
        <div className="border-t border-border p-3 bg-bg-surface text-center text-text-muted text-sm">
          Conversation ended.
          <button
            onClick={handleStart}
            className="ml-2 text-accent bg-transparent border-none cursor-pointer text-sm underline"
          >
            Start new conversation
          </button>
        </div>
      )}
    </div>
  );
}
