import Dexie, { Table } from "dexie";

export interface Book {
  id?: number;
  title: string;
  pagesReadUntilNow: number;
}

export class Database extends Dexie {


  books!: Table<Book>;

  constructor() {
    super('books-database');
    this.version(1).stores({
      books: '++id, title, pagesReadUntilNow'
    })
  }

}

export const database = new Database();