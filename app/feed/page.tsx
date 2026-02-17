'use client';

import { useState } from 'react';
import Link from 'next/link';
import { GameShell } from '@/components/layout/GameShell';
import { Feed } from '@/components/feed/Feed';
import { useGame } from '@/contexts/GameContext';
import { allPosts } from '@/data/posts/index';
import { getVisiblePosts } from '@/engine/selectors';

function QuestHint() {
  const { state } = useGame();
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  let icon = '';
  let title = '';
  let hint = '';
  let linkHref = '';
  let linkText = '';

  if (state.currentQuest === 1) {
    const n = state.followedNpcs.length;
    icon = '\ud83d\udd0d';
    title = 'Getting Started';
    if (n === 0) {
      hint = 'Scroll down and read the posts. Click on people\'s names to visit their profiles, then hit Follow to build connections. Start with people close to Noor \u2014 her friend Lisa, her sister Yara, her neighbour Sophie.';
    } else if (n < 5) {
      hint = `You're following ${n}/5 people. Keep exploring profiles and following Noor's contacts. Look for people who might know something about what happened.`;
    } else {
      hint = 'Good work! You\'ve built a network. Check your Quest Log \u2014 it might be time to start talking to witnesses.';
      linkHref = '/quest';
      linkText = 'View Quest Log';
    }
  } else if (state.currentQuest === 2) {
    icon = '\ud83c\udf19';
    title = 'Reconstruct the Last Night';
    hint = 'Something happened the night Noor vanished. Go to Messages and talk to witnesses: Bas (saw Thomas at the caf\u00e9), Jan (saw a car), David (heard shouting), Sophie (Noor came to her door), Gerrit (saw someone running). Piece together the timeline.';
    linkHref = '/messages';
    linkText = 'Open Messages';
  } else if (state.currentQuest === 3) {
    icon = '\ud83d\udd11';
    title = 'Follow the Evidence';
    hint = 'Noor was working on something at the art centre. Build trust with David Chen or message other NPCs to access her studio. Look into the corruption angle too \u2014 the anonymous tipster, the council agenda, the land deal.';
    linkHref = '/evidence';
    linkText = 'Check Evidence Board';
  } else if (state.currentQuest === 4) {
    icon = '\u2694\ufe0f';
    title = 'Time to Confront';
    hint = 'You have enough evidence. Go to Messages and confront a suspect. Choose carefully: Thomas (stalking), De Vries (corruption), or Marco (the developer). Your choice determines the ending.';
    linkHref = '/messages';
    linkText = 'Go to Messages';
  }

  return (
    <div className="mx-4 mt-3 mb-1 bg-accent/10 border border-accent/20 rounded-lg p-4 relative">
      <button
        onClick={() => setDismissed(true)}
        className="absolute top-2 right-3 text-text-muted hover:text-text-primary bg-transparent border-none cursor-pointer text-lg"
        title="Dismiss hint"
      >
        &times;
      </button>
      <div className="flex items-start gap-3 pr-6">
        <span className="text-xl shrink-0">{icon}</span>
        <div>
          <h3 className="font-bold text-accent text-sm mb-1">{title}</h3>
          <p className="text-text-secondary text-sm leading-relaxed">{hint}</p>
          {linkHref && (
            <Link
              href={linkHref}
              className="inline-block mt-2 text-accent text-sm font-medium hover:underline"
            >
              {linkText} &rarr;
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default function FeedPage() {
  const { state } = useGame();
  const visiblePosts = getVisiblePosts(state, allPosts);

  return (
    <GameShell>
      <div className="border-b border-border px-4 py-3">
        <h1 className="font-bold text-text-primary text-lg">Home</h1>
        <p className="text-text-muted text-xs mt-0.5">zuidhaven.social timeline</p>
      </div>
      <QuestHint />
      <Feed posts={visiblePosts} emptyMessage="The timeline is empty. Something isn't right." />
    </GameShell>
  );
}
