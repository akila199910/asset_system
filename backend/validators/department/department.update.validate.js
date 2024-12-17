import departmentModel from "../../models/department.model.js";

export const departmentUpdateValidate = async (update_department) => {
  const validation = {
    name: { required: true, min: 3, max: 30, message: "Department name" },
    status: { required: false, message: "Status" },
    business_id: { required: true, message: "Business ID" },
  };
  const errors = {};

  for (const [field, rules] of Object.entries(validation)) {
    const value = update_department[field];

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

  if (update_department.name) {
    const isNameExist = await departmentModel.findOne({
      name: update_department.name,
      business_id: update_department.business_id,
      _id: { $ne: update_department._id },
    });

    if (isNameExist) {
      errors.name = `An asset category with the name '${update_department.name}' already exists for this business.`;
    }
  }

  if (Object.keys(errors).length > 0) {
    throw { status: 400, errors, message: "Validation failed" };
  }

  return true;
};
