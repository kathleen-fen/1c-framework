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
    const firstLevelDictionaryItems = schema.where("dictionaryItem", {
      parentId,
    });

    console.log(
      "parents ids: ",
      firstLevelDictionaryItems.models.map((item) => item.id)
    );
    const parentIds = firstLevelDictionaryItems.models.map((item) => item.id);
    const children = schema.where(
      "dictionaryItem",
      (item) => item.parentId && parentIds.includes(item.parentId as string)
    );

    console.log("children: ", children);
    firstLevelDictionaryItems.models = [
      ...firstLevelDictionaryItems.models,
      ...children.models,
    ];

    /*  let dictionaryItems;
    const { parentId } = request.queryParams;
    if (parentId) {
      dictionaryItems = schema.where("dictionaryItem", {
        parentId: parentId.toString(),
      });
    } else {
      dictionaryItems = schema.where("dictionaryItem", { parentId: undefined });
    }
    dictionaryItems.models.forEach((item) => {
      const children = schema.where("dictionaryItem", { parentId: item.id });
      if (children.length) {
        item.attrs.children = children.models.map((model) => model.attrs);
      }
    }); */
    return firstLevelDictionaryItems;
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
