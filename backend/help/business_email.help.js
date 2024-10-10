import businessModel from "../models/business.model.js";

export const checkBusinessEmail = async (new_business_email) => {
  const isBusinessEmailExist = await businessModel.findOne({ businessEmail: new_business_email });
  return !!isBusinessEmailExist;
};

export const validateBusinessEmail = async (new_business_email) => {
  const isBusinessEmailExist = await checkBusinessEmail(new_business_email);
  if (isBusinessEmailExist) {
    let errorDetails = {
      message: "Validation Error: Business email address conflict detected.",
      errors: {},
    };
    errorDetails.errors.business_email =
      "Business already exists with this email address.";
    throw errorDetails;
  }
  
};
