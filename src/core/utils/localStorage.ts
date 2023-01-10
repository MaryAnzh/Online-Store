export class StorageService {

    constructor() { }

    setData<T>(key: string, value: T | null): void {
        if (value) {
            localStorage.setItem(
                key, JSON.stringify(value)
            );
        } else {
            localStorage.removeItem(key);
        }
    }

    getData<T>(key: string): T | null {
        const data = localStorage.getItem(key);

        return data
            ? JSON.parse(data) :
            null;
    }
}