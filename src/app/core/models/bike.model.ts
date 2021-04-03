export interface Bike {
  id: string;
  picture: string;
  name: string;
  description: string;
  price: string;
  type: string;
  size: string;
  bookedDates: string[];
  reviews?: string[];
  rating?: number;
}
