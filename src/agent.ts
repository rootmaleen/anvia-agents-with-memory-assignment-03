import { Agent, type AnyTool } from "@anvia/core";
import { BASE_INSTRUCTIONS } from "./prompts";
import { getModel } from "./models";
import { createLoggerObserver } from "@anvia/logger";
import { logger } from "./logger";

interface AgentOptions {
  modelId?: string,
  tools?: AnyTool[]
}

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
    }
  })
}