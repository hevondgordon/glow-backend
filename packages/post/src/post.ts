import {getPostsByCategoryHandler, createPostHandler,
  getPostByUserHandler, likePostHandler, removeLikeFromPostHandler,
  getPostByBusinessHandler} from './postRepository';
import {GetPostsByCategoryInput, CreatePostInput,
  GetPostByUserInput, LikedPostInput, GetPostByBusinessInput} from './types';

import {getFormattedDate} from 'utils';

import {getUserDetailsHandler, GetUserDetailsInput, User} from 'user';

async function handleResponse(callback, handler, input) {
  let status = {};
  try {
    await handler(input);
    status = {'status': 200};
  } catch (error) {
    console.log(error);
    status = {'status': 500};
  }
  callback(null, status);
}

export async function likePost(event, context, callback) {
  const likedPostInput: LikedPostInput = {
    postId: event.body.postId,
    user: event.body.user,
  };
  await handleResponse(callback, likePostHandler, likedPostInput);
}

export async function removeLikeFromPost(event, context, callback) {
  const likedPostInput: LikedPostInput = {
    postId: event.body.postId,
    user: event.body.user,
  };
  await handleResponse(callback, removeLikeFromPostHandler, likedPostInput);
}

export async function getPostsByBusiness(event, context, callback) {
  const getPostsByBusinessInput: GetPostByBusinessInput = {
    businessName: event.businessName,
  };
  const posts = await getPostByBusinessHandler(getPostsByBusinessInput);
  return posts;
};

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

  if (details['businessName'] !== undefined) {
    user['businessName'] = details['businessName'];
  }
  if (details['businessPhone'] !== undefined &&
  details['personalPhoneNumber'] !== undefined) {
    user['phoneNumber'] = details['businessPhone'];
  } else if (details['businessPhone'] !== undefined) {
    user['phoneNumber'] = details['businessPhone'];
  } else if (details['personalPhoneNumber'] !== undefined) {
    user['phoneNumber'] = details['personalPhoneNumber'];
  }

  const createPostInput: CreatePostInput = {
    caption: event.body.caption,
    category: event.body.category,
    type: event.body.type,
    created: getFormattedDate(),
    createdBy: user,
    URL: event.body.URL,
    isLiked: false,
    likeCount: 0,
    usernameFilter: event.body.email,
    businessName: details['businessName'],
  };

  let status = {};
  try {
    await createPostHandler(createPostInput);
    status = {'status': 200};
  } catch {
    status = {'status': 500};
  }
  console.log(status);
  callback(null, status);
  // handleResponse(callback, createPostHandler, createPostInput);
};

export async function getPostByUser(event, context, callback) {
  const getPostByUserInput: GetPostByUserInput = {
    email: event.email,
  };
  const posts = await getPostByUserHandler(getPostByUserInput);
  callback(null, posts);
}
