export function formatDay(day: number): string {
  if (day === 0) return 'Today';
  if (day === -1) return 'Yesterday';
  if (day === 1) return '1 day ago';
  if (day > 1) return `${day} days ago`;
  if (day < -1) return `${Math.abs(day)} days ago`;
  return '';
}

export function formatTimestamp(day: number, time?: string): string {
  const dayStr = formatDay(day);
  if (time) return `${dayStr} at ${time}`;
  return dayStr;
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(w => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}
