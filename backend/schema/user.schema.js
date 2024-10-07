const userSchema = {
  type: "object",
  properties: {
    firstName: {
      type: "string",
      required: true,
      minLength: 3,
      maxLength: 30,
      pattern: "^[a-zA-Z]+$", //only letters
    },
    lastName: {
      type: "string",
      required: true,
      minLength: 3,
      maxLength: 30,
      pattern: "^[a-zA-Z]+$", //only letters
    },
    contact: {
      type: "string",
      pattern: "^[0-9]{10}$",
      required: true,
      length: 10,
    },
    email: {
      type: "string",
      required: true,
      minLength: 3,
      maxLength: 30,
      format: "email",
    },
    role: {
      type: "string",
      required: true,
      enum: ["super_admin", "admin", "business_user", "user", "guest"],
    },
    profilePic: {
      type: "string",
      required: false,
    },
  },
  required: ["firstName", "lastName", "contact", "email", "role"],
};
export default userSchema;
