"use client";

import NavBar from "@/components/navbar";
import Items from "./components/Items";
import ItemsList from "./components/items-list";
import DropImage from "@/components/DropImage";

const Dashboard = () => {
  return (
    <>
      <NavBar />
      <div className="flex flex-col justify-center sm:px-5">
        <Items />
      </div>
      <div className="flex flex-col items-center justify-center">
        <ItemsList />
      </div>
      <DropImage />
    </>
  );
};

export default Dashboard;
