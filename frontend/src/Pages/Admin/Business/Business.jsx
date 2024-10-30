import React from "react";
import Navbar from "../../../Components/Navbar/Navbar";

const Business = () => {
  return (
    <div className="flex flex-col w-full h-screen">
      <Navbar />

      <div className="flex flex-grow mt-2">
        <main className="flex-grow w-full p-4">
          {/* <h1 className="text-2xl font-bold">
            Welcome the Admin Dashboard
          </h1> */}
        </main>
      </div>
    </div>
  );
};

export default Business;
