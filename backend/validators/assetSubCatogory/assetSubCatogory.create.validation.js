import assetcategoriesModel from "../../models/assetcategories.model.js";

export const assetCategoryCreateValidation = async (res, new_assetCategory) => {
  const errors = {};
  const validation = {
    name: { required: true, min: 3, max: 30, message: "Asset category name" },
    status: { required: false, message: "Status" },
    business_id: { required: true, message: "Business ID" },
  };
  
  for (const [field, rules] of Object.entries(validation)) {
    const value = new_assetCategory[field];

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

  // Unique name check within business_id
  if (new_assetCategory.name && new_assetCategory.business_id) {
    const isNameExist = await assetcategoriesModel.findOne({
      name: new_assetCategory.name,
      business_id: new_assetCategory.business_id,
    });
    if (isNameExist) {
      errors.name =
        "Asset category already exists with this name in this business.";
    }
  }

  if (Object.keys(errors).length > 0) {
    throw { status: 400, errors, message: "Validation failed" };
  }

  return true;
};
