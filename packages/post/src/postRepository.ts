import {queryWithFilter, QueryWithFilterParams} from 'utils';
import {GetPostsByCategoryInput} from './types';
const TABLE_NAME = 'Glow';

export async function getPostsByCategoryHandler(params:
  GetPostsByCategoryInput) {
  const queryWithFilterParams: QueryWithFilterParams = {
    TableName: TABLE_NAME,
    KeyConditionExpression: 'partitionKey = :post',
    ExpressionAttributeValues: {
      ':post': 'post',
      ':category': params.category,
    },
    FilterExpression: 'category = :category',
    Limit: params.limit,
  };

  const posts = await queryWithFilter(queryWithFilterParams);
  return posts;
}
