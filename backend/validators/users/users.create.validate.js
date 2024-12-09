import userModel from "../../models/user.model.js";
export const validateUserCreate = async (res, new_user) => {
  const errors = {};

  const validation = {
    firstName: { required: true, min: 3, max: 30, message: "First name" },
    lastName: { required: true, min: 3, max: 30, message: "Last name" },
    email: { required: true, message: "Email" },
    contact: { required: true, message: "Contact number" },
    password: { required: false, min: 8, message: "Password" },
    role: { required: true, message: "Role" },
    status: { required: true, message: "Status" },
  };

  for (const [field, rules] of Object.entries(validation)) {
    const value = new_user[field];

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

  if (new_user.email) {
    const isEmailExist = await userModel.findOne({ email: new_user.email });
    if (isEmailExist) {
      errors.email = "User already exists with this email address";
    }
  }

  if (new_user.contact) {
    const isContactExist = await userModel.findOne({
      contact: new_user.contact,
    });
    if (isContactExist) {
      errors.contact = "User already exists with this contact number";
    }
  }

  if (Object.keys(errors).length > 0) {
    throw { status: 400, errors, message: "Validation failed" };
  }

  return true;
};
