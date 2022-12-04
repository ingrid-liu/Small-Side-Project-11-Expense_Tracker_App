import React from "react";
import { default as api } from "../store/apiSlice";

const obj = [
  {
    type: "Savings",
    color: "#f9c74f",
    percent: 45,
  },
  {
    type: "Investment",
    color: "rgb(54,162,235)",
    percent: 20,
  },
  {
    type: "Expense",
    color: "rgb(255,99,132)",
    percent: 10,
  },
];

export default function Labels() {
  const { data, isFetching, isSuccess, isError } = api.useGetCategoriesQuery();
  console.log(data);
  return (
    <>
      {/* {LabelComponent()} */}
      {obj.map((v, i) => (
        <LabelComponent key={i} data={v}></LabelComponent>
      ))}
    </>
  );
}

function LabelComponent({ data }) {
  if (!data) return <></>; // return an empty jsx
  return (
    // return a jsx (html in js)
    <div className="labels flex justify-between">
      <div className="flex gap-2">
        <div
          className="w-2 h-2 rounded py-3"
          style={{ background: data.color ?? "#f9c74f" }}
        ></div>{" "}
        {/*since using style in a jsx component, wrap it inside a curly brace*/}
        <h3 className="test-md">{data.type ?? ""}</h3>
      </div>
      <h3 className="fond-bold">{data.percent ?? 0}</h3>
    </div>
  );
}
