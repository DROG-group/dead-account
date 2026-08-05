'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getPlayedStories, resetPlayHistory } from '@/lib/yaml-story';

interface StoryManifestEntry {
  id: string;
  file: string;
  country: string;
  town: string;
  instance: string;
  victim: string;
  role: string;
  threads: string[];
  title: string;
}

interface Manifest {
  stories: StoryManifestEntry[];
}

// Country flag emoji map
const countryFlags: Record<string, string> = {
  Netherlands: '\ud83c\uddf3\ud83c\uddf1', France: '\ud83c\uddeb\ud83c\uddf7', Germany: '\ud83c\udde9\ud83c\uddea',
  Spain: '\ud83c\uddea\ud83c\uddf8', Italy: '\ud83c\uddee\ud83c\uddf9', Portugal: '\ud83c\uddf5\ud83c\uddf9',
  Belgium: '\ud83c\udde7\ud83c\uddea', Austria: '\ud83c\udde6\ud83c\uddf9', Ireland: '\ud83c\uddee\ud83c\uddea',
  Greece: '\ud83c\uddec\ud83c\uddf7', Sweden: '\ud83c\uddf8\ud83c\uddea', Denmark: '\ud83c\udde9\ud83c\uddf0',
  Finland: '\ud83c\uddeb\ud83c\uddee', Poland: '\ud83c\uddf5\ud83c\uddf1', Czechia: '\ud83c\udde8\ud83c\uddff',
  Romania: '\ud83c\uddf7\ud83c\uddf4', Croatia: '\ud83c\udded\ud83c\uddf7', Hungary: '\ud83c\udded\ud83c\uddfa',
  Bulgaria: '\ud83c\udde7\ud83c\uddec', Slovakia: '\ud83c\uddf8\ud83c\uddf0', Slovenia: '\ud83c\uddf8\ud83c\uddee',
  Estonia: '\ud83c\uddea\ud83c\uddea', Latvia: '\ud83c\uddf1\ud83c\uddfb', Lithuania: '\ud83c\uddf1\ud83c\uddf9',
  Malta: '\ud83c\uddf2\ud83c\uddf9', Cyprus: '\ud83c\udde8\ud83c\uddfe', Luxembourg: '\ud83c\uddf1\ud83c\uddfa',
};

export default function StoriesPage() {
  const router = useRouter();
  const [manifest, setManifest] = useState<Manifest | null>(null);
  const [played, setPlayed] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Defer the browser-only localStorage read until after the first render so
    // the server and client produce identical hydration markup.
    queueMicrotask(() => setPlayed(getPlayedStories()));
    fetch('/stories/manifest.json')
      .then(r => r.json())
      .then(data => {
        setManifest(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleRandomStory = () => {
    if (!manifest) return;
    const unplayed = manifest.stories.filter(s => !played.includes(s.id));
    const pool = unplayed.length > 0 ? unplayed : manifest.stories;
    const pick = pool[Math.floor(Math.random() * pool.length)];
    router.push(`/play?story=${pick.id}`);
  };

  const handleReset = () => {
    resetPlayHistory();
    setPlayed([]);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-text-muted text-sm">Loading stories...</p>
      </div>
    );
  }

  if (!manifest) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-text-muted text-sm mb-4">Could not load story manifest.</p>
          <Link href="/" className="mastodon-btn-outline">Back to Home</Link>
        </div>
      </div>
    );
  }

  const total = manifest.stories.length;
  const playedCount = played.length;
  const remaining = total - playedCount;

  // Group by country
  const byCountry: Record<string, StoryManifestEntry[]> = {};
  for (const s of manifest.stories) {
    if (!byCountry[s.country]) byCountry[s.country] = [];
    byCountry[s.country].push(s);
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="max-w-3xl mx-auto px-4 py-8">
        <Link href="/" className="text-text-muted text-sm hover:text-text-secondary mb-4 inline-block">&larr; Back</Link>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-text-primary mb-2">DEAD ACCOUNT</h1>
          <p className="text-text-secondary text-sm mb-1">100 investigations across 27 EU countries</p>
          <p className="text-text-muted text-xs">Each story is a unique missing person investigation on a local Mastodon instance</p>
        </div>

        {/* Progress */}
        <div className="bg-bg-surface border border-border rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-text-secondary text-sm">Progress</span>
            <span className="text-text-primary text-sm font-bold">{playedCount} / {total}</span>
          </div>
          <div className="w-full bg-bg-primary rounded-full h-2">
            <div
              className="bg-accent rounded-full h-2 transition-all"
              style={{ width: `${(playedCount / total) * 100}%` }}
            />
          </div>
          <p className="text-text-muted text-xs mt-2">
            {remaining > 0 ? `${remaining} investigations remaining` : 'All investigations complete!'}
          </p>
        </div>

        {/* Random Story Button */}
        <div className="text-center mb-8">
          <button onClick={handleRandomStory} className="mastodon-btn text-base px-8 py-3">
            {playedCount === 0 ? 'Start Random Investigation' : 'Next Random Investigation'}
          </button>
          {playedCount > 0 && (
            <button onClick={handleReset} className="mastodon-btn-outline ml-3 text-sm">
              Reset Progress
            </button>
          )}
        </div>

        {/* Story Grid by Country */}
        <div className="space-y-6">
          {Object.entries(byCountry)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([country, stories]) => (
              <div key={country}>
                <h2 className="text-sm font-bold text-text-secondary mb-3 flex items-center gap-2">
                  <span>{countryFlags[country] || ''}</span>
                  {country}
                  <span className="text-text-muted font-normal">({stories.length})</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {stories.map(s => {
                    const isPlayed = played.includes(s.id);
                    return (
                      <Link
                        key={s.id}
                        href={`/play?story=${s.id}`}
                        className={`block bg-bg-surface border border-border rounded-lg p-3 no-underline transition-all hover:border-accent/50 hover:bg-bg-hover ${
                          isPlayed ? 'opacity-60' : ''
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <p className="text-text-primary text-sm font-medium truncate">
                              {s.title}
                            </p>
                            <p className="text-text-muted text-xs truncate">
                              {s.victim} &middot; {s.role}
                            </p>
                            <p className="text-text-muted text-xs mt-1 truncate">
                              {s.town} &middot; {s.instance}
                            </p>
                          </div>
                          <div className="shrink-0">
                            {isPlayed ? (
                              <span className="text-success text-xs">&#10003; Done</span>
                            ) : (
                              <span className="text-accent text-xs">Play</span>
                            )}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
