import {UpdateServiceIntervalInput, GetServiceIntervalInput} from './types';
import {updateServiceIntervalHandler, getBusinessHoursHandler,
} from './settingsRepository';

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

export async function updateServiceInterval(event, context, callback) {
  const updateServiceIntervalInput: UpdateServiceIntervalInput = {
    hours: event.body.hours,
    minutes: event.body.minutes,
    email: event.body.email,
    serviceType: event.body.serviceType,
  };
  let status = {};
  try {
    await updateServiceIntervalHandler(updateServiceIntervalInput);
    status = {'status': 200};
  } catch (error) {
    status = {'status': 500};
  }
  return status;
}

export async function getBusinessHours(event, context, callback) {
  const getServiceIntervalInput: GetServiceIntervalInput = {
    email: event.email,
  };
  return (await getBusinessHoursHandler(getServiceIntervalInput));
}
