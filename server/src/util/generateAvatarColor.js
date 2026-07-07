export const generateAvatarColor = () => {
  const colors = [
    "#3b82f6", // blue
    "#8b5cf6", // violet
    "#ec4899", // pink
    "#f97316", // orange
    "#22c55e", // green
    "#06b6d4", // cyan
    "#eab308", // yellow
    "#ef4444", // red
  ];

  return colors[Math.floor(Math.random() * colors.length)];
};
