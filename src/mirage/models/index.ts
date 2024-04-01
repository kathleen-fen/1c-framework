import { Model } from "miragejs";
import { ModelDefinition } from "miragejs/-types";
import { User, DictionaryItem } from "../../types";

const UserModel: ModelDefinition<User> = Model.extend({});
const DictionaryItemModel: ModelDefinition<DictionaryItem> = Model.extend({});

export const models = {
  user: UserModel,
  dictionaryItem: DictionaryItemModel,
};
