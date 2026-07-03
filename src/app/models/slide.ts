import {Beer} from "./beer"

export type SlideType =
  | 'beer'
  | 'event'
  | 'ad'
  | 'qr'
  | 'image';

export interface Slide {

  id: number;

  type: SlideType;

  duration?: number; // optional override per slide

  data: Beer[]; // polymorphic payload (beer, event, etc.)

}