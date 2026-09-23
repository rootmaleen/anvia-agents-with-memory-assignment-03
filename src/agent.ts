import { Agent, type AnyTool } from "@anvia/core";
import { BASE_INSTRUCTIONS } from "./prompts";
import { getModel } from "./models";
import { createLoggerObserver } from "@anvia/logger";
import { logger } from "./logger";
import { createSummaryMemoryCompactor } from "@anvia/core"
import { memoryStore } from "./memory";

interface AgentOptions {
  modelId?: string,
  tools?: AnyTool[]
}

const memoryCompactor = createSummaryMemoryCompactor({
  model: getModel("deepseek-v4-flash-0731"),
  instructions: `
    <memory>
      You are a memory compactor for a restaurant ordering assistant.

      Create a concise summary that preserves important details needed for future turns:
      - customer name
      - ordered menu items and quantities
      - order mode: pickup or delivery
      - delivery address, only when the order is for delivery
      - order ID
      - order status
      - unresolved details or information still requested from the customer

      Preserve exact item names, quantities, addresses, order IDs, and statuses. Do not invent missing information. Omit irrelevant conversation details and do not include an address for pickup orders.
    </memory>
  `
})

export function createAgent(options: AgentOptions = {}) {
  return new Agent({
    id: "assistant",
    model: getModel(options.modelId),
    instructions: BASE_INSTRUCTIONS,
    tools: options.tools ?? [],
    observability: {
      observers: {
        logger: createLoggerObserver({ logger })
      }
    },
    memory: {
      store: memoryStore,
      savePolicy: "turn",
      compaction: {
        compactor: memoryCompactor,
        trigger: {
          afterTokens: 1000,
        }
      }
    }
  })
}