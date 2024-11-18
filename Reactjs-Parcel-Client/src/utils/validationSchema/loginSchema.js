import * as Yup from "yup";

const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const signupValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  age: Yup.number().required("Age is required"),
  dob: Yup.date().required("DOB is required"),
  contact: Yup.string().required("Contact is required"),
  address: Yup.string().required("Address is required"),
  country: Yup.string().required("Country is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  zipCode: Yup.number().required("Zip Code is required"),
  gender: Yup.string().required("Gender is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one symbol"
    )
    .required("Password is required"),
  role: Yup.string().required("Role is required"),
});

const createProductValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  brand: Yup.string().required("Brand is required"),
  yearOfReg: Yup.string().required("Year of Registration is required"),
  registrationDescr: Yup.string().required(
    "Registration description is required"
  ),
  transactionType: Yup.string().required("Transaction type is required"),
  kmDriven: Yup.string().required("Km driven is required"),
  availableLocation: Yup.string().required("Available location is required"),
  pricePerDay: Yup.number().required("Price Per Day is required"),
  totalPrice: Yup.number().required("Total Price is required"),
});

export {
  loginValidationSchema,
  signupValidationSchema,
  createProductValidationSchema,
};
