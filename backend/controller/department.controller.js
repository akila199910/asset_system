import departmentModel from "../models/department.model.js";
import { departmentUpdateValidate } from "../validators/department/department.update.validate.js";
import { departmentCreateValidation } from "../validators/department/departmentcreate.validation.js";

class DepartmentController {
  async getAllDepartment(req, res) {
    const business_id = req.session.business_id;
    try {
      const department = await departmentModel.find({
        business_id: business_id,
      });
      res.status(200).json({ department: department, status: true });
    } catch (error) {
      res.status(500).json({
        message: "An error occurred while fetching department",
        error: error.message,
      });
    }
  }

  async createDepartment(req, res) {
    const { name, status } = req.body;
    const business_id = req.session.business_id;
    const new_registered_department = { name, status, business_id };

    try {
      const isValid = await departmentCreateValidation(
        res,
        new_registered_department
      );

      if (!isValid) return;

      const department = new departmentModel({
        name: new_registered_department.name,
        status: new_registered_department.status,
        business_id: business_id,
      });
      department.save();

      res.status(201).json({
        message: "Department created successfully.",
        department: department,
        status: true,
      });
    } catch (error) {
      const status = error.status || 500;
      res.status(status).json({
        message: error.message || "Internal Server Error",
        errors: error.errors || {},
        status: false,
      });
    }
  }
  async getDepartmentById(req, res) {
    try {
      const department = await departmentModel.findById(req.params.id);
      if (!department) {
        return res
          .status(404)
          .json({ error: "Department not found", status: false });
      }

      res.status(200).json({ department: department, status: true });
    } catch (error) {
      res.status(400).json({ error: error.message, status: false });
    }
  }

  async updateDepartment(req, res) {
    const update_department = req.body;

    try {
      await departmentUpdateValidate(update_department);
      const updated_department = await departmentModel.findByIdAndUpdate(
        update_department._id,
        {
          name: update_department.name,
          status: update_department.status,
          business_id: update_department.business_id,
        },
        { new: true }
      );
      if (!updated_department) {
        return res
          .status(404)
          .json({ error: "Department not found", status: false });
      }
      res.status(200).json({
        updated_department: updated_department,
        status: true,
        message: "Department updated successfully",
      });
    } catch (error) {
      const status = error.status || 500;
      res.status(status).json({
        message: error.message || "Internal Server Error",
        errors: error.errors || {},
        status: false,
      });
    }
  }
  // async select_business(req, res) {
  //   const { business_id } = req.body;
  //   req.session.business_id = business_id;
  //   await req.session.save();
  //   console.log(req.session);
  //   res.status(200).json({ message: "Business selected", business_id });
  // }
  // async deleteBusiness(req, res) {
  //   try {
  //     const business = await businessModel.findByIdAndDelete(req.params.id);
  //     const owner = await userModel.findByIdAndDelete(business.ownerId);
  //     res.status(200).json({ business: business, user: owner, status: true });
  //   } catch (error) {
  //     res.status(400).json({ error: error.message });
  //   }
  // }
}

const departmentController = new DepartmentController();
export default departmentController;
