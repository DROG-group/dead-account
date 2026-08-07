'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  parseStory,
  createInitialState,
  loadStoryProgress,
  YamlStory,
  StoryState,
} from '@/lib/yaml-story';
import { StoryRenderer } from '@/components/story/StoryRenderer';

function PlayContent() {
  const searchParams = useSearchParams();
  const storyId = searchParams.get('story') || 'story-001';

  const [story, setStory] = useState<YamlStory | null>(null);
  const [state, setState] = useState<StoryState | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storyFile = `${storyId}.yml`;
    fetch(`/stories/${storyFile}`)
      .then(r => {
        if (!r.ok) throw new Error(`Story not found: ${storyFile}`);
        return r.text();
      })
      .then(yamlText => {
        const parsed = parseStory(yamlText);
        setStory(parsed);

        // Check for saved progress
        const saved = loadStoryProgress(storyId);
        if (saved) {
          setState(saved);
        } else {
          setState(createInitialState(parsed));
        }
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [storyId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full bg-accent mx-auto flex items-center justify-center text-white text-xl font-bold mb-4 animate-pulse">
            ?
          </div>
          <p className="text-text-muted text-sm">Loading investigation...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <p className="text-danger text-sm mb-4">{error}</p>
          <a href="/stories" className="mastodon-btn-outline">Back to Stories</a>
        </div>
      </div>
    );
  }

  if (!story || !state) return null;

  return (
    <StoryRenderer
      story={story}
      storyId={storyId}
      initialState={state}
      onComplete={() => {}}
    />
  );
}

export default function PlayPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-text-muted text-sm">Loading...</p>
      </div>
    }>
      <PlayContent />
    </Suspense>
  );
}
