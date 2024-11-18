import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Body from "./src/components/Body";
import About from "./src/components/About";
import Header from "./src/components/Header";
import Footer from "./src/components/Footer";
import SignUp from "./src/components/SignUp";
import Login from "./src/components/Login";
import Error from "./src/components/Error";
import User from "./src/components/User";
import Create from "./src/components/Create";
import Cart from "./src/components/Cart";
import { Provider } from "react-redux";
import appStore from "./src/utils/redux/appStore";
import Checkout from "./src/components/Checkout";
import Return from "./src/components/Return";
import ProductDetails from "./src/components/ProductDetails";
import Chat from "./src/components/Chat";
import VendorChatBox from "./src/components/VendorChatBox";

const AppLayout = () => {
  return (
    <Provider store={appStore}>
      <div className="app">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </Provider>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "/", element: <Body /> },
      { path: "signup", element: <SignUp /> },
      { path: "login", element: <Login /> },
      { path: "about", element: <About /> },
      { path: "user-profile", element: <User /> },
      { path: "product-profile/:id", element: <ProductDetails /> },
      { path: "create", element: <Create /> },
      { path: "update", element: <Create /> },
      { path: "cart", element: <Cart /> },
      { path: "chat/:id", element: <Chat /> },
      { path: "vendor-chat", element: <VendorChatBox /> },
      { path: "checkout", element: <Checkout /> },
      { path: "return", element: <Return /> },
    ],
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
