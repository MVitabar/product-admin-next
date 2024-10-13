"use client";

import Link from "next/link";

const ItemsList = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1>Items List</h1>
      <Link
        href="/dashboard/create-update-item"
        className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        CREAR
      </Link>
    </div>
  );
};

export default ItemsList;
