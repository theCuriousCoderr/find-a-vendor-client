export default function notificationColorCode(
  status: "read" | "unread" | "all"
) {
  const colorCodes = {
    unread: {
      bgColor: "bg-[#3B82F6]",
      textColor: "text-[#3B82F6]",
      borderColor: "border-[#3B82F6]",
    },
    read: {
      bgColor: "bg-[#9CA3AF]",
      textColor: "text-[#9CA3AF]",
      borderColor: "border-[#9CA3AF]",
    },
    all: {
      bgColor: "bg-[#ffffff]",
      textColor: "text-[#ffffff]",
      borderColor: "border-[#ffffff]",
    },
  };

  return colorCodes[status];
}
