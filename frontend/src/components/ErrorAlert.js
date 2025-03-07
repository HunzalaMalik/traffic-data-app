import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors } from "../store/trafficSlice";

const ErrorAlert = () => {
  const error = useSelector((state) => state.traffic.error);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearErrors());
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  if (!error) return null;

  return (
    <div className="fixed top-4 right-4 z-50 bg-red-500 text-white p-3 shadow-lg rounded-lg max-w-md w-auto sm:w-96 text-center animate-fadeIn">
      {Array.isArray(error) ? error.join(", ") : error}
      <button onClick={() => dispatch(clearErrors())} className="ml-4 text-white underline">
        X
      </button>
    </div>
  );
};

export default ErrorAlert;
