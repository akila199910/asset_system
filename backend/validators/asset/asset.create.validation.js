import assetModel from "../../models/asset.model.js";

export const assetCreateValidation = async (res, new_asset) => {
  const errors = {};

  // Validation rules
  const validation = {
    name: { required: true, min: 3, max: 30, message: "Asset name" },
    status: { required: false, message: "Status" },
    asset_category_id: { required: true, message: "Asset category" },
    asset_sub_category_id: { required: true, message: "Asset sub-category" },
    business_id: { required: true, message: "Business ID" },
    asset_no: { required: true, message: "Asset number" },
    serial_no: { required: true, message: "Serial number" },
  };
  if (new_asset.serial_no && !/^[A-Z0-9-]+$/.test(new_asset.serial_no)) {
    errors.serial_no =
      "Serial number must only contain uppercase letters, numbers, or dashes";
  }
  if (new_asset.asset_no && !/^[A-Z0-9-]+$/.test(new_asset.asset_no)) {
    errors.asset_no =
      "Asset number must only contain uppercase letters, numbers, or dashes";
  }

  // Field validation
  for (const [field, rules] of Object.entries(validation)) {
    const value = new_asset[field];

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
  if (new_asset.name && new_asset.business_id && new_asset.serial_no) {
    const isNameExist = await assetModel.findOne({
      name: new_asset.name,
      business_id: new_asset.business_id,
      serial_no: new_asset.serial_no,
    });

    if (isNameExist) {
      errors.name =
        "An asset with this name already exists for the given business.";
    }
  }

  // Unique serial number check
  if (new_asset.serial_no) {
    const isSerialNoExist = await assetModel.findOne({
      serial_no: new_asset.serial_no,
    });

    if (isSerialNoExist) {
      errors.serial_no = "An asset with this serial number already exists.";
    }
  }

  if (Object.keys(errors).length > 0) {
    throw { status: 400, errors, message: "Validation failed" };
  }

  return true;
};
