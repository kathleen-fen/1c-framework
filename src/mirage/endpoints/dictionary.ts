import { Server } from "miragejs";
import { AppSchema } from "../types";
import { DictionaryItem } from "@/types";

function buildTree(
  items: DictionaryItem[],
  parentId?: string
): DictionaryItem[] {
  return items
    .filter((item) => item.parentId === parentId)
    .map((item) => ({
      ...item,
      children: buildTree(items, item.id),
    }));
}

export function routesForDictionary(server: Server) {
  server.get(`/dictionaryItems`, (schema: AppSchema, request) => {
    const parentId = (request.queryParams.parentId as string) || undefined;
    const children = schema.where("dictionaryItem", {
      parentId,
    });
    console.log("children: ", children);
    return children.models
      .map((model) => model.attrs)
      .sort((a, b) => a.order - b.order);
  });

  server.get(`/dictionaryFolders`, (schema: AppSchema, request) => {
    const dictionaryFolders = schema.where("dictionaryItem", {
      isFolder: true,
    });
    const tree = buildTree(
      dictionaryFolders.models.map((model) => model.attrs)
    );
    console.log("tree: ", tree);

    return tree;
  });
}
