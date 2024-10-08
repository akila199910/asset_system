import Ajv from "ajv";
import avjFormats from "ajv-formats";

const jsonRequestBodyValidator = (schema) => {
//   const ajv = new Ajv();
  const ajv = new Ajv({ allErrors: true });

  avjFormats(ajv);

  const validate = ajv.compile(schema);
  return (req, res, next) => {
    const valid = validate(req.body);
    if (valid) {
      console.log("Request body is valid in request body json validator");
      next(); 
    } else {
      console.log("Request body is not valid in request body json validator");
      res.status(400).json({
        message: "Validation failed",
        errors: validate.errors.map((err) => `${err.instancePath} ${err.message}`),
      });
    }
  };
};
export default jsonRequestBodyValidator;
