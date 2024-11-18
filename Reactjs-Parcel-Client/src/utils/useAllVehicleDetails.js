import { useEffect, useState } from "react";
import { useLoadUsers } from "../utils/useLoadUsers";

const useAllVehicleDetails = (value, page, pageSize, search, filter) => {
  const { token } = useLoadUsers();
  const [totalSize, setTotalSize] = useState(0);
  const [vehicleData, setVehicleData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [page, search, filter]);

  const fetchData = async () => {
    let url =
      value === "vendor"
        ? `http://localhost:3000/products/getVendorProducts?search=${search}&page=${page}&pageSize=${pageSize}&filter=${filter}`
        : `http://localhost:3000/products/getProducts?search=${search}&page=${page}&pageSize=${pageSize}&filter=${filter}`;

    let headers =
      value === "vendor"
        ? {
            authorization: `Bearer ${token}`,
          }
        : { "Content-Type": "application/json" };

    const res = await fetch(url, {
      method: "GET",
      headers,
    });
    const json = await res.json();
    const { total, products } = json;
    setTotalSize(total);
    setVehicleData(products);
  };
  return { totalSize, vehicleData };
};

export default useAllVehicleDetails;
