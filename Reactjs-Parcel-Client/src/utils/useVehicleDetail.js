import { useEffect, useState } from "react";

const useVehicleDetails = (id) => {
  const [productDetails, setProductDetails] = useState({});
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    let url = `http://localhost:3000/products/product-details/${id}`;
    const res = await fetch(url);
    const json = await res.json();
    setProductDetails(json);
  };

  return productDetails;
};

export default useVehicleDetails;
