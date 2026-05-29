/** Vibrant palette cycled across skill bars (pink → orange → … ). */
export const SKILL_BAR_COLORS = [
  "#ec4899", // pink
  "#f97316", // orange
  "#eab308", // yellow
  "#38bdf8", // sky
  "#a855f7", // purple
  "#22c55e", // green
  "#06b6d4", // cyan
  "#ef4444", // red
] as const;

export function barColor(index: number): string {
  return SKILL_BAR_COLORS[index % SKILL_BAR_COLORS.length];
}
