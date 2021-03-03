import { Person } from "./person";
import {Category}from './category';

export class BookEntry {
    id: number
    description: string;
    dueDate: Date;
    paymentDate:Date;
    value: number;
    observation: string;
    type: string = 'RECEITA';
    categoryDTO = new Category();
    personDTO = new Person();
}
