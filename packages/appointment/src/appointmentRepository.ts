import {getItem, GetItemParams, CreateItemParams, createItem, TABLE_NAME,
  QueryWithFilterParams, queryWithFilter, deleteItem,
  DeleteItemParams} from 'utils';

import {GetAppointmentsInput, CreateAppointmentInput,
  GetAppointmentsByClientInput, GetAppointmentsByServiceProviderInput,
  DeleteAppointmentInput, UpdateAppointmentInput} from './types';

import * as uuidv4 from 'uuid/v4';

export async function updateAppointmentsHandler(params:
  UpdateAppointmentInput) {
  const appointmentKey = {
    partitionKey: 'appointment',
    // please revisit
    sortKey: uuidv4(),
  };
  // code should go here
}

export async function deleteAppointmentsHandler(params:
    DeleteAppointmentInput) {
  const DeleteAppointmentParams : DeleteItemParams = {
    TableName: TABLE_NAME,
    Key: {
      ':appointment': 'appointment',
      // please revisit
      ':sortKey': params.sortKey,
    },
  };
  await deleteItem(DeleteAppointmentParams);
}


export async function getAppointmentsByServiceProviderHandler(params:
    GetAppointmentsByServiceProviderInput) {
  const queryAppointmentsByServiceProviderParams: QueryWithFilterParams = {
    TableName: TABLE_NAME,
    KeyConditionExpression: 'partitionKey = :appointment',
    ExpressionAttributeValues: {
      ':appointment': 'appointment',
      ':serviceProvider': params.serviceProvider,
    },
    FilterExpression: ':serviceProvider = serviceProvider',
    Limit: params.limit,
  };
  const serviceProviderFilterAppointments = await queryWithFilter(
      queryAppointmentsByServiceProviderParams
  );
  return serviceProviderFilterAppointments;
}

export async function getAppointmentsByClientHandler(params:
    GetAppointmentsByClientInput) {
  const queryAppointmentsByClientParams: QueryWithFilterParams = {
    TableName: TABLE_NAME,
    KeyConditionExpression: 'partitionKey = :appointment',
    ExpressionAttributeValues: {
      ':appointment': 'appointment',
      ':client': params.client,
    },
    FilterExpression: ':client = client',
    Limit: params.limit,
  };
  const clientFilterAppointments = await queryWithFilter(
      queryAppointmentsByClientParams
  );
  return clientFilterAppointments;
}


export async function getAppointmentsHandler(params:
    GetAppointmentsInput) {
  const getAppointmentParams: GetItemParams = {
    TableName: TABLE_NAME,
    KeyConditionExpression: 'partitionKey = :appointment and sortKey = :email',
    ExpressionAttributeValues: {
      ':appointment': 'appointment',
      'sortKey': uuidv4(),
    },
  };
  const appointments = await getItem(getAppointmentParams);
  return appointments;
}

export async function createAppointmentHandler(params:
    CreateAppointmentInput) {
  const createAppointmentParams: CreateItemParams = {
    TableName: TABLE_NAME,
    Item: {
      client: params.client,
      serviceProvider: params.serviceProvider,
      time: params.time,
      date: params.date,
      comment: params.comment,
      partitionKey: 'post-appointment',
      sortKey: uuidv4(),
    },
  };
  await createItem(createAppointmentParams);
}

