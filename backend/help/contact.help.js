import userModel from "../models/user.model.js";

export const checkUserContact = async (new_contact) => {
  const isContactExist = await userModel.findOne({ contact: new_contact });
  return !!isContactExist;
};

export const validateUserContact = async (new_contact) => {
  const isContactExist = await checkUserContact(new_contact);
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
