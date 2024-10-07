import Ajv from "ajv";
import avjFormats from "ajv-formats";

jsonRequestBodyValidator = (schema) => {
  const ajv = new Ajv();
  avjFormats(ajv);

  const validate = ajv.compile(schema);
  return (req, res, next) => {
    if (validate(req.body)) {
      console.log("Request body is valid in request body json validator");

      next();
    } else {
      console.log("Request body is not valid in request body json validator");

      res.status(400).send(validate.errors);
    }
  };
};
export default jsonRequestBodyValidator;
