export class Card{
    constructor(
        public _id: string,
        public name: string,
        public description: string,
        public image: {id: string, data: string},
        public position: boolean
    ){}
}