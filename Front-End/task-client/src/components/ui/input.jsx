import * as React from "react";

export function Input(props) {
  return (
    <input
      {...props}
      className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  );
}
