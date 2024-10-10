import { validateUserEmail } from "../../help/email.help.js";
import { validateUserContact } from "../../help/contact.help.js";

export const validateUserCreate = async (new_user) => {
  const errors = {};

  try {
    await validateUserEmail(new_user.email);
  } catch (emailError) {
    errors.email = "User already exists with this email address.";
  }
  try {
    await validateUserContact(new_user.contact);
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
