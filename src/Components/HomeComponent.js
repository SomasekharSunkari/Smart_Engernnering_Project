import React from "react";

const HomeComponent = () => {
  return (
    <div>
      <div className=" flex flex-col text-white mt-5 text-center ">
        <h1
          className="text-center text-8xl font-bold mainheading mt-[150px]"
          style={{ textShadow: "3px 3px 7px  white" }}
        >
          Cloud Based Document ManageMent System
        </h1>

        {/* <h1 className="text-white">
        We Provide <span className="text-9xl">{text}</span>
        <span className=" text-9xl">
          {" "}
          <Cursor />
        </span>
      </h1> */}
      </div>
    </div>
  );
};

export default HomeComponent;
