import { IItem } from "../interfaces/catalog.interfaces";

export class Filter {

    static createNameSet(array: IItem[], name: string): string[] {
        return array.reduce((arr: string[], curr) => {
            const key = name as keyof IItem;
            const k = curr[key];
            if (arr.indexOf(`${k}`) === -1) {
                arr.push(`${k}`);
            }
            return arr;
        }, []);
    }
}