export const mockOrderService = {
  getOrderStatus: (orderId: string) => {
    return `
      OrderId: ${orderId}
      Status: Pending
      Note: Our warehouse is currently out of stock
    `
  }
}