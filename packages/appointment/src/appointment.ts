import {getAppointmentsHandler, createAppointmentHandler,
  deleteAppointmentHandler,
  updateAppointmentsHandler, updateAppointmentAvailabilityHandler,
  getAppointmentAvailabilityHandler, makeDateAvailableHandler,
} from './appointmentRepository';

import {getUserDetails, User} from 'user';

import {
  GetAppointmentsInput, CreateAppointmentInput,
  DeleteAppointmentInput, UpdateAppointmentAvailability,
  UpdateAppointmentInput, UpdateAppointmentAvailabilityInput,
  MakeDateAvailable} from './types';

async function handleResponse(callback, handler, input) {
  let status = {};
  try {
    await handler(input);
    status = {'status': 200};
  } catch (error) {
    console.log(error);
    status = {'status': 500};
  }
  callback(null, status);
}

export async function updateAppointment(event, context, callback) {
  const updateAppointmentInput: UpdateAppointmentInput = {
    'date': event.body.date,
    'time': event.body.time,
    'serviceType': event.body.serviceType,
    'email': event.body.client,
    'appointmentId': event.body.appointmentId,
  };
  if (event.body.comment != '') {
    updateAppointmentInput['comment'] = event.body.comment;
  };
  let status = {};
  try {
    await updateAppointmentsHandler(updateAppointmentInput);
    status = {'status': 200};
  } catch (error) {
    console.log(error);
    status = {
      'status': 500,
      'error': error,
    };
  }
  callback(null, status);
}

export async function getAppointmentAvailability(event, context, callback) {
  const getAppointmentAvailabilityInput: GetAppointmentsInput = {
    email: event.email,
  };
  const dateItems = await getAppointmentAvailabilityHandler(
      getAppointmentAvailabilityInput);
  return dateItems;
}

export async function updateAppointmentAvailability(event, context, callback) {
  const putRequestItems = [];
  for (const key of Object.keys(event.body)) {
    if (key !== 'available' && key !== 'email' && key !== 'openingHours') {
      const dateObject = event.body[key];
      const updateAppointmentAvailability: UpdateAppointmentAvailability = {
        day: dateObject.day,
        month: dateObject.month,
        year: dateObject.year,
        available: event.body.available,
      };
      const putRequestItem = {
        PutRequest: {
          Item: {
            partitionKey: 'appointment-availability-' + event.body.email,
            sortKey: key,
            ...updateAppointmentAvailability,
          },
        },
      };
      if (event.body.openingHours) {
        putRequestItem.PutRequest.Item[
            'openFromHours'] = event.body.openingHours.openFromHours;
        putRequestItem.PutRequest.Item[
            'openFromMins'] = event.body.openingHours.openFromMins;
        putRequestItem.PutRequest.Item[
            'openToHours'] = event.body.openingHours.openToHours;
        putRequestItem.PutRequest.Item[
            'openToMins'] = event.body.openingHours.openToMins;
      }
      putRequestItems.push(putRequestItem);
    }
  }
  const updateAppointmentAvailabilityInput:
  UpdateAppointmentAvailabilityInput = {
    items: putRequestItems,
  };
  let status = {};
  try {
    await updateAppointmentAvailabilityHandler(
        updateAppointmentAvailabilityInput);
    status = {'status': 200};
  } catch (error) {
    console.log(error);
    status = {
      'status': 500,
      'error': error,
    };
  }
  console.log(JSON.stringify(putRequestItems));

  callback(null, status);
}

export async function makeDateAvailable(event, context, callback) {
  const deleteItem: MakeDateAvailable = {
    email: event.body.email,
    id: event.body.id,
  };
  let status = {};
  try {
    await makeDateAvailableHandler(deleteItem);
    status = {'status': 200};
  } catch (error) {
    console.log(error);
    status = {
      'status': 500,
      error,
    };
  }
  callback(null, status);
}

export async function cancelAppointment(event, context, callback) {
  const deleteAppointmentInput: DeleteAppointmentInput = {
    email: event.body.email,
    appointmentId: event.body.appointmentId,
  };
  console.log(JSON.stringify(deleteAppointmentInput));
  let status = {};
  try {
    await deleteAppointmentHandler(deleteAppointmentInput);
    status = {'status': 200};
  } catch (error) {
    console.log(error);
    status = {
      'status': 500,
      error,
    };
  }
  console.log('STATUS---------' + JSON.stringify(status));
  callback(null, status);
}


export async function getAppointments(event, context, callback) {
  const getAppointmentsInput: GetAppointmentsInput = {
    email: event.email,
  };
  const appointments = await getAppointmentsHandler(getAppointmentsInput);
  return appointments;
}

export async function createAppointment(event, context, callback) {
  const clientDetails = await getUserDetails(event.body.client);
  const serviceProviderDetails = await getUserDetails(
      event.body.serviceProvider
  );
  const client: User = {
    firstName: clientDetails['firstName'],
    lastName: clientDetails['lastName'],
    phoneNumber: clientDetails['personalPhoneNumber'],
    email: clientDetails['sortKey'],
  };

  const serviceProvider: User = {
    address: serviceProviderDetails['businessAddress'],
    firstName: serviceProviderDetails['firstName'],
    lastName: serviceProviderDetails['lastName'],
    phoneNumber: serviceProviderDetails['businessPhone'],
    email: serviceProviderDetails['sortKey'],
  };

  const createAppointmentInput: CreateAppointmentInput = {
    time: event.body.time,
    serviceType: event.body.serviceType,
    date: event.body.date,
    comment: event.body.comment,
    client: client,
    serviceProvider: serviceProvider,
    appointmentTimestamp: new Date(event.body.date).getTime(),
  };

  console.log(JSON.stringify(createAppointmentInput));
  let status = {};
  try {
    await createAppointmentHandler(createAppointmentInput,
        event.body.serviceProvider, event.body.client);
    status = {'status': 200};
  } catch (error) {
    console.log(error);
    status = {'status': error};
  }
  callback(null, status);
}
