import React from "react";
import "boxicons";
import { default as api } from "../store/apiSlice";

export default function List() {
  const { data, isFetching, isSuccess, isError } = api.useGetLabelsQuery();

  let Transactions;
  if (isFetching) {
    Transactions = <div>Fetching</div>;
  } else if (isSuccess) {
    Transactions = data.map((v, i) => (
      <Transaction key={i} category={v}></Transaction>
    ));
  } else if (isError) {
    Transactions = <div>Error</div>;
  }

  return (
    <div className="flex flex-col py-6 gap-3">
      <h1 className="py-4 font-bold text-xl">History</h1>
      {Transactions}
    </div>
  );
}

function Transaction({ category, handler }) {
  if (!category) return null;
  return (
    <div
      className="item flex justify-center bg-gray-50 py-2 rounded-r"
      style={{ borderRight: `8px solid ${category.color ?? "#e5e5e5"}` }}
    >
      <button className="px-3">
        <box-icon
          size="15px"
          color={category.color ?? "#e5e5e5"}
          name="trash"
        ></box-icon>
      </button>
      {/* ↑ use the name property to pass the icon type */}
      <span className="block w-full">{category.name ?? ""}</span>
    </div>
  );
}
