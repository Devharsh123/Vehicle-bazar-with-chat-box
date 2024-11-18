import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import { useDispatch } from "react-redux";
import { loadUser, logout } from "../utils/redux/userSlice";
import { useLoadUsers } from "../utils/useLoadUsers";

const Header = () => {
  const dispatch = useDispatch();
  const onlineStatus = useOnlineStatus();
  const { data } = useLoadUsers();

  const dispatchUser = () => {
    dispatch(loadUser());
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="flex justify-between bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg">
      <div>
        <img
          className="w-32 rounded ml-6 mt-1"
          src={require("../images/logo.png")}
          alt="Image"
        />
      </div>
      <div className="flex items-center font-bold">
        <ul className="flex p-4 m-4 text-base">
          <li className="px-4">Online: {onlineStatus ? "🟢" : "🔴"}</li>
          <button className="px-4" onClick={dispatchUser}>
            <Link to="/">Home</Link>
          </button>
          {data && data.name && (
            <>
              <li className="px-4 font-sans uppercase">
                <Link to="/user-profile">{data.name} </Link>
              </li>
              <button className="px-4" onClick={dispatchUser}>
                <Link to="/vendor-chat">💬 Chat</Link>
              </button>
            </>
          )}
          {data && data.name ? (
            <button className="px-4" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <>
              <li className="px-4">
                <Link to="/signup">Signup</Link>
              </li>
              <li className="px-4">
                <Link to="/login">Login</Link>
              </li>
            </>
          )}
          <li className="px-4">
            <Link to="/cart">🛒 Cart</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
