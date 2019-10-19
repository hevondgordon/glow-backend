export interface QueryWithFilterParams {
    KeyConditionExpression: string;
    ExpressionAttributeValues: object;
    FilterExpression: string;
    TableName: string;
    ExpressionAttributeNames?: any;
    Limit?: number;
}
export interface CreateItemParams {
    TableName: string;
    Item: object;
}
