import { Card } from "./Card";

export class Task {
    constructor(
        public _id: string, 
        public name: string,
        public description: string,
        public age: number,
        public level: number,
        public image: {id: string, data:string},
        public cards: Card[],
        public contributor: {id: string, name: string},
        public createdAt: string,
        public updatedAt: string
    ){}
}