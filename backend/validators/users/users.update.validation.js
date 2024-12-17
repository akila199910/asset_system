import userModel from "../../models/user.model.js";

export const validateUserUpdate = async (res, update_user) => {
  const errors = {};

  const validation = {
    firstName: { required: true, min: 3, max: 30, message: "First name" },
    lastName: { required: true, min: 3, max: 30, message: "Last name" },
    email: { required: true, message: "Email" },
    contact: { required: true, message: "Contact number" },
    password: { required: false, min: 8, message: "Password" },
    role: { required: true, message: "Role" },
    status: { required: false, message: "Status" },
  };

  for (const [field, rules] of Object.entries(validation)) {
    const value = update_user[field];

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

  if (update_user.email) {
    const isEmailExist = await userModel.findOne({
      email: update_user.email,
      _id: { $ne: update_user._id },
    });
    if (isEmailExist) {
      errors.email = "User already exists with this email address";
    }
  }

  if (update_user.contact) {
    const isContactExist = await userModel.findOne({
      contact: update_user.contact,
      _id: { $ne: update_user._id },
    });
    if (isContactExist) {
      errors.contact = "User already exists with this contact number";
    }
  }

  if (Object.keys(errors).length > 0) {
    res.status(400).json({ errors });
    return false;
  }

  return true;
};
