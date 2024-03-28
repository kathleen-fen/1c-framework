import { Factory } from "miragejs";
import { faker } from "@faker-js/faker";
import { User } from "../../types";
export const userFactory = Factory.extend<User>({
  id(i) {
    return i;
  },
  firstName() {
    return faker.person.firstName();
  },
  lastName() {
    return faker.person.lastName();
  },
});
