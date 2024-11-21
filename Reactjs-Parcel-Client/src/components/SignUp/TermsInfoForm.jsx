import { useState } from "react";

const TermsInfoForm = ({ onNext }) => {
  const [checked, setChecked] = useState(false);
  const handleChange = (e) => {
    setChecked(e.target.checked);
  };

  const handleSubmitNext = () => {
    onNext("acceptTermsForm");
  };

  return (
    <div className="rounded px-8 pt-6 pb-8">
      <h3 className="font-medium mb-4">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit
        reiciendis magni iure dolore laborum sed nesciunt! Quia eveniet cumque
        sequi esse? Temporibus eligendi nesciunt reprehenderit ipsum laborum
        earum placeat corrupti.
      </h3>
      <div className="flex gap-3 mb-6">
        <input
          type="checkbox"
          id="agree"
          checked={checked} // Reflect the current state
          onChange={handleChange}
        />{" "}
        <span className="text-blue-400 font-normal">
          I Agree to the terms&conditions
        </span>
      </div>
      <div class="flex justify-end">
        <button
          disabled={!checked}
          class={
            !checked
              ? "bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              : "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          }
          type="button"
          onClick={handleSubmitNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TermsInfoForm;
