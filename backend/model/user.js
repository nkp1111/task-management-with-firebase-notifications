const { Schema, models, model } = require("mongoose");
const { hash, compare } = require("bcrypt");


const UserSchema = new Schema({
  name: {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    }
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],  // match email 
  },
  phone: {
    type: String,
    match: [/^\d{10}$/, "Please use a valid phone number"], // match phone number format 10 digits
  },
  password: {
    type: String,
    select: false,  // hide password field 
  },
  role: {
    type: String,
    enum: ["admin", "employee"],
    required: true,
    default: "admin",
  },
  adminId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    validate: {
      validator: function (value) {
        // If role is employee, adminId must be provided
        return this.role === "employee" ? value !== null : true;
      },
      message: "adminId is required for employees"
    },
  }
}, {
  timestamps: true,
})


UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    this.password = await hash(this.password, 10);
    next();
  } catch (err) {
    throw new Error("Error hashing password");
  }
})

UserSchema.methods.comparePassword = async function (password) {
  return await compare(password, this.password);
}

exports.User = model("User", UserSchema);