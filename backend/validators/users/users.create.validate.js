import { validateCreateUserContact } from "../../help/contact.help.js";
import { validateCreateUserEmail } from "../../help/email.help.js";


export const validateUserCreate = async (new_user) => {
  const errors = {};

  try {
    await validateCreateUserEmail(new_user.email);
  } catch (emailError) {
    errors.email = "User already exists with this email address.";
  }
  try {
    await validateCreateUserContact(new_user.contact);
  } catch (contactError) {
    errors.contact = "User already exists with this contact number.";
  }

  if (Object.keys(errors).length > 0) {
    throw {
      message: "Validation Error: One or more conflicts detected.",
      errors,
    };
  }

  return true;
};
