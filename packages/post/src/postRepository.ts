import {queryWithFilter, QueryWithFilterParams, CreateItemParams,
  createItem, TABLE_NAME} from 'utils';
import {GetPostsByCategoryInput, CreatePostInput} from './types';
import * as uuidv4 from 'uuid/v4';

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
      createdBy: params.createdBy,
      imageURL: params.imageURL,
      isLiked: params.isLiked,
      likeCount: params.likeCount,
      usernameFilter: params.usernameFilter,
      partitionKey: 'post',
      sortKey: uuidv4(),
    },
  };
  await createItem(createItemParams);
}
