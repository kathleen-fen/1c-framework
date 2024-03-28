import { Response, Server } from "miragejs";
import { AppSchema } from "../types";

export function routesForUsers(server: Server) {
  server.get(`/users`, (schema: AppSchema, request) => {
    const users = schema.all("user");
    const seconds = new Date().getSeconds();
    return seconds % 17 === 0
      ? new Response(401, {}, { error: true })
      : new Response(200, {}, users);
  });
}
