import { useState } from "react";

const DemoPersonalInfoForm = ({ onNext, user }) => {
  const [formData, setFormData] = useState({
    name: user.name || "",
    dob: user.dob || "",
    age: user.age || "",
    gender: user.gender || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onNext("personalForm", "addressForm", formData);
  };

  return (
    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8">
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="name"
        >
          Name
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none"
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="John Doe"
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="dob"
        >
          D.O.B
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none"
          id="dob"
          name="dob"
          type="date"
          value={formData.dob}
          onChange={handleChange}
        />
      </div>
      <div className="flex mb-6 gap-4">
        <div className="flex-1">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="age"
          >
            Age
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none"
            id="age"
            name="age"
            type="number"
            value={formData.age}
            onChange={handleChange}
            placeholder="0"
          />
        </div>
        <div className="flex-1">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="gender"
          >
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            className="p-1 block w-full rounded border text-gray-900 focus:ring-2 focus:ring-indigo-600"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>
        </div>
      </div>
      <div className="flex justify-end">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="button"
          onClick={handleSubmit}
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default DemoPersonalInfoForm;
