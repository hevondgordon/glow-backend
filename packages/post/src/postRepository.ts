import {queryWithFilter, QueryWithFilterParams, CreateItemParams,
  createItem, TABLE_NAME} from 'utils';
import {GetPostsByCategoryInput, CreatePostInput,
  GetPostByUserInput} from './types';
import * as uuidv4 from 'uuid/v4';

export async function getPostByUserHandler(params: GetPostByUserInput) {
  const queryWithFilterParams: QueryWithFilterParams = {
    TableName: TABLE_NAME,
    KeyConditionExpression: 'partitionKey = :post',
    ExpressionAttributeValues: {
      ':post': 'post',
      ':email': params.email,
    },
    FilterExpression: 'usernameFilter = :email',
    Limit: 10,
  };

  const posts = await queryWithFilter(queryWithFilterParams);
  return posts;
}

export async function getPostsByCategoryHandler(params:
  GetPostsByCategoryInput) {
  const queryWithFilterParams: QueryWithFilterParams = {
    TableName: TABLE_NAME,
    KeyConditionExpression: 'partitionKey = :post',
    ExpressionAttributeValues: {
      ':post': 'post',
      ':category': params.category,
    },
    FilterExpression: 'category = :category',
    Limit: params.limit,
  };

  const posts = await queryWithFilter(queryWithFilterParams);
  return posts;
}

export async function createPostHandler(params:
  CreatePostInput) {
  const createItemParams: CreateItemParams = {
    TableName: TABLE_NAME,
    Item: {
      caption: params.caption,
      category: params.category,
      created: params.created,
      type: params.type,
      createdBy: params.createdBy,
      URL: params.URL,
      isLiked: params.isLiked,
      likeCount: params.likeCount,
      usernameFilter: params.usernameFilter,
      partitionKey: 'post',
      sortKey: uuidv4(),
    },
  };
  await createItem(createItemParams);
}
