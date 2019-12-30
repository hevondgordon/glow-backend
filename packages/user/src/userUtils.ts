import {GetUserDetailsInput} from './types';
import {getUserDetailsHandler} from './userRepository';
export async function getUserDetails(email) {
  const getUserDetailsInput: GetUserDetailsInput = {
    email: email,
  };
  const details = (await getUserDetailsHandler(getUserDetailsInput))[0];
  return details;
}
