import {UpdateProfileDetailsInput, GetUserDetailsInput} from './types';
import {
  updateProfileDetailsHandler, getUserDetailsHandler,
} from './userRepository';
export async function updateUserDetails(event, context, callback) {
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
  await updateProfileDetailsHandler(profileDetails);
  callback(null, {'status': 200});
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
