import {getItem, GetItemParams, CreateItemParams, createItem, TABLE_NAME } from 'utils';
import {GetAppointmentsInput, CreateAppointmentInput} from './types';
import * as uuidv4 from 'uuid/v4';

export async function getAppointmentsHandler(params:
    GetAppointmentsInput) {
        const getAppointmentParams: GetItemParams = {
            TableName: TABLE_NAME,
            KeyConditionExpression: 'partitionKey = :appointment and sortKey = :email',
            ExpressionAttributeValues: {
                ':appointment': 'appointment',
                ':email': params.email

            }
        };
      const appointments = await getItem(getAppointmentParams)
      return appointments
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
            sortKey: uuidv4()
            }

        }
    await createItem(createAppointmentParams);
    }

