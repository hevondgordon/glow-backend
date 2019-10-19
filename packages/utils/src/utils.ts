
import DynamoDB = require('aws-sdk/clients/dynamodb')
const DocumentClient = new DynamoDB.DocumentClient({
  region: process.env.REGION,
});

import {QueryWithFilterParams} from './types';

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
