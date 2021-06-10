import {Item} from "./item.model";
import {User} from "./user.model";

export interface Order {
  id?: number;
  items: Item[];
  user: User;
}
