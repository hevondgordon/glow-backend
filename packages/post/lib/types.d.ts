import { User } from 'user';
export interface Post {
    caption: string;
    category: CategoryEnum;
    created: number;
    createdBy: User;
    imageURL: string;
    isLiked: boolean;
    likeCount: number;
    usernameFilter: string;
}
declare enum CategoryEnum {
    BodyArt = 0,
    Hair = 1,
    MakeUp = 2,
    Nails = 3
}
export interface GetPostsByCategoryInput {
    category: string;
    limit: number;
    nextToken: string;
}
export {};
