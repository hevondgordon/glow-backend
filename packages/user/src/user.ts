import {UpdateProfileDetailsInput, GetProfileDetailsInput} from './types';
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
  await updateProfileDetailsHandler(profileDetails);
  callback(null, {'status': 200});
}

export async function getUserDetails(event, context, callback) {
  const getUserDetailsInput: GetProfileDetailsInput = {
    email: event.email,
  };
  const details = await getUserDetailsHandler(getUserDetailsInput);
  callback(null, details);
}
