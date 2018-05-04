import { Card } from "./Card";

export class Task {
    constructor(
        private _id: string, 
        private name: string,
        private description: string,
        private age: number,
        private level: number,
        private image: {id: string, data:string},
        private cards: Card[],
        private contributor: {id: string, name: string},
        private createdAt: string,
        private updatedAt: string
    ){}
}