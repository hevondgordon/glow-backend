import {getPostsByCategoryHandler} from './postRepository';
import {GetPostsByCategoryInput} from './types';
export async function getPostsByCategory(event, context, callback) {
  const getPostsByCategoryInput: GetPostsByCategoryInput = {
    category: event.category,
    limit: parseInt(event.limit),
    nextToken: null,
  };
  const posts = await getPostsByCategoryHandler(getPostsByCategoryInput);
  return posts;
};
