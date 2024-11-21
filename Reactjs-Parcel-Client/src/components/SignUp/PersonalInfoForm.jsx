const PersonalInfoForm = ({ onNext }) => {
  const handleSubmitNext = () => {
    onNext("personalForm", "addressForm");
  };
  return (
    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
          Name
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          placeholder="name"
        />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="dob">
          D.O.B
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="dob"
          type="date"
          placeholder=""
        />
        {/* <p class="text-red-500 text-xs italic">Please choose a password.</p> */}
      </div>
      <div className="flex mb-6 gap-4">
        <div class="flex-1">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="age">
            Age
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="age"
            type="number"
            placeholder="0"
          />
        </div>
        <div class="flex-1">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="gender"
          >
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            autocomplete="role-name"
            class="p-1 block w-full rounded border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
          >
            <option selected>Select</option>
            <option>MALE</option>
            <option>FEMALE</option>
          </select>
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

export default PersonalInfoForm;
