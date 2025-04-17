import { StatusVariants } from "@/types";

export default function statusColorCode(status: StatusVariants) {
  const colorCodes = {
    pending: { bgColor: "bg-[#FACC15]", color: "text-[#FACC15]" },
    ongoing: { bgColor: "bg-[#3B82F6]", color: "text-[#3B82F6]" },
    received: { bgColor: "bg-[#3B82F6]", color: "text-[#3B82F6]" },
    delivered: { bgColor: "bg-[#3B82F6]", color: "text-[#3B82F6]" },
    rejected: { bgColor: "bg-[#EF4444]", color: "text-[#EF4444]" },
    cancelled: { bgColor: "bg-[#9CA3AF]", color: "text-[#9CA3AF]" },
    completed: { bgColor: "bg-[#10B981]", color: "text-[#10B981]" },
  };

  return colorCodes[status];
}
