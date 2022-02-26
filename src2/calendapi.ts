import { Storage } from "./calendobj";

export interface StorageServ {

    create: (x: Storage) => Promise<void>,
    read: () => Promise<Storage[] | []>,
    update: (x: Storage) => Promise<void>,
    delete: (x: Storage) => Promise<void>,
    filterDate: (x: number) => Promise<Storage[]>,
    filterDescript: (x: string) => Promise<Storage[]>,
    filterStatus: (x: string) => Promise<Storage[]>,
    filterTag: (x: string) => Promise<Storage[]>

}

export class Service implements StorageServ {

    async create(item: Storage) {

        const store = await this.read();
        store.push(item);
        localStorage.setItem('store', JSON.stringify(store));
    }

    read = async () => {

        const store: string | null = localStorage.getItem('store');
        if (store) return JSON.parse(store);
        return [];
    }

    async update(item: Storage) {

        const store = await this.read();

        for (let i = 0; i < store.length; i += 1) {

            if (item.id === store[i].id) store[i] = item;
        }

        localStorage.setItem('store', JSON.stringify(store));
    }

    async delete(item: Storage) {

        const store = await this.read();

        for (let i = 0; i < store.length; i += 1) {

            if (item.id === store[i].id) store.splice(i, 1);
        }

        localStorage.setItem('store', JSON.stringify(store));
    }

    async filterDate(someDate: number) {

        const store: Storage[] = await this.read();
        return store.filter(item => item.date === someDate);
    }

    async filterDescript(dscrpt: string) {

        const store: Storage[] = await this.read();
        return store.filter(item => item.description.includes(dscrpt));
    }

    async filterStatus(stat: string) {

        const store: Storage[] = await this.read();
        return store.filter(item => item.status === stat);

    }

    async filterTag(tag: string) {

        const store: Storage[] = await this.read();
        return store.filter(item => item.tag === tag);
    }

}