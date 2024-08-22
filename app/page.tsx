"use client";

import React, { useState } from "react";
import Blog from "../Components/Blogs/blogs";
import HomeStyle from "./Home.module.scss";
import Header from "../Components/Header/Header";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className={HomeStyle.container}>
      <Header onSearch={handleSearch} />
      <div className={HomeStyle.container__blogs}>
        <Blog searchQuery={searchQuery} />
      </div>
    </div>
  );
}
