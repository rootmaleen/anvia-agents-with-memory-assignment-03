import { Studio } from "@anvia/studio"
import { createAgent } from "./agent.js"
import { mockRestaurantService } from "./services/mock-restaurant-services.js"
import { createRestaurantTools } from "./tools/restaurant-tools.js"

const restaurantTools = createRestaurantTools({ service: mockRestaurantService })
const agent = createAgent({
  tools: restaurantTools,
})

const studio = new Studio([agent]).start()