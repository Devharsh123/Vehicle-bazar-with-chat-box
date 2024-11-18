import { useLoadUsers } from "../utils/useLoadUsers";
import Body from "./Body";
import Profile from "./Profile";

const User = () => {
  const { data } = useLoadUsers();
  return (
    <div>
      <div>
        <div className="flex p-10 justify-center">
          <Profile />
        </div>
      </div>
      <hr class="h-px my-8 bg-gray-200 border-0 md:my-10 dark:bg-gray-700"></hr>

      {data && data.role === "VENDOR" ? (
        <>
          <Body values={"vendor"} />
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default User;
