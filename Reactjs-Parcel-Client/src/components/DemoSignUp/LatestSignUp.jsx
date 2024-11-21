import { useNavigate } from "react-router-dom";
import BackgroundImage from "../BackgroundImage";

const LatestSignUp = () => {
  const navigate = useNavigate();

  const handleSignUpSwitchRole = (roleType) => {
    navigate("/demo-signup", { state: { role: roleType } });
  };
  return (
    <div className="relative h-screen ">
      <div className="h-1/2">
        <BackgroundImage />
      </div>
      <div class="absolute inset-0 flex justify-center items-center">
        <div className="opacity-100 p-6 bg-white rounded-lg shadow-lg w-96">
          <h2 className="text-xl font-bold text-center text-blue-600 mb-4">
            Choose Your Role
          </h2>
          <div className="flex flex-col gap-4">
            <button
              onClick={() => handleSignUpSwitchRole("USER")}
              className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              You want to be a USER
            </button>
            <button
              onClick={() => handleSignUpSwitchRole("VENDOR")}
              className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              You want to be a VENDOR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestSignUp;
