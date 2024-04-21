/* eslint-disable @typescript-eslint/no-unused-vars */
import { createServer } from "miragejs";
import { faker } from "@faker-js/faker";
import { endpoints } from "./endpoints";
import { models } from "./models";
import { factories } from "./factories";

export function startMirage({ environment = "test" } = {}) {
  const server = createServer({
    models,
    factories,
    seeds(server) {
      server.createList("user", faker.number.int({ min: 2, max: 25 }));

      server.create("dictionaryItem", { label: "Hello", order: 0 });
      const parent = server.create("dictionaryItem", {
        label: faker.commerce.productName(),
        isFolder: true,
        order: 0,
      });
      server.create("dictionaryItem", {
        label: faker.commerce.productName(),
        parentId: parent.id,
        isFolder: true,
        order: 0,
      });
      const parent_1 = server.create("dictionaryItem", {
        label: faker.commerce.productName(),
        parentId: parent.id,
        isFolder: true,
        order: 0,
      });
      server.create("dictionaryItem", {
        label: faker.commerce.productName(),
        parentId: parent.id,
        isFolder: true,
        order: 0,
      });
      server.create("dictionaryItem", {
        label: faker.commerce.productName(),
        parentId: parent_1.id,
        isFolder: true,
        order: 0,
      });
      server.create("dictionaryItem", {
        label: faker.commerce.productName(),
        parentId: parent_1.id,
        isFolder: true,
        order: 0,
      });
      server.create("dictionaryItem", {
        label: faker.commerce.productName(),
        parentId: parent_1.id,
        isFolder: true,
        ordder: 0,
      });
      server.create("dictionaryItem", {
        label: faker.commerce.productName(),
        isFolder: true,
        order: 0,
      });
      server.create("dictionaryItem", {
        label: faker.commerce.productName(),
        isFolder: true,
        order: 0,
      });
    },
    environment,
  });
  // logging
  server.logging = true;

  // external URLs
  /*  server.post(
    `${process.env.RAYGUN_URL}/:any`,
    () => new Promise((_res: unknown) => {})
  ); */

  // internal URLs
  //server.urlPrefix = process.env.API_URL ?? "";
  for (const namespace of Object.keys(endpoints)) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    endpoints[namespace](server);
  }

  // Reset for everything else
  server.namespace = "";
  server.passthrough();
  // console.log({server})
  console.log({ dump: server.db.dump() });
}
