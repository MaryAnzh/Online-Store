import { IItem } from "../interfaces/catalog.interfaces";

export class Filter {

    static createNameSet(array: IItem[], name: string): string[] {
        return array.reduce((arr: string[], curr) => {
            const category = curr.category;
            if (arr.indexOf(category) === -1) {
                arr.push(category);
            }
            return arr;
        }, []);
    }
}