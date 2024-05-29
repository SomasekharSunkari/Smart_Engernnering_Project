import React from "react";
import { useState } from "react";
const Update = () => {
  const [files, setfiles] = useState(0);
  return (
    <div>
      <h1 className="text-center text-6xl text-white font-bold mainheading ">
        Available Files
      </h1>
      <div className="h-[400px] w-3/5 border-2 border-white mx-auto mt-8"></div>
    </div>
  );
};

export default Update;
