import { validateUpdateUserContact } from "../../help/contact.help.js";
import { validateUpdateUserEmail } from "../../help/email.help.js";

export const validateUserUpdate = async (update_user) => {
  const errors = {};

  try {
    await validateUpdateUserEmail(update_user.email, update_user._id);
  } catch (emailError) {
    errors.email = "User already exists with this email address.";
  }
  try {
    await validateUpdateUserContact(update_user.contact, update_user._id);
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
