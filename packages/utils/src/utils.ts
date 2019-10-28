
import DynamoDB = require('aws-sdk/clients/dynamodb')
const DocumentClient = new DynamoDB.DocumentClient({
  region: process.env.REGION,
});

import {TABLE_NAME} from './constants';

import {QueryWithFilterParams, CreateItemParams, GetItemParams} from './types';

export async function getItem(query: GetItemParams):
  Promise<any[]> {
  const params: GetItemParams = {
    TableName: query.TableName,
    KeyConditionExpression: query.KeyConditionExpression,
    ExpressionAttributeValues: query.ExpressionAttributeValues,
  };
  return new Promise((resolve, reject) => {
    DocumentClient.query(params, function(err, data) {
      if (err) reject(err);
      else resolve(data.Items);
    });
  });
}

export async function queryWithFilter(query: QueryWithFilterParams):
  Promise<any[]> {
  const params = {
    TableName: query.TableName,
    KeyConditionExpression: query.KeyConditionExpression,
    FilterExpression: query.FilterExpression,
    ExpressionAttributeValues: query.ExpressionAttributeValues,
    ExpressionAttributeNames: query.ExpressionAttributeNames,
  };
  return new Promise((resolve, reject) => {
    DocumentClient.query(params, (err, data) => {
      err ? reject(err) : resolve(data.Items);
    });
  });
};

export async function createItem(query: CreateItemParams) {
  const params = {
    TableName: query.TableName,
    Item: query.Item,
  };
  return new Promise((resolve, reject) => {
    DocumentClient.put(params, (err, data) => {
      if (err) console.log(err);
      err ? reject(err) : resolve(data);
    });
  });
}
