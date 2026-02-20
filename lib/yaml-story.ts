import yaml from 'js-yaml';

// ===== YAML Story Types =====

export interface YamlStoryMeta {
  title: string;
  state: Record<string, number>;
  player: { name: string; bio: string; avatar: string };
  bot: { display_name: string; description: string; avatar_url: string };
  npcs: Record<string, { name: string; bio: string; avatar: string }>;
}

export interface YamlChoice {
  text: string;
  target: string;
  when?: ChoiceCondition;
}

export interface ChoiceCondition {
  state?: string;
  gte?: number;
  lt?: number;
  all?: ChoiceCondition[];
}

export interface YamlNode {
  id: string;
  type: 'message' | 'tweet';
  text: string;
  from?: string; // NPC id for tweet nodes
  effects?: Record<string, string>; // e.g. { trust_lisa: "+10", evidence_total: "+1" }
  choices: YamlChoice[];
}

export interface YamlStory {
  meta: YamlStoryMeta;
  entry: string;
  nodes: Record<string, YamlNode>;
}

// ===== Story State =====

export interface StoryState {
  currentNodeId: string;
  vars: Record<string, number>;
  history: string[]; // visited node IDs
  completed: boolean;
}

// ===== Parser =====

function parseChoice(raw: string): YamlChoice {
  // Format: "Choice text -> target_node"
  const arrowIndex = raw.lastIndexOf('->');
  if (arrowIndex === -1) {
    return { text: raw.trim(), target: '' };
  }
  return {
    text: raw.substring(0, arrowIndex).trim(),
    target: raw.substring(arrowIndex + 2).trim(),
  };
}

/**
 * Pre-process YAML text to fix non-standard choice syntax.
 *
 * The story YAML uses a custom DSL where choices are strings with `->` arrows,
 * and some have `when:` conditions as nested mappings under the string. This is
 * invalid standard YAML (you can't put a mapping under a scalar string).
 *
 * This transforms:
 *   - Choice text -> target
 *     when:
 *       state: foo
 *       gte: 3
 *
 * Into valid YAML:
 *   - "Choice text -> target":
 *     when:
 *       state: foo
 *       gte: 3
 *
 * Which parses as a mapping: {"Choice text -> target": null, when: {state: "foo", gte: 3}}
 */
function preprocessYaml(text: string): string {
  const lines = text.split('\n');
  const result: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const nextLine = i + 1 < lines.length ? lines[i + 1] : '';

    // Check if this is a list item containing "->" (a choice)
    // and the next line contains "when:" at deeper indentation
    const choiceMatch = line.match(/^(\s*-\s+)(.+?->.+)$/);
    if (choiceMatch) {
      const prefix = choiceMatch[1]; // e.g. "      - "
      const choiceText = choiceMatch[2].trim();
      const prefixIndent = prefix.replace(/-\s+$/, '').length; // spaces before the "-"

      // Check if next line is "when:" indented deeper than this list item
      const whenMatch = nextLine.match(/^(\s+)when:\s*$/);
      if (whenMatch && whenMatch[1].length > prefixIndent) {
        // Convert string choice to mapping key so when: becomes a sibling key
        const escaped = choiceText.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
        result.push(`${prefix}"${escaped}":`);
        continue;
      }
    }

    result.push(line);
  }

  return result.join('\n');
}

interface RawNode {
  type?: string;
  text?: string;
  from?: string;
  effects?: Record<string, string>;
  choices?: (string | Record<string, unknown>)[];
}

export function parseStory(yamlText: string): YamlStory {
  // Pre-process: fix non-standard "when:" syntax on choices
  const processed = preprocessYaml(yamlText);
  const doc = yaml.load(processed) as Record<string, unknown>;

  const meta = doc.meta as YamlStoryMeta;
  const entry = doc.entry as string;
  const rawNodes = doc.nodes as Record<string, RawNode>;

  const nodes: Record<string, YamlNode> = {};

  for (const [nodeId, raw] of Object.entries(rawNodes)) {
    const choices: YamlChoice[] = [];

    if (raw.choices) {
      for (const c of raw.choices) {
        if (typeof c === 'string') {
          choices.push(parseChoice(c));
        } else if (typeof c === 'object' && c !== null) {
          // Object format choice with possible "when" condition
          const keys = Object.keys(c);
          // Find the text -> target key
          const textKey = keys.find(k => k !== 'when');
          if (textKey) {
            const parsed = parseChoice(textKey);
            // If the value is a string, it's the target
            const val = c[textKey];
            if (typeof val === 'string') {
              parsed.target = val;
            }
            if (c.when) {
              parsed.when = c.when as ChoiceCondition;
            }
            choices.push(parsed);
          }
        }
      }
    }

    nodes[nodeId] = {
      id: nodeId,
      type: (raw.type as 'message' | 'tweet') || 'message',
      text: (raw.text || '').toString().trim(),
      from: raw.from,
      effects: raw.effects as Record<string, string> | undefined,
      choices,
    };
  }

  return { meta, entry, nodes };
}

// ===== State Engine =====

export function createInitialState(story: YamlStory): StoryState {
  return {
    currentNodeId: story.entry,
    vars: { ...story.meta.state },
    history: [],
    completed: false,
  };
}

export function applyEffects(state: StoryState, effects: Record<string, string>): StoryState {
  const newVars = { ...state.vars };
  for (const [key, val] of Object.entries(effects)) {
    const strVal = String(val);
    if (strVal.startsWith('+')) {
      newVars[key] = (newVars[key] || 0) + parseInt(strVal.substring(1), 10);
    } else if (strVal.startsWith('-')) {
      newVars[key] = (newVars[key] || 0) - parseInt(strVal.substring(1), 10);
    } else {
      newVars[key] = parseInt(strVal, 10) || 0;
    }
  }
  return { ...state, vars: newVars };
}

export function evaluateCondition(condition: ChoiceCondition, vars: Record<string, number>): boolean {
  if (condition.all) {
    return condition.all.every(c => evaluateCondition(c, vars));
  }
  if (condition.state) {
    const value = vars[condition.state] || 0;
    if (condition.gte !== undefined && value < condition.gte) return false;
    if (condition.lt !== undefined && value >= condition.lt) return false;
  }
  return true;
}

export function getAvailableChoices(node: YamlNode, vars: Record<string, number>): YamlChoice[] {
  return node.choices.filter(c => {
    if (c.when) return evaluateCondition(c.when, vars);
    return true;
  });
}

export function advanceState(
  state: StoryState,
  story: YamlStory,
  choiceIndex: number
): StoryState {
  const node = story.nodes[state.currentNodeId];
  if (!node) return state;

  const available = getAvailableChoices(node, state.vars);
  const choice = available[choiceIndex];
  if (!choice) return state;

  let newState: StoryState = {
    ...state,
    history: [...state.history, state.currentNodeId],
  };

  // Apply current node effects
  if (node.effects) {
    newState = applyEffects(newState, node.effects);
  }

  // Move to target node
  const targetNode = story.nodes[choice.target];
  if (!targetNode) {
    newState.completed = true;
  } else {
    newState.currentNodeId = choice.target;
  }

  return newState;
}

// ===== Story History =====

const PLAYED_KEY = 'dead-account-played';

export function getPlayedStories(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(PLAYED_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function markStoryPlayed(storyId: string): void {
  const played = getPlayedStories();
  if (!played.includes(storyId)) {
    played.push(storyId);
    localStorage.setItem(PLAYED_KEY, JSON.stringify(played));
  }
}

export function resetPlayHistory(): void {
  localStorage.removeItem(PLAYED_KEY);
}

// ===== Save/Load Story Progress =====

const SAVE_PREFIX = 'dead-account-story-';

export function saveStoryProgress(storyId: string, state: StoryState): void {
  try {
    localStorage.setItem(SAVE_PREFIX + storyId, JSON.stringify(state));
  } catch {
    // ignore
  }
}

export function loadStoryProgress(storyId: string): StoryState | null {
  try {
    const raw = localStorage.getItem(SAVE_PREFIX + storyId);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearStoryProgress(storyId: string): void {
  try {
    localStorage.removeItem(SAVE_PREFIX + storyId);
  } catch {
    // ignore
  }
}
