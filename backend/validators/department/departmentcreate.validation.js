import departmentModel from "../../models/department.model.js";

export const departmentCreateValidation = async (
  res,
  new_registered_department
) => {
  const errors = {};
  const validation = {
    name: { required: true, min: 3, max: 30, message: "Department name" },
    status: { required: false, message: "Status" },
    business_id: { required: true, message: "Business ID" },
  };

  for (const [field, rules] of Object.entries(validation)) {
    const value = new_registered_department[field];

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

  if (new_registered_department.name && new_registered_department.business_id) {
    const isNameExist = await departmentModel.findOne({
      name: new_registered_department.name,
      business_id: new_registered_department.business_id,
    });
    if (isNameExist) {
      errors.name =
        "Department already exists with this name in this business.";
    }
  }

  if (Object.keys(errors).length > 0) {
    throw { status: 400, errors, message: "Validation failed" };
  }

  return true;
};
