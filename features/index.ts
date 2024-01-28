import { EventRouter } from "../router";
import { messageCreate } from "./messageCreate";

export function setupRouter(router: EventRouter) {
  router.createEvent("messageCreate", messageCreate);
}
