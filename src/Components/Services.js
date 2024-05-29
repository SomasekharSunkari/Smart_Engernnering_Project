import React from "react";
import { Button } from "@mui/material";
import { Link, Outlet } from "react-router-dom";

const Services = () => {
  const scrollToDown = () => {
    window.scrollTo({
      top: window.pageYOffset + 800,
      behavior: "smooth", // Smooth scrolling animation
    });
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-center text-white text-5xl font-bold mainheading mt-[50px]">
        Secure File Management
      </h1>
      <div className="w-2/5 h-[200px] backdrop-blur-xl rounded-lg border-2 border-red mx-auto mt-16 p-10">
        <h1 className="text-center text-4xl text-white mb-5 font-bold">
          Want to ?{" "}
        </h1>
        <div className="flex justify-between mt-10">
          <Button variant="contained">
            <Link
              to="/service/uploadfiles"
              onClick={scrollToDown} // Call scrollToDown function onClick
            >
              Upload a File
            </Link>
          </Button>
          <Button variant="contained">
            <Link
              to="/service/updatefiles"
              onClick={scrollToDown} // Call scrollToDown function onClick
            >
              Update a File
            </Link>
          </Button>
          <Button variant="contained">
            <Link
              to="/service/deletefiles"
              onClick={scrollToDown} // Call scrollToDown function onClick
            >
              Delete a File
            </Link>
          </Button>
        </div>
      </div>
      <div className="mt-[340px]">
        <Outlet />
      </div>
    </div>
  );
};

export default Services;
