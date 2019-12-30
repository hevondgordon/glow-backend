import {UpdateProfileDetailsInput, GetUserDetailsInput,
  OpeningHoursInput} from './types';
import {
  CreateItemParams, TABLE_NAME,
  ACCOUNT_TYPE_BUSINESS, ACCOUNT_TYPE_PERSONAL, createItem,
  GetItemParams, getItem, UpdateItemParams, updateItem} from 'utils';

import DynamoDB = require('aws-sdk/clients/dynamodb');
const DocumentClient = new DynamoDB.DocumentClient({
  region: process.env.REGION,
});

import * as uuidv4 from 'uuid/v4';

export async function getUserDetailsHandler(params: GetUserDetailsInput) {
  const getItemParams: GetItemParams = {
    TableName: TABLE_NAME,
    KeyConditionExpression: 'partitionKey = :partitionKey and sortKey = :email',
    ExpressionAttributeValues: {
      ':partitionKey': 'profile',
      ':email': params.email,
    },
  };
  const details = await getItem(getItemParams);
  return details;
}

export async function updateOpeningHoursHandler(params: OpeningHoursInput) {
  const udateItemParams: UpdateItemParams = {
    TableName: TABLE_NAME,
    Key: {'partitionKey': 'business-hours', 'sortKey': params.email},
    UpdateExpression:
    'set #openFromHours = :openFromHours,#openFromMins = :openFromMins, #openToHours = :openToHours, #openToMins = :openToMins',
    ConditionExpression: null,
    ExpressionAttributeNames: {
      '#openFromHours': 'openFromHours',
      '#openFromMins': 'openFromMins',
      '#openToHours': 'openToHours',
      '#openToMins': 'openToMins',
    },
    ExpressionAttributeValues: {
      ':openFromHours': params.openFromHours,
      ':openFromMins': params.openFromMins,
      ':openToHours': params.openToHours,
      ':openToMins': params.openToMins,
    },
  };
  return (await updateItem(udateItemParams));
}

export async function updateProfileDetailsHandler(
    params: UpdateProfileDetailsInput) {
  const itemKeys = {
    partitionKey: 'profile',
    sortKey: params.personalEmailAddress,
  };

  const itemDetails = createItemBasedOnAccountType(
      params.accountType, params);

  const item = {...itemKeys, ...itemDetails};
  const createItemParams: CreateItemParams = {
    TableName: TABLE_NAME,
    Item: item,
  };
  await createItem(createItemParams);
  await setupBusinessHours(params);
}

function createItemBasedOnAccountType(accountType: string,
    params: UpdateProfileDetailsInput) {
  const item = {};
  if (params.profileImage !== undefined) {
    item['profileImage'] = params.profileImage;
  }
  item['firstName'] = params.firstName;
  item['lastName'] = params.lastName;
  item['gender'] = params.gender;
  item['HIDE_INITIAL_SETUP'] = true;

  if (accountType === ACCOUNT_TYPE_PERSONAL) {
    item['accountType'] = params.accountType;
    item['personalPhoneNumber'] = params.personalPhoneNumber;
  } else if (accountType === ACCOUNT_TYPE_BUSINESS) {
    item['accountType'] = params.accountType;
    item['businessName'] = params.businessName;
    item['businessPhone'] = params.businessPhone;
    item['businessAddress'] = params.businessAddress;
    item['businessDescription'] = params.businessDescription;
    item['selectedServices'] = params.selectedServices;
  }
  console.log('createItemBasedOnAccountType');
  console.log(JSON.stringify(item));
  return item;
}

async function setupBusinessHours(params: UpdateProfileDetailsInput) {
  const defaultIntervals = {
    'hours': 1,
    'minutes': 0,
  };
  const businessHoursObject = {
    'openFromHours': 9,
    'openFromMins': 0,
    'openToHours': 17,
    'openToMins': 0,
    'partitionKey': 'business-hours',
    'sortKey': params.personalEmailAddress,
  };

  params.selectedServices.forEach((element) => {
    businessHoursObject[element] = defaultIntervals;
  });

  const updateSetParams: UpdateItemParams = {
    TableName: TABLE_NAME,
    Key: {'partitionKey': 'business-hours',
      'sortKey': params.personalEmailAddress},
    UpdateExpression:
    'ADD #serviceKeys :serviceKeys',
    ConditionExpression: null,
    ExpressionAttributeValues: {
      ':serviceKeys': DocumentClient.createSet(params.selectedServices),
    },
    ExpressionAttributeNames: {
      '#serviceKeys': 'serviceKeys',
    },
  };
  const createDefaultBusinessHours: CreateItemParams = {
    TableName: TABLE_NAME,
    Item: businessHoursObject,
  };
  console.log(JSON.stringify(createDefaultBusinessHours)+'\n'+updateSetParams);
  await createItem(createDefaultBusinessHours);
  await updateItem(updateSetParams);
}
