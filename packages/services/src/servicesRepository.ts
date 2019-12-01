import {GetItemParams, TABLE_NAME, getItem} from 'utils';

export async function getServicesHandler() {
  const getItemParams: GetItemParams = {
    TableName: TABLE_NAME,
    KeyConditionExpression: 'partitionKey = :partitionKey',
    ExpressionAttributeValues: {
      ':partitionKey': 'service',
    },
  };
  const newServices = [];
  const services = await getItem(getItemParams);
  services.forEach((service) => {
    newServices.push({'service': service['sortKey']});
  });
  return newServices;
}
