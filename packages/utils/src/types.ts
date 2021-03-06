import DynamoDB = require('aws-sdk/clients/dynamodb')
export interface QueryWithFilterParams {
    KeyConditionExpression: string
    ExpressionAttributeValues: object
    FilterExpression: string
    TableName: string
    ExpressionAttributeNames?: any,
    Limit?: number
 }

export interface CreateItemParams {
    TableName: string
    Item: object
 }

export interface GetItemParams {
   TableName: string
   KeyConditionExpression: string,
   ExpressionAttributeValues: object
}

export interface UpdateItemParams {
   TableName: string
   Key: object,
   UpdateExpression: string,
   ConditionExpression?: string,
   ExpressionAttributeNames?:
   DynamoDB.DocumentClient.ExpressionAttributeNameMap,
   ExpressionAttributeValues: object
}
export interface DeleteItemParams {
   TableName: string
   Key: object,
}

export interface BatchWriteParams {
   RequestItems: object
}

export interface BatchWriteItems {
   TableName: string
   Items: any[]
}


