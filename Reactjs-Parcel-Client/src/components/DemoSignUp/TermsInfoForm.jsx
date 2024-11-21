import { useState } from "react";

const TermsInfoForm = ({ onSubmit }) => {
  const [checked, setChecked] = useState(false);

  const handleChange = (e) => {
    setChecked(e.target.checked);
  };

  const handleSubmitNext = () => {
    if (checked) {
      onSubmit(); // Trigger the parent component's submission logic
    }
  };

  return (
    <div className="rounded px-8 pt-6 pb-8">
      <h3 className="font-medium mb-4">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit
        reiciendis magni iure dolore laborum sed nesciunt! Quia eveniet cumque
        sequi esse? Temporibus eligendi nesciunt reprehenderit ipsum laborum
        earum placeat corrupti.
      </h3>
      <div className="flex gap-3 mb-6">
        <input
          type="checkbox"
          id="agree"
          checked={checked}
          onChange={handleChange}
        />
        <span className="text-blue-400 font-normal">
          I Agree to the Terms & Conditions
        </span>
      </div>
      <div className="flex justify-end">
        <button
          disabled={!checked}
          className={`font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
            checked
              ? "bg-blue-500 hover:bg-blue-700 text-white"
              : "bg-gray-500 text-white"
          }`}
          type="button"
          onClick={handleSubmitNext}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default TermsInfoForm;
