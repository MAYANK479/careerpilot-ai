import React from "react";

export function Skeleton({ className = "", ...props }) {
  return (
    <div
      className={`animate-pulse bg-[#111B2E] rounded-md ${className}`}
      {...props}
    />
  );
}
