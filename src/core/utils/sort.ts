import { IItem } from "../interfaces/catalog.interfaces";

export class Sort {

    static sortByPrice(items: IItem[], direction: 'assent' | 'descent'): void {
        items.sort((a, b) => a.price - b.price);
        if (direction === 'descent') {
            items.reverse();
        }
    }

    static sortByInStock(items: IItem[], direction: 'assent' | 'descent'): void {
        items.sort((a, b) => a.stock - b.stock);
        if (direction === 'descent') {
            items.reverse();
        }
    }
}