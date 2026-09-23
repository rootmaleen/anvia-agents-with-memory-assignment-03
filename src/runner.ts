import { createAgent } from "./agent";
import { mockOrderService } from "./services/mock-order-services";
import { createOrderTool } from "./tools/order-tools";

const orderTools = createOrderTool({ service: mockOrderService })
const agent = createAgent({
  tools: [orderTools]
});

await agent.generate({
  prompt: "What is the status oF order ID: 1001"
})