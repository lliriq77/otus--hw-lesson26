import { JsonDB } from "node-json-db";
import { Config } from "node-json-db/dist/lib/JsonDBConfig";
import { Storage } from "./calendobj";
import { StorageServ } from "./calendapi";

export class DbService implements StorageServ {
  db = new JsonDB(new Config("myDataBase", true, false, "/"));

  async create(item: Storage) {
    this.db.push("/arr[]", item, true);
  }

  read = async () => {
    try {
      const store: Storage[] = this.db.getData("/arr");

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

    this.db.push("/arr", store);
  }

  async delete(item: Storage) {
    const store = await this.read();

    for (let i = 0; i < store.length; i += 1) {
      if (item.id === store[i].id) store.splice(i, 1);
    }

    this.db.push("/arr", store);
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
