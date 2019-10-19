export interface QueryWithFilterParams {
    KeyConditionExpression: string;
    ExpressionAttributeValues: object;
    FilterExpression: string;
    TableName: string;
    ExpressionAttributeNames?: any;
    Limit?: number;
}
