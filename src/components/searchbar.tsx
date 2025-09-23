"use client";

import React, { useState } from "react";
import styles from "./SearchBar.module.css";
import { useRouter } from "next/navigation";

interface SearchBarProps {
  dict: {
    Navheader: { [key: string]: string };
  };
}

const SearchBar = ({ dict }: SearchBarProps) => {
  const [barValue, setBarValue] = useState("");
  const router = useRouter();

  const update = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBarValue(e.target.value);
  };

  const searchPressed = (value: string) => {
    const query = value ? `?filter=${encodeURIComponent(value)}` : "";
    router.push(`/Med-cert/${query}`);
  };

  const keySearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      searchPressed(barValue);
    }
  };

  return (
    <li className={styles.searchBar}>
      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        <button
          type="button"
          className={styles.searchIcon}
          onClick={() => searchPressed(barValue)}
        >
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
        <input
          type="text"
          placeholder={dict.Navheader.searchPlaceholder}
          value={barValue}
          onChange={update}
          onKeyDown={keySearch}
        />
      </form>
    </li>
  );
};

export default SearchBar;
