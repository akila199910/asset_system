const businessSchema = {
  type: "object",
  properties: {
    firstName: {
      type: "string",
      minLength: 3,
      maxLength: 30,
      // pattern: "^[a-zA-Z]+$", 
    },
    lastName: {
      type: "string",
      minLength: 3,
      maxLength: 30,
      // pattern: "^[a-zA-Z]+$", 
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
    owner_status: {
      type: "boolean",
      enum: [true, false],
      default: true,
    },
    profilePic: {
      type: "string",
    },
    businessName: {
      type: "string",
      minLength: 3,
      maxLength: 30,
      // pattern: "^[a-zA-Z]+$", 
    },
    businessEmail: {
      type: "string",
      minLength: 10,
      maxLength: 30,
      format: "email",
    },
    address: {
      type: "string",
      minLength: 5,
      maxLength: 30,
    },
    city: {
      type: "string",
      minLength: 5,
      maxLength: 30,
      // pattern: "^[a-zA-Z]+$", 
    },
    status: {
      type: "boolean",
      enum: [true, false],
      default: true,
    },
    
    businessLogo: {
      type: "string",
    },
  },
  required: [
    "businessName",
    "businessEmail",
    "address",
    "city",
    "status",
    "owner_status",
    "firstName",
    "lastName",
    "contact",
    "email",
    "role",
  ],
  additionalProperties: false,
};

export default businessSchema;
