export class Card{
    constructor(
        private _id: string,
        private name: string,
        private description: string,
        private image: {id: string, data: string},
    ){}
}