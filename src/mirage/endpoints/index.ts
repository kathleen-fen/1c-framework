import { routesForUsers } from "./user";
import { routesForDictionary } from "./dictionary";

const endpoints = {
  users: routesForUsers,
  dictionaryItems: routesForDictionary,
};

export { endpoints };
