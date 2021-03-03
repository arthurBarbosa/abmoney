import { Address } from './address';

export class Person {
  id: number;
  name: string;
  status: boolean;
  address = new Address();
}
