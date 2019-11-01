// eslint-disable-next-line no-unused-vars
import {User} from 'user';
export interface Post {
    caption: string
    category: CategoryEnum
    created: number
    createdBy: User
    imageURL: string
    isLiked: boolean
    likeCount: number
    usernameFilter: string
}
// eslint-disable-next-line no-unused-vars
enum CategoryEnum {
    BodyArt,
    Hair,
    MakeUp,
    Nails
}

export interface GetPostsByCategoryInput {
    category: string
    limit: number
    nextToken: string
}

export interface CreatePostInput {
    caption: string
    category: CategoryEnum
    created: string
    createdBy: User
    imageURL: string
    isLiked: boolean
    likeCount: number
    usernameFilter: string
}

export interface GetPostByUserInput {
    email: string
}
