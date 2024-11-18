import { Link } from "react-router-dom";
import { useLoadUsers } from "../utils/useLoadUsers";

const Profile = () => {
  const { data } = useLoadUsers();
  return (
    <div>
      <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <div>
          <img
            class="m-5 object-cover w-full rounded-t-lg rounded-b-lg h-96 md:h-auto md:w-48  md:rounded-s-lg"
            src={require("../images/images-bkg.jpg")}
            alt="user-profile-image"
          />
          {data && data.role === "VENDOR" ? (
            <>
              <button className="left-4 flex justify-center m-5 px-3 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg rounded hover:shadow-slate-300">
                <Link to="/create">Create Product </Link>
              </button>
            </>
          ) : (
            <></>
          )}
        </div>
        <div class="flex flex-col justify-between p-4 leading-normal">
          <h5 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {data.name}
          </h5>
          <hr class="h-px  bg-gray-200 border-0 md:my-10 dark:bg-gray-700"></hr>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
            <strong> Email </strong>: {data.email}
          </p>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
            <strong> Description </strong>: Provided for base and good feel
          </p>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {data.verfied ? (
              <>
                <strong> Verified </strong>: ✅
              </>
            ) : (
              <>
                <strong> Verified </strong>:🔴
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
