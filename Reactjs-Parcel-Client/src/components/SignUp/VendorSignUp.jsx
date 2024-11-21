import { useState } from "react";
import AccountInfoForm from "./AccountInfoForm";
import PersonalInfoForm from "./PersonalInfoForm";
import AddressInfoForm from "./AddressInfoForm";
import TermsInfoForm from "./TermsInfoForm";

const VendorSignUp = () => {
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
  });
  const [formChoice, setFormChoice] = useState({
    accountForm: true,
    personalForm: false,
    addressForm: false,
    acceptTermsForm: false,
  });

  const [applyClass, setApplyClass] = useState({
    accountForm: false,
    personalForm: false,
    addressForm: false,
    acceptTermsForm: false,
  });

  const [handleNext, setHandleNext] = useState({
    accountForm: true,
    personalForm: false,
    addressForm: false,
    acceptTermsForm: false,
  });

  const handleFormChoice = (formKey) => {
    setFormChoice({
      accountForm: false,
      personalForm: false,
      addressForm: false,
      acceptTermsForm: false,
      [formKey]: true,
    });

    setHandleNext({
      accountForm: false,
      personalForm: false,
      addressForm: false,
      acceptTermsForm: false,
      [formKey]: true,
    });
  };

  const handleApplyClass = (formKey, nextFormKey) => {
    setApplyClass({
      accountForm: false,
      personalForm: false,
      addressForm: false,
      acceptTermsForm: false,
      [formKey]: true,
    });

    setFormChoice({
      accountForm: false,
      personalForm: false,
      addressForm: false,
      acceptTermsForm: false,
      [nextFormKey]: true,
    });

    setHandleNext({
      accountForm: false,
      personalForm: false,
      addressForm: false,
      acceptTermsForm: false,
      [nextFormKey]: true,
    });
  };

  const handleSetUser = (props) => {
    console.log(user, "user");
  };

  return (
    <div className="relative h-screen bg-cover bg-center bg-no-repeat ">
      {/* <BackgroundImage /> */}
      <div class="absolute inset-0 flex justify-center items-center">
        <div className="flex opacity-100 p-6 bg-white rounded-lg shadow-lg w-1/2">
          <ol class="space-y-4 w-72">
            <li>
              <div
                class={
                  applyClass.accountForm
                    ? "w-full p-4 text-green-700 border border-green-300 rounded-lg bg-green-50 dark:border-green-800 dark:text-green-400"
                    : "w-full p-4 text-gray-900 bg-gray-100 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400  hover:cursor-pointer"
                }
                role="alert"
              >
                <div
                  class="flex items-center justify-between"
                  onClick={() => handleFormChoice("accountForm")}
                >
                  <span class="sr-only">Account info</span>
                  <h3 class="font-medium">1. Account info</h3>
                  {applyClass.accountForm ? (
                    <>
                      <svg
                        class="w-4 h-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 16 12"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M1 5.917 5.724 10.5 15 1.5"
                        />
                      </svg>
                    </>
                  ) : (
                    <>
                      {handleNext.accountForm ? (
                        <>
                          <svg
                            class="rtl:rotate-180 w-4 h-4"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 10"
                          >
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M1 5h12m0 0L9 1m4 4L9 9"
                            />
                          </svg>
                        </>
                      ) : (
                        <></>
                      )}
                    </>
                  )}
                </div>
              </div>
            </li>
            <li>
              <div
                class={
                  applyClass.personalForm
                    ? "w-full p-4 text-green-700 border border-green-300 rounded-lg bg-green-50 dark:border-green-800 dark:text-green-400"
                    : "w-full p-4 text-gray-900 bg-gray-100 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400  hover:cursor-pointer"
                }
                role="alert"
              >
                <div
                  class="flex items-center justify-between"
                  onClick={() => handleFormChoice("personalForm")}
                >
                  <span class="sr-only">Personal info</span>
                  <h3 class="font-medium">2. Personal info</h3>
                  {applyClass.personalForm ? (
                    <>
                      <svg
                        class="w-4 h-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 16 12"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M1 5.917 5.724 10.5 15 1.5"
                        />
                      </svg>
                    </>
                  ) : (
                    <>
                      {handleNext.personalForm ? (
                        <>
                          <svg
                            class="rtl:rotate-180 w-4 h-4"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 10"
                          >
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M1 5h12m0 0L9 1m4 4L9 9"
                            />
                          </svg>
                        </>
                      ) : (
                        <></>
                      )}
                    </>
                  )}
                </div>
              </div>
            </li>
            <li>
              <div
                class={
                  applyClass.addressForm
                    ? "w-full p-4 text-green-700 border border-green-300 rounded-lg bg-green-50 dark:border-green-800 dark:text-green-400"
                    : "w-full p-4 text-gray-900 bg-gray-100 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400  hover:cursor-pointer"
                }
                role="alert"
              >
                <div
                  class="flex items-center justify-between"
                  onClick={() => handleFormChoice("addressForm")}
                >
                  <span class="sr-only">Address info</span>
                  <h3 class="font-medium">3. Address info</h3>
                  {applyClass.addressForm ? (
                    <>
                      <svg
                        class="w-4 h-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 16 12"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M1 5.917 5.724 10.5 15 1.5"
                        />
                      </svg>
                    </>
                  ) : (
                    <>
                      {handleNext.addressForm ? (
                        <>
                          <svg
                            class="rtl:rotate-180 w-4 h-4"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 10"
                          >
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M1 5h12m0 0L9 1m4 4L9 9"
                            />
                          </svg>
                        </>
                      ) : (
                        <></>
                      )}
                    </>
                  )}
                </div>
              </div>
            </li>
            <li>
              <div
                class={
                  applyClass.acceptTermsForm
                    ? "w-full p-4 text-green-700 border border-green-300 rounded-lg bg-green-50 dark:border-green-800 dark:text-green-400"
                    : "w-full p-4 text-gray-900 bg-gray-100 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400  hover:cursor-pointer"
                }
                role="alert"
              >
                <div
                  class="flex items-center justify-between"
                  onClick={() => handleFormChoice("acceptTermsForm")}
                >
                  <span class="sr-only">Terms & Conditions</span>
                  <h3 class="font-medium">4. Terms & Conditions</h3>
                  {applyClass.acceptTermsForm ? (
                    <>
                      <svg
                        class="w-4 h-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 16 12"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M1 5.917 5.724 10.5 15 1.5"
                        />
                      </svg>
                    </>
                  ) : (
                    <>
                      {handleNext.acceptTermsForm ? (
                        <>
                          <svg
                            class="rtl:rotate-180 w-4 h-4"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 10"
                          >
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M1 5h12m0 0L9 1m4 4L9 9"
                            />
                          </svg>
                        </>
                      ) : (
                        <></>
                      )}
                    </>
                  )}
                </div>
              </div>
            </li>
          </ol>
          <div className="ml-10 bg-white rounded-lg shadow-lg w-1/2">
            {formChoice?.accountForm ? (
              <>
                <AccountInfoForm
                  onNext={handleApplyClass}
                  user={user}
                  setUser={handleSetUser}
                />
              </>
            ) : (
              <></>
            )}
            {formChoice?.personalForm ? (
              <>
                <PersonalInfoForm onNext={handleApplyClass} />
              </>
            ) : (
              <></>
            )}
            {formChoice?.addressForm ? (
              <>
                <AddressInfoForm onNext={handleApplyClass} />
              </>
            ) : (
              <></>
            )}
            {formChoice?.acceptTermsForm ? (
              <>
                <TermsInfoForm onNext={handleApplyClass} />
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorSignUp;
