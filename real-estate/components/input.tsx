"use client";
import { useState } from "react";

export default function Input() {
  const [search, setSearch] = useState("");

  return (
    <input
      placeholder="Search"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}
