export interface TaskListItem{
    _id: string,
    name: string,
    description: string,
    image: {id:string, data: string},
    level: number,
    age: number,
    contributor: string,
    createdAt:string,
    updatedAt: string
}