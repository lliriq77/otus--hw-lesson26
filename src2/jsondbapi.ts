import { JsonDB } from "node-json-db";
import { Storage } from "./calendobj";
import { StorageServ } from "./calendapi";

export class DbService implements StorageServ {
  db: JsonDB;

  dataPath: string;

  constructor(db: JsonDB, dataPath: string) {
    this.db = db;
    this.dataPath = dataPath;
  }

  async create(item: Storage) {
    this.db.push(`${this.dataPath}[]`, item, true);
  }

  read = async () => {
    try {
      const store: Storage[] = this.db.getData(this.dataPath);

      return store;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  async update(item: Storage) {
    const store = await this.read();

    for (let i = 0; i < store.length; i += 1) {
      if (item.id === store[i].id) store[i] = item;
    }

    this.db.push(this.dataPath, store);
  }

  async delete(item: Storage) {
    const store = await this.read();

    for (let i = 0; i < store.length; i += 1) {
      if (item.id === store[i].id) store.splice(i, 1);
    }

    this.db.push(this.dataPath, store);
  }

  async filterDate(someDate: number) {
    const store = await this.read();

    return store.filter((item) => item.date === someDate);
  }

  async filterDescript(dscrpt: string) {
    const store = await this.read();

    return store.filter((item) => item.description.includes(dscrpt));
  }

  async filterStatus(stat: string) {
    const store = await this.read();

    return store.filter((item) => item.status === stat);
  }

  async filterTag(tag: string) {
    const store = await this.read();

    return store.filter((item) => item.tag === tag);
  }
}
