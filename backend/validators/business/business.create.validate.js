import { validateBusinessEmail } from "../../help/business_email.help.js";
import { validateUserContact } from "../../help/contact.help.js";
import { validateUserEmail } from "../../help/email.help.js";

export const validateBusinessCreate = async (new_business) => {
  const errors = {};

  try {
    await validateUserEmail(new_business.email);
  } catch (emailError) {
    errors.email = "User already exists with this email address.";
  }

  try {
    await validateBusinessEmail(new_business.businessEmail);
  } catch (business_emailError) {
    errors.business_email = "Business already exists with this email address.";
  }

  try {
    await validateUserContact(new_business.contact);
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
