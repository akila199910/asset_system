import assetModel from "../../models/asset.model.js";

export const assetHandlingCreateValidation = async (
  res,
  new_asset_handling
) => {
  const errors = {};
  const validation = {
    asset_id: { required: true, message: "Asset field is" },
    status: { required: false, message: "Status" },
    employee_id: { required: true, message: "Employee field is" },
    given_by: { required: true, message: "Given by field is" },
    business_id: { required: true, message: "Business id is" },
    created_by: { required: false, message: "Created by field is" },
    given_date: { required: true, message: "Given date field is" },
  };

  for (const [field, rules] of Object.entries(validation)) {
    const value = new_asset_handling[field];

    if (rules.required && !value) {
      errors[field] = `${rules.message} is required`;
      continue;
    }
  }

  if (Object.keys(errors).length > 0) {
    throw { status: 400, errors, message: "Validation failed" };
  }

  return true;
};
