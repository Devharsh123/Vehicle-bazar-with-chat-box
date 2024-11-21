const AddressInfoForm = ({ onNext }) => {
  const handleSubmitNext = () => {
    onNext("addressForm", "acceptTermsForm");
  };
  return (
    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
          Address
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="address"
          type="text"
          placeholder="7/1, vetican city"
        />
      </div>
      <div className="flex mb-4 gap-4">
        <div class="flex-1">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="age">
            Country
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="country"
            type="text"
            placeholder=""
          />
        </div>
        <div class="flex-1">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="age">
            City
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="city"
            type="text"
            placeholder=""
          />
        </div>
      </div>

      <div className="flex mb-6 gap-4">
        <div class="flex-1">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="age">
            Contact
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="contact"
            type="text"
            placeholder=""
          />
        </div>
        <div class="flex-1">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="age">
            Zipcode
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="zipcode"
            type="number"
            placeholder=""
          />
        </div>
      </div>
      <div class="flex justify-end">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={handleSubmitNext}
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default AddressInfoForm;
