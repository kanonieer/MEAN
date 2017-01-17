export interface Movie{
        id: number,
        name: string,
        categoryIds: Array<string>,
        isAvailable: boolean,
        copiesLeft: number,
        fee:number
}