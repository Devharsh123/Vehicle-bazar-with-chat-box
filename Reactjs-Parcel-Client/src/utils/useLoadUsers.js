import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../utils/redux/userSlice";

export const useLoadUsers = () => {
  const dispatch = useDispatch();
  const { token, data } = useSelector((users) => users.user);
  useEffect(() => {
    dispatchUser();
  }, []);

  const dispatchUser = () => {
    dispatch(loadUser());
  };
  return { token, data };
};
