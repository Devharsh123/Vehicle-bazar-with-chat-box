import { useState } from "react";
import useFetchCart from "../utils/useFetchCart";
import { useLoadUsers } from "../utils/useLoadUsers";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();

  const { token, data } = useLoadUsers();
  const { cart, user, setCart } = useFetchCart(token);

  const [shippingDetails, setShippingDetails] = useState({});
  let [count, setCount] = useState(1);

  const handleCheckout = async () => {
    const resBody = {
      orderItems: {
        u_id: user._id,
        p_id: cart._id,
        prodName: cart.name,
        noOfDays: count,
        totalPrice: cart.pricePerDay * count,
      },
      shippingDetail: {
        customerName: user.name,
        email: user.email,
        address: shippingDetails.address,
        city: shippingDetails.city,
        state: shippingDetails.state,
        contact: shippingDetails.contact,
      },
    };
    navigate("/checkout", { state: { resBody } });
  };

  const handleSubtract = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleAdd = () => {
    setCount(count + 1);
  };

  const handleRemoveCartItem = async (id) => {
    const res = await fetch(`http://localhost:3000/cart/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
    const json = await res.json();
    console.log(json, "json");
    if (json)
      if (json) {
        alertFunction();
      }
    function alertFunction() {
      setCart({});
      alert("Product added to cart");
    }
  };

  return (
    <div>
      <div class="font-sans max-w-6xl max-lg:max-w-2xl mx-auto bg-white p-4">
        <div class="grid lg:grid-cols-2 gap-12">
          <div>
            <div class="bg-gray-100 p-6 rounded-md">
              <h2 class="text-2xl font-extrabold text-gray-800">Your Cart</h2>
              <hr class="border-gray-300" />

              <div class="space-y-4 mt-8">
                <div class="flex items-center gap-4">
                  <div class="w-24 h-24 shrink-0 bg-white p-2 rounded-md">
                    <img
                      src={cart.imageUrl}
                      class="w-full h-full object-fill"
                    />
                  </div>

                  <div class="w-full">
                    <h3 class="text-base font-semibold text-gray-800">
                      {cart.name}
                    </h3>
                    <h6 class="text-sm text-gray-800 font-bold cursor-pointer mt-0.5">
                      $ {cart.pricePerDay}
                    </h6>

                    <div class="flex gap-4 mt-4">
                      <span class="text-base font-semibold text-gray-800">
                        No. of Days
                      </span>
                      <div className="flex">
                        <button
                          type="button"
                          onClick={handleSubtract}
                          class="flex items-center px-2.5 py-1.5 border border-gray-300 text-gray-800 text-xs outline-none bg-transparent rounded-md"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="w-2.5 fill-current"
                            viewBox="0 0 124 124"
                          >
                            <path
                              d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z"
                              data-original="#000000"
                            ></path>
                          </svg>
                        </button>
                        <div class="mx-2.5">{count}</div>
                        <button
                          type="button"
                          onClick={handleAdd}
                          class="flex items-center px-2.5 py-1.5 border border-gray-300 text-gray-800 text-xs outline-none bg-transparent rounded-md"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="w-2.5 fill-current"
                            viewBox="0 0 42 42"
                          >
                            <path
                              d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z"
                              data-original="#000000"
                            ></path>
                          </svg>
                        </button>
                      </div>

                      <div class="ml-auto">
                        <svg
                          onClick={() => handleRemoveCartItem(cart._id)}
                          xmlns="http://www.w3.org/2000/svg"
                          class="w-4 fill-red-500 inline cursor-pointer"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
                            data-original="#000000"
                          ></path>
                          <path
                            d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
                            data-original="#000000"
                          ></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div></div>
                </div>
                <hr class="border-gray-300" />
                <div className="flex justify-between">
                  <div className="text-base font-semibold text-gray-800">
                    Total Price
                  </div>
                  <div className="text-base font-semibold text-gray-800">
                    $ {cart.pricePerDay * count}
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-4 flex flex-wrap justify-center gap-4">
              <img
                src="https://readymadeui.com/images/master.webp"
                alt="card1"
                class="w-12 object-contain"
              />
              <img
                src="https://readymadeui.com/images/visa.webp"
                alt="card2"
                class="w-12 object-contain"
              />
              <img
                src="https://readymadeui.com/images/american-express.webp"
                alt="card3"
                class="w-12 object-contain"
              />
            </div>
          </div>

          <form>
            <h2 class="text-2xl font-extrabold text-gray-800">
              Shipping Details
            </h2>
            <div class="grid gap-4 mt-8">
              <div>
                <div class="block text-base font-semibold text-gray-800 mb-2">
                  Customer Name: {user.name}
                </div>
                {/* <input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                value={shippingDetails.name}
                onChange={(e) =>
                  setshippingDetails({
                    ...shippingDetails,
                    name: e.target.value,
                  })
                }
                class="px-4 py-3 bg-transparent text-gray-800 w-full text-sm border border-gray-300 rounded-md focus:border-purple-500 outline-none"
              /> */}
              </div>

              <div>
                <div class="block text-base font-semibold text-gray-800 mb-2">
                  Customer Email: {user.email}
                </div>
                {/* <div class="flex bg-transparent border border-gray-300 rounded-md focus-within:border-purple-500 overflow-hidden">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="johndoe@gmail.com"
                  value={shippingDetails.email}
                  onChange={(e) =>
                    setshippingDetails({
                      ...shippingDetails,
                      email: e.target.value,
                    })
                  }
                  class="px-4 py-3 bg-transparent text-gray-800 w-full text-sm outline-none"
                />
              </div> */}
              </div>

              <div>
                <label class="block text-base font-semibold text-gray-800 mb-2">
                  Customer Address
                </label>
                <div class="flex bg-transparent border border-gray-300 rounded-md focus-within:border-purple-500 overflow-hidden">
                  <input
                    id="address"
                    name="address"
                    type="text"
                    placeholder="Address"
                    value={shippingDetails.address}
                    onChange={(e) =>
                      setShippingDetails({
                        ...shippingDetails,
                        address: e.target.value,
                      })
                    }
                    class="px-4 py-3 bg-transparent text-gray-800 w-full text-sm outline-none"
                  />
                </div>
              </div>

              <div class="grid grid-cols-3 gap-4">
                <div>
                  <label class="block text-base font-semibold text-gray-800 mb-2">
                    City
                  </label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    placeholder="city"
                    value={shippingDetails.city}
                    onChange={(e) =>
                      setShippingDetails({
                        ...shippingDetails,
                        city: e.target.value,
                      })
                    }
                    class="px-4 py-3 bg-transparent text-gray-800 w-full text-sm border border-gray-300 rounded-md focus:border-purple-500 outline-none"
                  />
                </div>

                <div>
                  <label class="block text-base font-semibold text-gray-800 mb-2">
                    State
                  </label>
                  <input
                    id="state"
                    name="state"
                    type="text"
                    placeholder="state"
                    value={shippingDetails.state}
                    onChange={(e) =>
                      setShippingDetails({
                        ...shippingDetails,
                        state: e.target.value,
                      })
                    }
                    class="px-4 py-3 bg-transparent text-gray-800 w-full text-sm border border-gray-300 rounded-md focus:border-purple-500 outline-none"
                  />
                </div>

                <div>
                  <label class="block text-base font-semibold text-gray-800 mb-2">
                    Contact
                  </label>
                  <input
                    id="contact"
                    name="contact"
                    type="number"
                    placeholder="contact"
                    value={shippingDetails.contact}
                    onChange={(e) =>
                      setShippingDetails({
                        ...shippingDetails,
                        contact: e.target.value,
                      })
                    }
                    class="px-4 py-3 bg-transparent text-gray-800 w-full text-sm border border-gray-300 rounded-md focus:border-purple-500 outline-none"
                  />
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                handleCheckout();
              }}
              class="mt-8 text-sm px-4 py-3 w-full font-semibold tracking-wide bg-indigo-600 hover:bg-indigo-700 text-white rounded-md"
            >
              Checkout
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Cart;
