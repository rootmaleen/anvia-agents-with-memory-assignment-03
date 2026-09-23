import { createAgent } from "./agent";
import { mockRestaurantService } from "./services/mock-restaurant-services";
import { createRestaurantTools } from "./tools/restaurant-tools";

const restaurantTools = createRestaurantTools({ service: mockRestaurantService });
const agent = createAgent({
  tools: restaurantTools,
});

await agent.generate({
  prompt: "Saya ingin pesan Nasi Goreng 3 dan Es Teh 2 untuk delivery ke Jl. Melati No. 10, atas nama Budi.",
});