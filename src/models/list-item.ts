export class ListItem{
    age: number;
    id: number;
    rating: number;
    image: string;
    description: string;
    title: string;
    constructor(id:number, title: string, description: string, image:string , age: number, rating: number){
        this.id = id;
        this.title = title;
        this.description = description;
        this.image = image;
        this.age = age;
        this.rating = rating;
    }
}