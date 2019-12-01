import {getServicesHandler} from './servicesRepository';

export async function getServices(event, context, callback) {
  try {
    return (await getServicesHandler());
  } catch (error) {
    return error;
  }
}
