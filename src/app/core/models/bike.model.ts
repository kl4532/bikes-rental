import {BookedDates} from './bookedDates.model';

export interface Bike {
  id: number;
  picture: any;
  name: string;
  description: string;
  price: number;
  type: string;
  size: string;
  bookedDates?: BookedDates[];
  reviews?: string[];
  rating?: number;
  gear?: string[];
  status: string;
}
