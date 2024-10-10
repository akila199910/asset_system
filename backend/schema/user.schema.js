const userSchema = {
  type: "object",
  properties: {
    firstName: {
      type: "string",
      minLength: 3,
      maxLength: 30,
      pattern: "^[a-zA-Z]+$", //only letters
    },
    lastName: {
      type: "string",
      minLength: 3,
      maxLength: 30,
      pattern: "^[a-zA-Z]+$", //only letters
    },
    contact: {
      type: "string",
      pattern: "^[0-9]{10}$",
      minLength: 10,
      maxLength: 10,
    },
    email: {
      type: "string",
      minLength: 10,
      maxLength: 30,
      format: "email",
    },
    role: {
      type: "string",
      enum: ["super_admin", "admin", "business_user", "user", "guest"],
    },
    status: {
      type: "boolean",
      enum: [true, false],
      default: true,
    },
    profilePic: {
      type: "string",
    },
  },
  required: ["firstName", "lastName", "contact", "email", "role"],
};
export default userSchema;
