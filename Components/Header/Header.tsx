"use client";

import React, { useState } from "react";
import HeaderStyle from "./Header.module.scss";
import Image from "next/image";
import Link from "next/link";

export default function Header({ onSearch, hideSearch = false }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <div className={HeaderStyle.container}>
      <Link href="/">
        <h1>News Blogs</h1>
      </Link>
      {!hideSearch && (
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search blogs..."
          />
          <button type="submit">
            <Image
              src="/Images/Search.svg"
              width={22}
              height={22}
              alt="search icon"
            />
          </button>
        </form>
      )}
    </div>
  );
}
