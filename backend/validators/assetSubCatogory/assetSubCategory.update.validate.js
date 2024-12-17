import assetsubcategoriesModel from "../../models/assetsubcategories.model.js";

export const assetSubCategoryUpdateValidate = async (update_assetSubCategory) => {
  const errors = {};
  const validation = {
    name: { required: true, min: 3, max: 30, message: "Asset sub category name" },
    status: { required: false, message: "Status" },
    business_id: { required: true, message: "Business ID" },
  };

  for (const [field, rules] of Object.entries(validation)) {
    const value = update_assetSubCategory[field];

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

  if (update_assetSubCategory.name) {
    const isNameExist = await assetsubcategoriesModel.findOne({
      name: update_assetSubCategory.name,
      business_id: update_assetSubCategory.business_id,
      _id: { $ne: update_assetSubCategory._id },
    });

    if (isNameExist) {
      errors.name = `An asset category with the name '${update_assetSubCategory.name}' already exists for this business.`;
    }
  }

  if (Object.keys(errors).length > 0) {
    throw { status: 400, errors, message: "Validation failed" };
  }

  return true;
};
