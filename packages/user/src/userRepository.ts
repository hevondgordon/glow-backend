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

async function createUserDetailsObject(params) {
  const details = {
    UpdateExpression:
    'set ',
    ExpressionAttributeNames: {
    },
    ExpressionAttributeValues: {
    },
  };
  // eslint-disable-next-line guard-for-in
  for (const property in params) {
    if (property != 'email') {
      console.log(`${property}: ${params[property]}`);
      details.UpdateExpression += `#${property} = :${property}, `;
      details.ExpressionAttributeNames[`#${property}`] = `${property}`;
      details.ExpressionAttributeValues[`:${property}`] = params[property];
    }
  }

  details['UpdateExpression'] = details['UpdateExpression'].substring(
      0, details['UpdateExpression'].length - 2
  );

  const getUserDetailsInput: GetUserDetailsInput = {
    email: params['email'],
  };

  const userDetails = await getUserDetailsHandler(getUserDetailsInput);

  details['UpdateExpression'] += ' ,#personalId = :personalId';
  details.ExpressionAttributeNames['#personalId'] = 'personalId';
  details.ExpressionAttributeValues[':personalId'] = uuidv4();

  return details;
}

export async function updateUserDetailsHandler(params) {
  const userDetails = await createUserDetailsObject(params);
  const udateItemParams: UpdateItemParams = {
    TableName: TABLE_NAME,
    Key: {'partitionKey': 'profile', 'sortKey': params.email},
    UpdateExpression: userDetails['UpdateExpression'],
    ConditionExpression: null,
    ExpressionAttributeNames: userDetails['ExpressionAttributeNames'],
    ExpressionAttributeValues: userDetails['ExpressionAttributeValues'],
  };
  console.log(JSON.stringify(udateItemParams));
  return (await updateItem(udateItemParams));
}

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
  details['username'] = details['sortKey'];
  delete details['sortKey'];
  delete details['partitionKey'];
  return details;
}

export async function updateOpeningHoursHandler(params: OpeningHoursInput) {
  const udateItemParams: UpdateItemParams = {
    TableName: TABLE_NAME,
    Key: {'partitionKey': 'business-hours', 'sortKey': params.email},
    UpdateExpression:
    'set #openFromMins = :openFromMins, #openFromHours = :openFromHours, #openToHours = :openToHours, #openToMins = :openToMins',
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
  console.log(JSON.stringify(udateItemParams));
  return (await updateItem(udateItemParams));
}

export async function addProfileDetailsHandler(
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
