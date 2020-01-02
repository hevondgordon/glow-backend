import {UpdateServiceIntervalInput, GetServiceIntervalInput} from './types';
import {CreateItemParams, createItem, getItem, GetItemParams,
  TABLE_NAME, UpdateItemParams, updateItem} from 'utils';

import DynamoDB = require('aws-sdk/clients/dynamodb')
const DocumentClient = new DynamoDB.DocumentClient({
  region: process.env.REGION,
});
export async function updateServiceIntervalHandler(params:
  UpdateServiceIntervalInput) {
  const updateItemParams: UpdateItemParams = {
    TableName: TABLE_NAME,
    Key: {'partitionKey': 'business-hours', 'sortKey': params.email},
    UpdateExpression:
    'set #serviceType = :serviceType',
    ConditionExpression: null,
    ExpressionAttributeValues: {
      ':serviceType': {
        hours: params.hours,
        minutes: params.minutes,
      },
    },
    ExpressionAttributeNames: {
      '#serviceType': params.serviceType,
    },
  };
  const updateSetParams: UpdateItemParams = {
    TableName: TABLE_NAME,
    Key: {'partitionKey': 'business-hours', 'sortKey': params.email},
    UpdateExpression:
    'ADD #serviceKeys :serviceKeys',
    ConditionExpression: null,
    ExpressionAttributeValues: {
      ':serviceKeys': DocumentClient.createSet([params.serviceType]),
    },
    ExpressionAttributeNames: {
      '#serviceKeys': 'serviceKeys',
    },
  };
  await updateItem(updateSetParams);
  await updateItem(updateItemParams);
}

export async function getBusinessHoursHandler(params:
  GetServiceIntervalInput) {
  const getItemParams: GetItemParams = {
    TableName: TABLE_NAME,
    KeyConditionExpression:
    'partitionKey = :serviceInterval and sortKey = :email',
    ExpressionAttributeValues: {
      ':serviceInterval': 'business-hours',
      ':email': params.email,
    },
  };
  const businessHoursDetails = await getItem(getItemParams);
  let businessHoursDetailsObject = {};
  if (businessHoursDetails.length > 0) {
    businessHoursDetailsObject = businessHoursDetails[0];
    delete businessHoursDetailsObject['partitionKey'];
    delete businessHoursDetailsObject['sortKey'];
  }
  return businessHoursDetailsObject;
}
