<<<<<<< HEAD
import { isValidUsername } from "6pp";
export const usernameValidator = (username) => {
    if (!isValidUsername(username))
        return { isValid: false, errorMessage: "Username is Invalid" };
=======
import { isValidUsername } from "6pp";
export const usernameValidator = (username) => {
    if (!isValidUsername(username))
        return { isValid: false, errorMessage: "Username is Invalid" };
>>>>>>> b8a3feb (first commit)
}