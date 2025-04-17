import { RecipientVariants, StatusVariants } from "@/types";

export default function statusMessage(
  status: StatusVariants,
  recipient: RecipientVariants
) {
  const message = {
    customer: {
      pending: "The vendor hasn't accepted or declined this order yet.",
      ongoing: "The vendor has accepted, and is processing this order.",
      rejected: "The vendor declined this order.",
      cancelled: "You cancelled this order.",
      completed: "This order has been completed.",
      received: "You have received this order.",
      delivered: "The vendor marked this order as delivered.",
    },
    vendor: {
      pending: "You haven't accepted or declined this order yet.",
      ongoing: "You accepted to process this order.",
      rejected: "You declined this order.",
      cancelled: "The customer cancelled this order.",
      completed: "This order has been completed.",
      received: "The customer marked this order as received.",
      delivered: "You have delivered this order.",
    },
  };

  return message[recipient][status];
}
