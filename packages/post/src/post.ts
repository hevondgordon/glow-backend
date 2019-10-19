import {getPostsByCategoryHandler,createPostHandler} from './postRepository';
import {GetPostsByCategoryInput, CreatePostInput} from './types';
export async function getPostsByCategory(event, context, callback) {
  const getPostsByCategoryInput: GetPostsByCategoryInput = {
    category: event.category,
    limit: parseInt(event.limit),
    nextToken: null,
  };
  const posts = await getPostsByCategoryHandler(getPostsByCategoryInput);
  return posts;
};

export async function createPost(event, context, callback) {
  const createPostInput: CreatePostInput = {
    caption: event.body.caption,
    category: event.body.category,
    created: new Date().getTime(),
    createdBy: event.body.createdBy,
    imageURL: event.body.imageURL,
    isLiked: event.body.isLiked,
    likeCount: 0,
    usernameFilter: event.body.usernameFilter
  };
  await createPostHandler(createPostInput)
  callback(null, 200)
};