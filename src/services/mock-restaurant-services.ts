const menuItems = [
  { name: "Nasi Goreng", price: 35000 },
  { name: "Ayam Bakar", price: 42000 },
  { name: "Sate Ayam", price: 30000 },
  { name: "Es Teh", price: 8000 },
  { name: "Udang Saus Tiram", price: 54000 },
  { name: "Es Campur", price: 18000 },
];

type OrderMode = "pickup" | "delivery";
type MockOrder = { id: string; status: string };

const defaultOrderIds: Record<OrderMode, [MockOrder, ...MockOrder[]]> = {
  pickup: [
    { id: "PICK-1001", status: "received" },
    { id: "PICK-1002", status: "preparing" },
    { id: "PICK-1003", status: "ready for pickup" },
  ],
  delivery: [
    { id: "DEL-2001", status: "received" },
    { id: "DEL-2002", status: "preparing" },
    { id: "DEL-2003", status: "on the way" },
  ],
};

export const mockRestaurantService = {
  searchMenuItems: (query = "") => {
    const wantsFullMenuList = query === "all";
    const normalizedQuery = query.trim().toLowerCase();

    const results = wantsFullMenuList
      ? menuItems
      : menuItems.filter((item) => item.name.toLowerCase().includes(normalizedQuery));

    if (results.length === 0) {
      return "No menu items match your search.";
    }

    return results
      .map(
        (item) => `${item.name} - Rp ${item.price.toLocaleString("id-ID")}`
      )
      .join("\n");
  },

  placeOrder: (
    items: Array<{ name: string; quantity: number }>,
    customerName: string,
    orderMode: "pickup" | "delivery",
    address?: string
  ) => {
    if (orderMode === "delivery" && !address?.trim()) {
      return "A delivery address is required before placing a delivery order.";
    }

    const selectedItems = items
      .map((item) => `${item.name} x${item.quantity}`)
      .join(", ");

    const modeLabel = orderMode === "delivery" ? "delivery" : "pickup";
    const ordersForMode = defaultOrderIds[orderMode];
    const chosenOrder = ordersForMode[Math.floor(Math.random() * ordersForMode.length)] ?? ordersForMode[0];
    const orderId = chosenOrder.id;

    const addressLabel = orderMode === "delivery" ? ` Address: ${address}.` : "";

    return `Order confirmed for ${customerName} (${modeLabel}).${addressLabel} Order ID: ${orderId}. Items: ${selectedItems}. Estimated prep time: 15-20 minutes.`;
  },

  checkOrderStatus: (orderId: string) => {
    const normalizedOrderId = orderId.trim().toUpperCase();
    const match = Object.values(defaultOrderIds)
      .flat()
      .find((entry) => entry.id === normalizedOrderId);
    const status = match?.status ?? "received";

    return `Order ${normalizedOrderId} status: ${status}.`;
  },
};
