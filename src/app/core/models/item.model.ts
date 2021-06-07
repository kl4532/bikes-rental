import {Bike} from "./bike.model";

export interface Item {
  price: number;
  dateStart: string;
  dateEnd: string;
  bike: Bike;
}
