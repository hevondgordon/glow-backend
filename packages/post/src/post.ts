import {getPostsByCategoryHandler, createPostHandler,
  getPostByUserHandler} from './postRepository';
import {GetPostsByCategoryInput, CreatePostInput,
  GetPostByUserInput} from './types';

import {getFormattedDate} from 'utils';

import {getUserDetailsHandler, GetUserDetailsInput, User} from 'user';

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
  const getUserDetailsInput: GetUserDetailsInput = {
    email: event.body.email,
  };
  const details = (await getUserDetailsHandler(getUserDetailsInput))[0];
  const user: User = {
    address: details['address'],
    firstName: details['firstName'],
    lastName: details['lastName'],
    phoneNumber: details['personalPhoneNumber'],
    email: details['sortKey'],
  };
  const createPostInput: CreatePostInput = {
    caption: event.body.caption,
    category: event.body.category,
    created: getFormattedDate(),
    createdBy: user,
    imageURL: event.body.imageURL,
    isLiked: false,
    likeCount: 0,
    usernameFilter: event.body.email,
  };
  let status = {};
  try {
    await createPostHandler(createPostInput);
    status = {'status': 200};
  } catch {
    status = {'status': 500};
  }
  callback(null, status);
};

export async function getPostByUser(event, context, callback) {
  const getPostByUserInput: GetPostByUserInput = {
    email: event.email,
  };
  const posts = await getPostByUserHandler(getPostByUserInput);
  callback(null, posts);
}
