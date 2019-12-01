import {getAppointmentsHandler, createAppointmentHandler,
  getAppointmentsByClientHandler,
  getAppointmentsByServiceProviderHandler, deleteAppointmentsHandler,
  updateAppointmentsHandler} from './appointmentRepository';

import {
  GetAppointmentsInput, CreateAppointmentInput,
  GetAppointmentsByClientInput, GetAppointmentsByServiceProviderInput,
  DeleteAppointmentInput,
  UpdateAppointmentInput} from './types';


export async function updateAppointment(event, context, callback) {
  const updateAppointmentInput: UpdateAppointmentInput = {
    serviceProvider: event.body.serviceProvider,
    time: event.body.time,
    date: event.body.date,
    comment: event.body.comment,
  };
  await updateAppointmentsHandler(updateAppointmentInput);
}

export async function deleteAppointment(event, context, callback) {
  const deleteAppointmentInput: DeleteAppointmentInput = {
    // sortKey should be sent from the front-end
    sortKey: event.body.sortKey,
  };
  await deleteAppointmentsHandler(deleteAppointmentInput);
}

export async function getAppointmentsByClient(event, context, callback) {
  const getAppointmentsByClientInput: GetAppointmentsByClientInput = {
    client: event.client,
    limit: parseInt(event.limit),
    nextToken: null,
  };
  const clientFilterAppointments = await getAppointmentsByClientHandler(
      getAppointmentsByClientInput);
  return clientFilterAppointments;
}

export async function getAppointmentsByServiceProvider(event, context,
    callback) {
  const getAppointmentsByServiceProviderInput:
  GetAppointmentsByServiceProviderInput = {
    serviceProvider: event.serviceProvider,
    limit: parseInt(event.limit),
    nextToken: null,
  };

  // changes need to be made
  const serviceProviderFilterAppointments = await
  getAppointmentsByServiceProviderHandler(
      getAppointmentsByServiceProviderInput
  );
  return serviceProviderFilterAppointments;
}


export async function getAppointments(event, context, callback) {
  const getAppointmentsInput: GetAppointmentsInput = {
    email: event.email,
  };
  const appointments = await getAppointmentsHandler(getAppointmentsInput);
  return appointments;
}

export async function createAppointment(event, context, callback) {
  const createAppointmentInput: CreateAppointmentInput = {
    client: event.body.client,
    serviceProvider: event.body.serviceProvider,
    // Time and date will be sent from the front-end
    time: new Date().getTime(),
    date: new Date(),
    comment: event.body.comment,
  };
  await createAppointmentHandler(createAppointmentInput);
  callback(null, 200);
}
