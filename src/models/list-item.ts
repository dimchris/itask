export class ListItem{
    age: number;
    id: number;
    level: number;
    image: string;
    description: string;
    title: string;
    constructor(id:number, title: string, description: string, image:string , age: number, level: number){
        this.id = id;
        this.title = title;
        this.description = description;
        this.image = image;
        this.age = age;
        this.level = level;
    }
}