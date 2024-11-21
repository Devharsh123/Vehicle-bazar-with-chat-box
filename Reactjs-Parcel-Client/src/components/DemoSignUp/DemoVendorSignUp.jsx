import { useState } from "react";

import AddressInfoForm from "./AddressInfoForm";
import TermsInfoForm from "./TermsInfoForm";
import DemoAccountInfoForm from "./DemoAccountInfoForm";
import DemoPersonalInfoForm from "./DemoPersonalInfoForm";
import { useLocation } from "react-router-dom";
import SuccessMessage from "../ToastMessage/SuccessMessage";
import BackgroundImage from "../BackgroundImage";

const DemoVendorSignUp = () => {
  const location = useLocation();
  const { role } = location.state || {};

  const [user, setUser] = useState({
    name: "",
    age: null,
    dob: "",
    contact: "",
    address: "",
    country: "",
    city: "",
    state: "",
    zipCode: null,
    gender: "",
    email: "",
    password: "",
    role,
  });
  const [success, setSuccess] = useState(false);
  const [activeForm, setActiveForm] = useState("accountForm");

  const handleNext = (currentForm, nextForm, formData) => {
    setUser((prevUser) => ({ ...prevUser, ...formData }));
    setActiveForm(nextForm);
  };

  const handleSubmit = async () => {
    console.log("Final User Data:", user);
    // Add API call logic here

    const jsonBody = JSON.stringify({
      name: user.name,
      age: Number(user.age),
      dob: new Date(user.dob).toISOString(),
      contact: user.contact,
      address: user.address,
      country: user.country,
      city: user.city,
      state: user.state,
      zipCode: Number(user.zipCode),
      gender: user.gender,
      email: user.email,
      password: user.password,
      role: user.role,
    });
    const res = await fetch("http://localhost:3000/users", {
      method: "POST",
      body: jsonBody,
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await res.json();
    if (json && json.message === "User created succesfully") {
      setSuccess(true);
      setUser({
        name: "",
        age: null,
        dob: "",
        contact: "",
        address: "",
        country: "",
        city: "",
        state: "",
        zipCode: null,
        gender: "",
        email: "",
        password: "",
        role: "",
      });
    }
  };

  console.log(user, "user");
  return (
    <div className="relative h-screen bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="flex p-6 bg-white rounded-lg shadow-lg w-1/2">
          <div className="w-1/3 border-r border-gray-300 pr-4">
            <ol className="space-y-4">
              <li
                className={
                  activeForm === "accountForm"
                    ? "font-bold w-full p-4 text-green-700 border border-green-300 rounded-lg bg-green-50 dark:border-green-800 dark:text-green-400"
                    : "w-full p-4 text-gray-900 bg-gray-100 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                }
              >
                1. Account Info
              </li>
              <li
                className={
                  activeForm === "personalForm"
                    ? "font-bold w-full p-4 text-green-700 border border-green-300 rounded-lg bg-green-50 dark:border-green-800 dark:text-green-400"
                    : "w-full p-4 text-gray-900 bg-gray-100 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                }
              >
                2. Personal Info
              </li>
              <li
                className={
                  activeForm === "addressForm"
                    ? "font-bold w-full p-4 text-green-700 border border-green-300 rounded-lg bg-green-50 dark:border-green-800 dark:text-green-400"
                    : "w-full p-4 text-gray-900 bg-gray-100 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                }
              >
                3. Address Info
              </li>
              <li
                className={
                  activeForm === "termsForm"
                    ? "font-bold w-full p-4 text-green-700 border border-green-300 rounded-lg bg-green-50 dark:border-green-800 dark:text-green-400"
                    : "w-full p-4 text-gray-900 bg-gray-100 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                }
              >
                4. Terms & Conditions
              </li>
            </ol>
          </div>
          <div className="w-2/3 pl-4">
            {activeForm === "accountForm" && (
              <DemoAccountInfoForm onNext={handleNext} user={user} />
            )}
            {activeForm === "personalForm" && (
              <DemoPersonalInfoForm onNext={handleNext} user={user} />
            )}
            {activeForm === "addressForm" && (
              <AddressInfoForm onNext={handleNext} user={user} />
            )}
            {activeForm === "termsForm" && (
              <TermsInfoForm onSubmit={handleSubmit} />
            )}
          </div>
        </div>
      </div>
      {success ? (
        <>
          <div
            class="flex justify-center items-center p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
            role="alert"
          >
            <span class="font-medium">{role} SignedUp Successfully!</span>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default DemoVendorSignUp;
