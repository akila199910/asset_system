import businessModel from "../../models/business.model.js";
import userModel from "../../models/user.model.js";

export const validateBusinessUpdate = async (res, update_business) => {
  const errors = {};

  const validation = {
    _id: { required: true, message: "Business id" },
    businessName: { required: true, min: 3, max: 30, message: "Business name" },
    businessEmail: { required: true, message: "Business email" },
    address: { required: true, min: 5, max: 30, message: "Address" },
    city: { required: true, min: 5, max: 30, message: "City" },
    business_status: { required: false, message: "Business status" },
    ownerId: { required: true, message: "Owner id" },
    firstName: { required: true, min: 3, max: 30, message: "First name" },
    lastName: { required: true, min: 3, max: 30, message: "Last name" },
    email: { required: true, message: "Email" },
    contact: { required: true, message: "Contact number" },
    password: { required: false, min: 8, message: "Password" },
    role: { required: true, message: "Role" },
    owner_status: { required: false, message: "Owner status" },
  };

  for (const [field, rules] of Object.entries(validation)) {
    const value = update_business[field];

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

  if (update_business.email) {
    const isEmailExist = await userModel.findOne({
      email: update_business.email,
      _id: { $ne: update_business.ownerId },
    });

    if (isEmailExist) {
      errors.email = "User already exists with this email address";
    }
  }

  if (update_business.contact) {
    const isContactExist = await userModel.findOne({
      contact: update_business.contact,
      _id: { $ne: update_business.ownerId },
    });
    if (isContactExist) {
      errors.contact = "User already exists with this contact number";
    }
  }
  if (update_business.businessEmail) {
    const isBusinessEmailExist = await businessModel.findOne({
      businessEmail: update_business.businessEmail,
      _id: { $ne: update_business._id },
    });
    if (isBusinessEmailExist) {
      errors.businessEmail = "Business already exists with this email address";
    }
  }
  if (update_business.businessName) {
    const isBusinessNameExist = await businessModel.findOne({
      businessName: update_business.businessName,
      _id: { $ne: update_business._id },
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
