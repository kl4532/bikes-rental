export interface Bike {
  id: string;
  picture: string;
  name: string;
  description: string;
  price: number;
  type: string;
  size: string;
  bookedDates: string[];
  reviews?: string[];
  rating?: number;
  gear?: string[];
}
