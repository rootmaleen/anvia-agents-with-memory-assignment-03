export const orderService = {
  getOrderStatus: (orderId: string) => {
    //Get order from database
    const orderData = `
      OrderId: ${orderId}
      Status: Pending
      Note: Our warehouse is currently out of stock
    `
    return orderData
  }
}