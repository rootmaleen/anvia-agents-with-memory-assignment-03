import { createTool } from "@anvia/core";
import { z } from "zod";

type OrderedItem = {
  name: string;
  quantity: number;
};

type OrderMode = "pickup" | "delivery";

interface RestaurantToolDeps {
  service: {
    searchMenuItems: (query?: string) => string;
    placeOrder: (items: OrderedItem[], customerName: string, orderMode: OrderMode, address?: string) => string;
    checkOrderStatus: (orderId: string) => string;
  };
}

export function createRestaurantTools(deps: RestaurantToolDeps) {
  return [
    createTool({
      name: "searchMenu",
      description: "Search for a dish or return the full restaurant menu list when the user asks to see all menu items.",
      inputSchema: z.object({
        query: z.string().default("all"),
      }),
      execute: async (args) => {
        return deps.service.searchMenuItems(args.query);
      },
    }),

    createTool({
      name: "placeOrder",
      description: "Place a customer order for pickup or delivery with item quantities. A delivery address is required for delivery orders.",
      inputSchema: z.discriminatedUnion("orderMode", [
        z.object({
          items: z.array(
            z.object({
              name: z.string(),
              quantity: z.number().int().min(1),
            })
          ),
          customerName: z.string(),
          orderMode: z.literal("pickup"),
          address: z.string().optional(),
        }),
        z.object({
          items: z.array(
            z.object({
              name: z.string(),
              quantity: z.number().int().min(1),
            })
          ),
          customerName: z.string(),
          orderMode: z.literal("delivery"),
          address: z.string().trim().min(1),
        }),
      ]),
      execute: async (args) => {
        return deps.service.placeOrder(args.items, args.customerName, args.orderMode, args.address);
      },
    }),

    createTool({
      name: "checkOrderStatus",
      description: "Check the current status for an order using its order ID.",
      inputSchema: z.object({
        orderId: z.string(),
      }),
      execute: async (args) => {
        return deps.service.checkOrderStatus(args.orderId);
      },
    }),
  ];
}
