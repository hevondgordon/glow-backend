import {queryWithFilter, QueryWithFilterParams, CreateItemParams,
  createItem, TABLE_NAME, updateItem, UpdateItemParams} from 'utils';
import {GetPostsByCategoryInput, CreatePostInput,
  GetPostByUserInput, LikedPostInput, GetPostByBusinessInput} from './types';

import * as uuidv4 from 'uuid/v4';

import DynamoDB = require('aws-sdk/clients/dynamodb')
const DocumentClient = new DynamoDB.DocumentClient({
  region: process.env.REGION,
});

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

export async function getPostByBusinessHandler(params: GetPostByBusinessInput) {
  const queryWithFilterParams: QueryWithFilterParams = {
    TableName: TABLE_NAME,
    KeyConditionExpression: 'partitionKey = :post',
    ExpressionAttributeValues: {
      ':post': 'post',
      ':businessName': params.businessName,
    },
    FilterExpression: 'contains(businessName, :businessName)',
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
  posts.sort((a, b) => b.timestamp - a.timestamp);
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
      businessName: params.businessName,
      partitionKey: 'post',
      sortKey: uuidv4(),
      timestamp: Date.now(),
    },
  };
  try {
    await createItem(createItemParams);
  } catch (error) {
    console.log(error);
  }
}

export async function likePostHandler(params: LikedPostInput) {
  const updateItemParams: UpdateItemParams = {
    TableName: TABLE_NAME,
    Key: {'partitionKey': 'post', 'sortKey': params.postId},
    UpdateExpression: 'ADD likedBy :likedBy',
    ConditionExpression: null,
    ExpressionAttributeNames: null,
    ExpressionAttributeValues: {
      ':likedBy': DocumentClient.createSet([params.user]),
    },
  };
  try {
    await updateItem(updateItemParams);
  } catch (error) {
    console.log(error);
  }
}

export async function removeLikeFromPostHandler(params: LikedPostInput) {
  const updateItemParams: UpdateItemParams = {
    TableName: TABLE_NAME,
    Key: {'partitionKey': 'post', 'sortKey': params.postId},
    UpdateExpression: 'DELETE likedBy :likedBy',
    ConditionExpression: null,
    ExpressionAttributeNames: null,
    ExpressionAttributeValues: {
      ':likedBy': DocumentClient.createSet([params.user]),
    },
  };
  try {
    await updateItem(updateItemParams);
  } catch (error) {
    console.log(error);
  }
}
