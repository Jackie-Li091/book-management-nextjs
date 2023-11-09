export interface CategoryQueryType {
    name?: string;
    level?: number;
    current?: number;
    pageSize?: number;
    all?: boolean; //get all back
}

export interface CategoryType {
    _id?: string;
    name: string;
    level: 1 | 2;
    parent: CategoryType;
}