import { Studio } from "@anvia/studio"
import { createAgent } from "./agent.js"

const agent = createAgent();

const studio = new Studio([agent]).start()