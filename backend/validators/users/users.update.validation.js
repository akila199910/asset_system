import { validateUpdateUserContact } from "../../help/contact.help.js";
import { validateUpdateUserEmail } from "../../help/email.help.js";

export const validateUserUpdate = async (id,update_user) => {
  const errors = {};

  try {
    await validateUpdateUserEmail(id,update_user.email);
  } catch (emailError) {
    errors.email = "User already exists with this email address.....";
  }

  try {
    await validateUpdateUserContact(id,update_user.contact);
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
