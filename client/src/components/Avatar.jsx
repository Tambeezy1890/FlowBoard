function Avatar({ user, size = "sm" }) {
  const sizes = {
    sm: "w-7 h-7 text-xs",
    md: "w-9 h-9 text-sm",
    lg: "w-12 h-12 text-base",
  };

  const displayName = user?.username || user?.name || "";

  const initials =
    displayName
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "?";

  return (
    <div
      className={`${sizes[size]} rounded-full flex items-center justify-center font-semibold text-white border border-white/40 shadow-sm overflow-hidden`}
      style={{ backgroundColor: user?.avatarColor || "#64748b" }}
    >
      {user?.avatarUrl ? (
        <img
          src={user.avatarUrl}
          alt={displayName}
          className="w-full h-full object-cover"
        />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
}

export default Avatar;
