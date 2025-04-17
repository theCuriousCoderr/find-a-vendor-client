import { RecipientVariants, StatusVariants } from "@/types";

export default function notificationMessage(
  status: StatusVariants,
  recipient: RecipientVariants
) {
  const message = {
    customer: {
      pending: "You placed an order.",
      ongoing: "A vendor accepted to process an order.",
      rejected: "A vendor declined an order.",
      cancelled: "You cancelled an order.",
      completed: "This order has been completed.",
      received: "You marked an order as received",
      delivered: "A vendor marked an order as delivered"
    },
    vendor: {
      pending:  "You received an order.",
      ongoing: "You accepted to process an order.",
      rejected: "You declined an order.",
      cancelled: "A customer cancelled an order.",
      completed: "This order has been completed.",
      received: "A customer marked an order as received",
      delivered: "You marked an order as delivered"
    },
  };

  return message[recipient][status];
}
