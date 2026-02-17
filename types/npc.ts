export type NpcId = string;

export interface Npc {
  id: NpcId;
  handle: string;
  displayName: string;
  bio: string;
  role: string;
  age?: number;
  color: string; // Avatar background color
  group: NpcGroup;
  isAlt?: boolean; // e.g. @sportief_zh
  altOf?: NpcId;
  isSuspended?: boolean;
  canDM?: boolean;
}

export type NpcGroup =
  | 'inner_circle'
  | 'government'
  | 'business'
  | 'community'
  | 'teens'
  | 'media'
  | 'suspicious';
