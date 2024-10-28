import businessModel from "../../models/business.model.js";
import userModel from "../../models/user.model.js";

export const validateBusinessCreate = async (res, new_business) => {
  const errors = {};

  const validation = {
    businessName: { required: true, min: 3, max: 30, message: "Business name" },
    businessEmail: { required: true, message: "Business email" },
    address: { required: true, min: 5, max: 30, message: "Address" },
    city: { required: true, min: 5, max: 30, message: "City" },
    status: { required: true, message: "Status" },
    firstName: { required: true, min: 3, max: 30, message: "First name" },
    lastName: { required: true, min: 3, max: 30, message: "Last name" },
    email: { required: true, message: "Email" },
    contact: { required: true, message: "Contact number" },
    password: { required: false, min: 8, message: "Password" },
    role: { required: true, message: "Role" },
    status: { required: true, message: "Status" },
  };

  for (const [field, rules] of Object.entries(validation)) {
    const value = new_business[field];

    if (rules.required && !value) {
      errors[field] = `${rules.message} is required`;
      continue;
    }

    if (value && rules.min && value.length < rules.min) {
      errors[
        field
      ] = `${rules.message} must be at least ${rules.min} characters`;
    }
    if (value && rules.max && value.length > rules.max) {
      errors[
        field
      ] = `${rules.message} must be no more than ${rules.max} characters`;
    }
  }

  if (new_business.email) {
    const isEmailExist = await userModel.findOne({ email: new_business.email });
    if (isEmailExist) {
      errors.email = "User already exists with this email address";
    }
  }

  if (new_business.contact) {
    const isContactExist = await userModel.findOne({
      contact: new_business.contact,
    });
    if (isContactExist) {
      errors.contact = "User already exists with this contact number";
    }
  }
  if (new_business.businessEmail) {
    const isBusinessEmailExist = await businessModel.findOne({
      businessEmail: new_business.businessEmail,
    });
    if (isBusinessEmailExist) {
      errors.businessEmail = "Business already exists with this email address";
    }
  }
  if (new_business.businessName) {
    const isBusinessNameExist = await businessModel.findOne({
      businessName: new_business.businessName,
    });
    if (isBusinessNameExist) {
      errors.businessName = "Business name already taken";
    }
  }

  if (Object.keys(errors).length > 0) {
    res.status(400).json({ errors, status: false });
    return false;
  }

  return true;
};
