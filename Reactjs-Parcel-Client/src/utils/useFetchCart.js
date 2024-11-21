import { useEffect, useState } from "react";

const useFetchCart = (token) => {
  const [cart, setCart] = useState({});
  const [user, setUser] = useState({});

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    const res = await fetch(`http://localhost:3000/cart`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
    const json = await res.json();

    if (json.message === "Unauthorized" && json.statuscode === 401) {
      return { cart, user };
    }
    if (json && json.length == 0) {
      return { cart, user };
    }
    const resJson = json[0];
    setCart(resJson.productDetails[0]);
    setUser(resJson.userDetail);
  };

  return { cart, user, setCart };
};

export default useFetchCart;
