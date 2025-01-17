import userModel from "../models/user.model.js";

export const checkCreateUserContact = async (new_contact) => {
  const isContactExist = await userModel.findOne({ contact: new_contact });
  return !!isContactExist;
};

export const validateCreateUserContact = async (new_contact) => {
  const isContactExist = await checkCreateUserContact(new_contact);
  if (isContactExist) {
    let errorDetails = {
      message: "Validation Error: Contact number conflict detected.",
      errors: {},
    };
    errorDetails.errors.contact =
      "User already exists with this contact number.";
    throw errorDetails;
  }
};

export const checkUpdateUserContact = async (user_id, new_contact) => {
  const isContactExist = await userModel.findOne({
    contact: new_contact,
    _id: { $ne: user_id },
  });
  return !!isContactExist;
};

export const validateUpdateUserContact = async (user_id, new_contact) => {
  const isContactExist = await checkUpdateUserContact(user_id, new_contact);
  if (isContactExist) {
    let errorDetails = {
      message: "Validation Error: Contact number conflict detected.",
      errors: {},
    };
    errorDetails.errors.contact =
      "User already exists with this contact number.";
    throw errorDetails;
  }
};
