
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

export function getFormattedDate() {
  const today = new Date();
  const day = String(today.getDate());
  const month = today.getMonth() + 1;
  const year = String(today.getFullYear());

  const formattedDate = day + ' ' + getMonth(month) + ' ' + year;
  return formattedDate;
}

function getMonth(month: number) {
  const months = {
    1: 'January', 8: 'August',
    2: 'February', 9: 'September',
    3: 'March', 10: 'October',
    4: 'April', 11: 'November',
    5: 'May', 12: 'December',
    6: 'June',
    7: 'July',
  };
  return months[month];
}
