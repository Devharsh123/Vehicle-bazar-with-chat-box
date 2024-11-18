import { useState } from "react";
import * as Yup from "yup";
import { signupValidationSchema } from "../utils/validationSchema/loginSchema";

const SignUp = () => {
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
    role: "",
  });

  const [errors, setErrors] = useState({});

  // Yup validation schema

  const handleSubmit = async () => {
    try {
      await signupValidationSchema.validate(user, { abortEarly: false });
      setErrors({});
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
        alertFunction();
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
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessages = {};
        err.inner.forEach((error) => {
          errorMessages[error.path] = error.message;
        });
        setErrors(errorMessages);
      }
    }
  };

  function alertFunction() {
    alert("User created succesfully");
  }
  return (
    <div className="mx-32 px-32 justify-center">
      <div class="border-black px-6 py-12 lg:px-8">
        <div class="border-b border-gray-900/10 pb-12">
          <h1 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h1>
          <p class="text-center mt-1 text-sm leading-6 text-gray-600">
            Use a permanent address where you can receive mail
          </p>

          <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div class="sm:col-span-3">
              <label
                for="name"
                class="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <div class="mt-2">
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={user.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                  autocomplete="name"
                  class="p-5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.name && (
                  <div className="text-red-500 text-sm">{errors.name}</div>
                )}
              </div>
            </div>

            <div class="sm:col-span-3">
              <label
                for="age"
                class="block text-sm font-medium leading-6 text-gray-900"
              >
                Age
              </label>
              <div class="mt-2">
                <input
                  type="number"
                  name="age"
                  id="age"
                  value={user.age}
                  onChange={(e) => setUser({ ...user, age: e.target.value })}
                  autocomplete="age"
                  class="p-5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.age && (
                  <div className="text-red-500 text-sm">{errors.age}</div>
                )}
              </div>
            </div>

            <div class="sm:col-span-3">
              <label
                for="dob"
                class="block text-sm font-medium leading-6 text-gray-900"
              >
                DOB
              </label>
              <div class="mt-2">
                <input
                  type="date"
                  name="dob"
                  id="dob"
                  value={user.dob}
                  onChange={(e) => setUser({ ...user, dob: e.target.value })}
                  autocomplete="dob"
                  class="p-5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.dob && (
                  <div className="text-red-500 text-sm">{errors.dob}</div>
                )}
              </div>
            </div>

            <div class="sm:col-span-3">
              <label
                for="contact"
                class="block text-sm font-medium leading-6 text-gray-900"
              >
                Contact
              </label>
              <div class="mt-2">
                <input
                  type="text"
                  name="contact"
                  id="contact"
                  value={user.contact}
                  onChange={(e) =>
                    setUser({ ...user, contact: e.target.value })
                  }
                  autocomplete="family-name"
                  class="p-5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.contact && (
                  <div className="text-red-500 text-sm">{errors.contact}</div>
                )}
              </div>
            </div>

            <div class="sm:col-span-3">
              <label
                for="email"
                class="block text-sm font-medium leading-6 text-gray-900"
              >
                Email
              </label>
              <div class="mt-2">
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  autocomplete="email"
                  class="p-5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.email && (
                  <div className="text-red-500 text-sm">{errors.email}</div>
                )}
              </div>
            </div>

            <div class="sm:col-span-3">
              <label
                for="password"
                class="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div class="mt-2">
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={user.password}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                  autocomplete="password"
                  class="p-5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.password && (
                  <div className="text-red-500 text-sm">{errors.password}</div>
                )}
              </div>
            </div>

            <div class="sm:col-span-2">
              <label
                for="country"
                class="block text-sm font-medium leading-6 text-gray-900"
              >
                Country
              </label>
              <div class="mt-2">
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={user.country}
                  onChange={(e) =>
                    setUser({ ...user, country: e.target.value })
                  }
                  autocomplete="country-name"
                  class="p-5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                />
                {errors.country && (
                  <div className="text-red-500 text-sm">{errors.country}</div>
                )}
              </div>
            </div>

            <div class="sm:col-span-2">
              <label
                for="role"
                class="block text-sm font-medium leading-6 text-gray-900"
              >
                Role
              </label>
              <div class="mt-2">
                <select
                  id="role"
                  name="role"
                  value={user.role}
                  onChange={(e) => setUser({ ...user, role: e.target.value })}
                  autocomplete="role-name"
                  class="p-5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option>ADMIN</option>
                  <option>USER</option>
                  <option>VENDOR</option>
                </select>
                {errors.role && (
                  <div className="text-red-500 text-sm">{errors.role}</div>
                )}
              </div>
            </div>

            <div class="sm:col-span-2">
              <label
                for="gender"
                class="block text-sm font-medium leading-6 text-gray-900"
              >
                Gender
              </label>
              <div class="mt-2">
                <select
                  id="gender"
                  name="gender"
                  value={user.gender}
                  onChange={(e) => setUser({ ...user, gender: e.target.value })}
                  autocomplete="role-name"
                  class="p-5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option>MALE</option>
                  <option>FEMALE</option>
                </select>
                {errors.gender && (
                  <div className="text-red-500 text-sm">{errors.gender}</div>
                )}
              </div>
            </div>

            <div class="col-span-full">
              <label
                for="street-address"
                class="block text-sm font-medium leading-6 text-gray-900"
              >
                Street address
              </label>
              <div class="mt-2">
                <input
                  type="text"
                  name="street-address"
                  id="street-address"
                  value={user.address}
                  onChange={(e) =>
                    setUser({ ...user, address: e.target.value })
                  }
                  autocomplete="street-address"
                  class="p-5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.address && (
                  <div className="text-red-500 text-sm">{errors.address}</div>
                )}
              </div>
            </div>

            <div class="sm:col-span-2 sm:col-start-1">
              <label
                for="city"
                class="block text-sm font-medium leading-6 text-gray-900"
              >
                City
              </label>
              <div class="mt-2">
                <input
                  type="text"
                  name="city"
                  id="city"
                  value={user.city}
                  onChange={(e) => setUser({ ...user, city: e.target.value })}
                  autocomplete="address-level2"
                  class="p-5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.city && (
                  <div className="text-red-500 text-sm">{errors.city}</div>
                )}
              </div>
            </div>

            <div class="sm:col-span-2">
              <label
                for="state"
                class="block text-sm font-medium leading-6 text-gray-900"
              >
                State / Province
              </label>
              <div class="mt-2">
                <input
                  type="text"
                  name="state"
                  id="state"
                  value={user.state}
                  onChange={(e) => setUser({ ...user, state: e.target.value })}
                  autocomplete="address-level1"
                  class="p-5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.state && (
                  <div className="text-red-500 text-sm">{errors.state}</div>
                )}
              </div>
            </div>

            <div class="sm:col-span-2">
              <label
                for="zipCode"
                class="block text-sm font-medium leading-6 text-gray-900"
              >
                ZIP / Postal code
              </label>
              <div class="mt-2">
                <input
                  type="number"
                  name="zipCode"
                  id="zipCode"
                  value={user.zipCode}
                  onChange={(e) =>
                    setUser({ ...user, zipCode: e.target.value })
                  }
                  autocomplete="zipCode"
                  class="p-5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.zipCode && (
                  <div className="text-red-500 text-sm">{errors.zipCode}</div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div class="mt-6 flex justify-center gap-x-6">
          <button
            type="button"
            class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
