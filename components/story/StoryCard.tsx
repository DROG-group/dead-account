'use client';

import { useGame } from '@/contexts/GameContext';
import { Button } from '@/components/ui/Button';

const storyCards: Record<string, { title: string; text: string }> = {
  quest2_start: {
    title: 'The Last Night',
    text: 'You\'ve made connections. Now it\'s time to dig deeper. Something happened the night Noor disappeared. Talk to witnesses who were nearby \u2014 the caf\u00e9, the art centre, the streets of Zuidhaven. Reconstruct the timeline.',
  },
  quest3_start: {
    title: 'The Locked Studio',
    text: 'The witnesses paint a picture: confrontation, fear, escape. But there\'s more to this story. Noor was working on something \u2014 something she found at the art centre. You need access to her studio. Build trust with David or Margriet to get the key.',
  },
  quest4_start: {
    title: 'Confrontation',
    text: 'You have the evidence. Two threads intertwine: a stalker who couldn\'t let go, and a corruption scandal that reaches into city hall. The time has come to confront someone. Choose wisely \u2014 the wrong accusation means the truth stays buried.',
  },
};

export function StoryCardOverlay() {
  const { state, dispatch } = useGame();

  if (!state.activeStoryCard) return null;
  const card = storyCards[state.activeStoryCard];
  if (!card) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
      <div className="bg-bg-surface border border-accent/30 rounded-lg max-w-md w-full p-8 text-center">
        <div className="text-accent text-3xl mb-4">\u2605</div>
        <h2 className="text-xl font-bold text-text-primary mb-3">{card.title}</h2>
        <p className="text-text-secondary text-sm leading-relaxed mb-6">{card.text}</p>
        <Button onClick={() => dispatch({ type: 'DISMISS_STORY_CARD' })}>Continue</Button>
      </div>
    </div>
  );
}
