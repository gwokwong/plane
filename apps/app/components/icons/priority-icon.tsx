export const getPriorityIcon = (priority: string | null, className?: string) => {
  if (!className || className === "") className = "text-xs flex items-center";

  priority = priority?.toLowerCase() ?? null;

  switch (priority) {
    case "急":
      return <span className={`material-symbols-rounded ${className}`}>error</span>;
    case "高":
      return <span className={`material-symbols-rounded ${className}`}>signal_cellular_alt</span>;
    case "中":
      return (
        <span className={`material-symbols-rounded ${className}`}>signal_cellular_alt_2_bar</span>
      );
    case "低":
      return (
        <span className={`material-symbols-rounded ${className}`}>signal_cellular_alt_1_bar</span>
      );
    default:
      return <span className={`material-symbols-rounded ${className}`}>block</span>;
  }
};
