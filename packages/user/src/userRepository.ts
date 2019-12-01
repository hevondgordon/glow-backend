import {UpdateProfileDetailsInput, GetUserDetailsInput} from './types';
import {
  CreateItemParams, TABLE_NAME,
  ACCOUNT_TYPE_BUSINESS, ACCOUNT_TYPE_PERSONAL, createItem,
  GetItemParams, getItem} from 'utils';

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
}

function createItemBasedOnAccountType(accountType: string,
    params: UpdateProfileDetailsInput) {
  const item = {};
  if (params.profileImage !== undefined) {
    item['profileImage'] = params.profileImage;
  }
  if (accountType === ACCOUNT_TYPE_PERSONAL) {
    item['firstName'] = params.firstName;
    item['lastName'] = params.lastName;
    item['accountType'] = params.accountType;
    item['gender'] = params.gender;
    item['personalPhoneNumber'] = params.personalPhoneNumber;
  } else if (accountType === ACCOUNT_TYPE_BUSINESS) {
    item['firstName'] = params.firstName;
    item['lastName'] = params.lastName;
    item['accountType'] = params.accountType;
    item['gender'] = params.gender;
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
