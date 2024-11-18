import { useLoadUsers } from "../utils/useLoadUsers";
import { useState } from "react";
import ImageUpload from "./ImageUpload";
import * as Yup from "yup";
import { createProductValidationSchema } from "../utils/validationSchema/loginSchema";
const Create = () => {
  const { token } = useLoadUsers();

  const [errors, setErrors] = useState({});
  const [product, setProduct] = useState({
    name: "",
    brand: "",
    yearOfReg: "",
    registrationDescr: "",
    transactionType: "",
    kmDriven: "",
    availableLocation: "",
    pricePerDay: "",
    totalPrice: "",
  });
  const [uploadedImage, setUploadedImage] = useState("");

  const handleSubmit = async () => {
    try {
      await createProductValidationSchema.validate(product, {
        abortEarly: false,
      });
      setErrors({});

      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("image", uploadedImage);
      formData.append("brand", product.brand);
      formData.append("yearOfReg", product.yearOfReg);
      formData.append("registrationDescr", product.registrationDescr);
      formData.append("transactionType", product.transactionType);
      formData.append("kmDriven", product.kmDriven);
      formData.append("availableLocation", product.availableLocation);
      formData.append("pricePerDay", product.pricePerDay);
      formData.append("totalPrice", product.totalPrice);

      const res = await fetch("http://localhost:3000/products", {
        method: "POST",
        body: formData,
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const json = await res.json();

      if (json) {
        alertFunction();
        setProduct({
          name: "",
          brand: "",
          yearOfReg: "",
          registrationDescr: "",
          transactionType: "",
          kmDriven: "",
          availableLocation: "",
          pricePerDay: "",
          totalPrice: "",
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
    alert("Product created succesfully");
  }

  const handleImageUrlChange = (url) => {
    setUploadedImage(url); // Store the uploaded image URL
  };

  return (
    <div className="mx-32 px-32 justify-center">
      <div class="border-black px-6 py-12 lg:px-8">
        <div class="border-b border-gray-900/10 pb-12">
          <h1 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create Product
          </h1>
          <div class="mt-5 flex justify-center">
            <div class=" text-lg font-medium leading-6 text-gray-900">
              Upload Image
            </div>
          </div>
          <div class="flex justify-center">
            <ImageUpload onImageUpload={handleImageUrlChange} />
          </div>
          <div class="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
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
                  value={product.name}
                  onChange={(e) =>
                    setProduct({ ...product, name: e.target.value })
                  }
                  autocomplete="given-name"
                  class="p-5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.name && (
                  <div className="text-red-500 text-sm">{errors.name}</div>
                )}
              </div>
            </div>

            <div class="sm:col-span-3">
              <label
                for="brand"
                class="block text-sm font-medium leading-6 text-gray-900"
              >
                Brand
              </label>
              <div class="mt-2">
                <input
                  type="text"
                  name="brand"
                  id="brand"
                  value={product.brand}
                  onChange={(e) =>
                    setProduct({ ...product, brand: e.target.value })
                  }
                  autocomplete="family-name"
                  class="p-5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.brand && (
                  <div className="text-red-500 text-sm">{errors.brand}</div>
                )}
              </div>
            </div>

            <div class="sm:col-span-3">
              <label
                for="year of registration"
                class="block text-sm font-medium leading-6 text-gray-900"
              >
                Year Of Registration
              </label>
              <div class="mt-2">
                <input
                  type="date"
                  name="year of registration"
                  id="year of registration"
                  value={product.yearOfReg}
                  onChange={(e) =>
                    setProduct({ ...product, yearOfReg: e.target.value })
                  }
                  autocomplete="given-name"
                  class="p-5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.yearOfReg && (
                  <div className="text-red-500 text-sm">{errors.yearOfReg}</div>
                )}
              </div>
            </div>

            <div class="sm:col-span-3">
              <label
                for="total price"
                class="block text-sm font-medium leading-6 text-gray-900"
              >
                Total Price
              </label>
              <div class="mt-2">
                <input
                  type="text"
                  name="total price"
                  id="total price"
                  value={product.totalPrice}
                  onChange={(e) =>
                    setProduct({ ...product, totalPrice: e.target.value })
                  }
                  autocomplete="family-name"
                  class="p-5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.totalPrice && (
                  <div className="text-red-500 text-sm">
                    {errors.totalPrice}
                  </div>
                )}
              </div>
            </div>

            <div class="sm:col-span-3">
              <label
                for="Km Driven"
                class="block text-sm font-medium leading-6 text-gray-900"
              >
                Km Driven
              </label>
              <div class="mt-2">
                <input
                  type="text"
                  name="Km Driven"
                  id="Km Driven"
                  value={product.kmDriven}
                  onChange={(e) =>
                    setProduct({ ...product, kmDriven: e.target.value })
                  }
                  autocomplete="family-name"
                  class="p-5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.kmDriven && (
                  <div className="text-red-500 text-sm">{errors.kmDriven}</div>
                )}
              </div>
            </div>

            <div class="sm:col-span-3">
              <label
                for="Available location"
                class="block text-sm font-medium leading-6 text-gray-900"
              >
                Available Location
              </label>
              <div class="mt-2">
                <input
                  type="text"
                  name="Available location"
                  id="Available location"
                  value={product.availableLocation}
                  onChange={(e) =>
                    setProduct({
                      ...product,
                      availableLocation: e.target.value,
                    })
                  }
                  autocomplete="family-name"
                  class="p-5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.availableLocation && (
                  <div className="text-red-500 text-sm">
                    {errors.availableLocation}
                  </div>
                )}
              </div>
            </div>

            <div class="sm:col-span-3">
              <label
                for="Price per day"
                class="block text-sm font-medium leading-6 text-gray-900"
              >
                Price Per Day
              </label>
              <div class="mt-2">
                <input
                  type="text"
                  name="Price per day"
                  id="Price per day"
                  value={product.pricePerDay}
                  onChange={(e) =>
                    setProduct({ ...product, pricePerDay: e.target.value })
                  }
                  autocomplete="family-name"
                  class="p-5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.pricePerDay && (
                  <div className="text-red-500 text-sm">
                    {errors.pricePerDay}
                  </div>
                )}
              </div>
            </div>

            <div class="sm:col-span-3">
              <label
                for="transaction-type"
                class="block text-sm font-medium leading-6 text-gray-900"
              >
                TransactionType
              </label>
              <div class="mt-2">
                <select
                  id="transaction-type"
                  name="transaction-type"
                  value={product.transactionType}
                  onChange={(e) =>
                    setProduct({ ...product, transactionType: e.target.value })
                  }
                  autocomplete="transaction-type"
                  class="p-5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option>TOBUY</option>
                  <option>TORENT</option>
                </select>
              </div>
            </div>

            <div class="col-span-full">
              <label
                for="Registration description"
                class="block text-sm font-medium leading-6 text-gray-900"
              >
                Registration Description
              </label>
              <div class="mt-2">
                <input
                  type="text"
                  name="Registration description"
                  id="Registration description"
                  value={product.registrationDescr}
                  onChange={(e) =>
                    setProduct({
                      ...product,
                      registrationDescr: e.target.value,
                    })
                  }
                  autocomplete="Registration description"
                  class="p-5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.registrationDescr && (
                  <div className="text-red-500 text-sm">
                    {errors.registrationDescr}
                  </div>
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

export default Create;
