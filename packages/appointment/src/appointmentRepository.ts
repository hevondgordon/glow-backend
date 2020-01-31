import {getItem, GetItemParams, CreateItemParams, createItem, TABLE_NAME,
  QueryWithFilterParams, queryWithFilter, deleteItem, BatchWriteItems,
  batchWriteItems, DeleteItemParams, UpdateItemParams, updateItem} from 'utils';

import {GetAppointmentsInput, CreateAppointmentInput,
  DeleteAppointmentInput, UpdateAppointmentInput,
  UpdateAppointmentAvailabilityInput, MakeDateAvailable} from './types';

import * as uuidv4 from 'uuid/v4';

function setupDynamicInput(params: UpdateAppointmentInput) {
  const x = {
    UpdateExpression: 'set ',
    ExpressionAttributeValues: {},
  };
  for (const key of Object.keys(params)) {
    if (key != 'appointmentId' && key != 'email') {
      if (key == 'date' || key == 'time' || key == 'comment') {
        x['UpdateExpression'] += '#' + key + `=:${key}, `;
      } else {
        x['UpdateExpression'] += key + `=:${key}, `;
      }
      x['ExpressionAttributeValues'][`:${key}`] = params[key];
    }
  }
  x['UpdateExpression'] = x['UpdateExpression'].substring(
      0, x['UpdateExpression'].length - 2
  );
  console.log(JSON.stringify(x));
  return x;
}

export async function updateAppointmentsHandler(params:
  UpdateAppointmentInput) {
  const dynamicInput = setupDynamicInput(params);
  const updateItemParams: UpdateItemParams = {
    TableName: TABLE_NAME,
    Key: {'partitionKey': 'appointment-' + params.email,
      'sortKey': params.appointmentId},
    UpdateExpression: dynamicInput['UpdateExpression'],
    ConditionExpression: null,
    ExpressionAttributeNames: {
      '#date': 'date',
      '#time': 'time',
    },
    ExpressionAttributeValues: dynamicInput['ExpressionAttributeValues'],
  };
  if (params.comment != undefined) {
    updateItemParams['ExpressionAttributeNames']['#comment'] = params.comment;
  }
  await updateItem(updateItemParams);
}

export async function updateAppointmentAvailabilityHandler(params:
  UpdateAppointmentAvailabilityInput) {
  const batchWriteItemsParams: BatchWriteItems = {
    TableName: TABLE_NAME,
    Items: params.items,
  };
  return (await batchWriteItems(batchWriteItemsParams));
}

export async function deleteAppointmentHandler(params:
    DeleteAppointmentInput) {
  const deleteAppointmentParams : DeleteItemParams = {
    TableName: TABLE_NAME,
    Key: {
      'partitionKey': 'appointment-' + params.email,
      'sortKey': params.appointmentId,
    },
  };
  await deleteItem(deleteAppointmentParams);
  console.log(JSON.stringify(deleteAppointmentParams));
  console.log('brawlin');
}

export async function makeDateAvailableHandler(params: MakeDateAvailable) {
  const deleteAppointmentParams : DeleteItemParams = {
    TableName: TABLE_NAME,
    Key: {
      'partitionKey': 'appointment-availability-' + params.email,
      'sortKey': params.id.toString(),
    },
  };
  console.log(JSON.stringify(deleteAppointmentParams));
  await deleteItem(deleteAppointmentParams);
}

export async function getAppointmentAvailabilityHandler(params:
  GetAppointmentsInput) {
  const getAppointmentParams: GetItemParams = {
    TableName: TABLE_NAME,
    KeyConditionExpression: 'partitionKey = :partitionKey',
    ExpressionAttributeValues: {
      ':partitionKey': 'appointment-availability-' + params.email,
    },
  };
  const dateItems = await getItem(getAppointmentParams);
  dateItems.forEach((dateItem)=>{
    dateItem['id'] = Number(dateItem['sortKey']);
    delete dateItem['sortKey'];
    delete dateItem['partitionKey'];
  });
  return dateItems;
}
export async function getAppointmentsHandler(params:
    GetAppointmentsInput) {
  const getAppointmentParams: GetItemParams = {
    TableName: TABLE_NAME,
    KeyConditionExpression: 'partitionKey = :appointment',
    ExpressionAttributeValues: {
      ':appointment': 'appointment-' + params.email,
    },
  };
  const appointments = await getItem(getAppointmentParams);
  appointments.forEach((appointment) => {
    appointment['appointmentId'] = appointment['sortKey'];
    delete appointment['sortKey'];
  });
  appointments.sort((a, b) => a.appointmentTimestamp - b.appointmentTimestamp);
  return appointments;
}

export async function createAppointmentHandler(params:
    CreateAppointmentInput, serviceProviderEmail, clientEmail) {
  const clientAppointmentParams: CreateItemParams = {
    TableName: TABLE_NAME,
    Item: {
      appointmentTimestamp: params.appointmentTimestamp,
      timestamp: Date.now(),
      serviceType: params.serviceType,
      client: params.client,
      serviceProvider: params.serviceProvider,
      time: params.time,
      date: params.date,
      partitionKey: 'appointment-' + clientEmail,
    },
  };
  const serviceProviderParams: CreateItemParams = {
    TableName: TABLE_NAME,
    Item: {
      appointmentTimestamp: params.appointmentTimestamp,
      timestamp: Date.now(),
      serviceType: params.serviceType,
      client: params.client,
      serviceProvider: params.serviceProvider,
      time: params.time,
      date: params.date,
      partitionKey: 'appointment-' + serviceProviderEmail,
    },
  };
  if (params.comment != '' && params.comment != undefined) {
    clientAppointmentParams.Item['comment'] = params.comment;
    serviceProviderParams.Item['comment'] = params.comment;
  }

  clientAppointmentParams.Item['sortKey'] = uuidv4();
  serviceProviderParams.Item['sortKey'] = uuidv4();
  await createItem(clientAppointmentParams);
  await createItem(serviceProviderParams);
}

