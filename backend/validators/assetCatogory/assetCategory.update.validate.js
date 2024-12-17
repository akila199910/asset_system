import assetcategoriesModel from "../../models/assetcategories.model.js";

export const assetCategoryUpdateValidate = async (update_assetCategory) => {
  const errors = {};
  const validation = {
    name: { required: true, min: 3, max: 30, message: "Asset category name" },
    status: { required: false, message: "Status" },
    business_id: { required: true, message: "Business ID" },
  };

  for (const [field, rules] of Object.entries(validation)) {
    const value = update_assetCategory[field];

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

  if (update_assetCategory.name) {
    const isNameExist = await assetcategoriesModel.findOne({
      name: update_assetCategory.name,
      business_id: update_assetCategory.business_id,
      _id: { $ne: update_assetCategory._id },
    });

    if (isNameExist) {
      errors.name = `An asset category with the name '${update_assetCategory.name}' already exists for this business.`;
    }
  }

  if (Object.keys(errors).length > 0) {
    throw { status: 400, errors, message: "Validation failed" };
  }

  return true;
};
