import {UpdateProfileDetailsInput, GetUserDetailsInput,
  OpeningHoursInput} from './types';

import {
  addProfileDetailsHandler, getUserDetailsHandler,
  updateOpeningHoursHandler, updateUserDetailsHandler,
} from './userRepository';

async function handleResponse(callback, handler, input) {
  let status = {};
  try {
    await handler(input);
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

export async function addUserDetails(event, context, callback) {
  console.log(JSON.stringify(event));
  const profileDetails: UpdateProfileDetailsInput = {
    profileImage: event.body.profileImage,
    businessName: event.body.businessName,
    businessPhone: event.body.businessPhone,
    businessAddress: event.body.businessAddress,
    businessDescription: event.body.businessDescription,
    gender: event.body.gender,
    accountType: event.body.accountType,
    personalPhoneNumber: event.body.personalPhoneNumber,
    personalEmailAddress: event.body.personalEmailAddress,
    firstName: event.body.firstName,
    lastName: event.body.lastName,
  };
  if (event.body.selectedServices !== undefined) {
    profileDetails['selectedServices'] = event.body.selectedServices;
  }
  await addProfileDetailsHandler(profileDetails);
  callback(null, {'status': 200});
}

export async function updateUserDetails(event, context, callback) {
  let status = {};
  try {
    await updateUserDetailsHandler(event.body);
    status = {'status': 200};
  } catch {
    status = {'status': 500};
  }
  console.log(status);
  callback(null, status);
}

export async function getUserDetails(event, context, callback) {
  const getUserDetailsInput: GetUserDetailsInput = {
    email: event.email,
  };
  const details = await getUserDetailsHandler(getUserDetailsInput);
  let userDetails = {};
  if (details.length > 0) {
    userDetails = details[0];
  }
  console.log(JSON.stringify(userDetails));
  callback(null, userDetails);
}

export async function updateOpeningHours(event, context, callback) {
  const openingHoursInput: OpeningHoursInput = {
    openFromHours: event.body.openFromHours,
    openFromMins: event.body.openFromMins,
    openToHours: event.body.openToHours,
    openToMins: event.body.openToMins,
    email: event.body.email,
  };
  await handleResponse(callback, updateOpeningHoursHandler, openingHoursInput);
}
