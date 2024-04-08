"use client";
import React, { FC } from "react";
import styles from "../styles/header.module.css";
import { Button } from "@mui/material";
import { Search } from "@mui/icons-material";
import { useRouter } from "next/navigation";

const navItemTitles: string[] = [
  "Home",
  "About",
  "Discover",
  "Blog",
  "Contact",
];

const Header: FC<{}> = () => {
  const router = useRouter();
  return (
    <div className={styles.header}>
      <div className={styles.header_box}>
        <p className={styles.title}>On trip</p>
        <div className={styles.nav_box}>
          <div className={styles.nav}>
            {navItemTitles.map((item_name) => {
              return (
                <button className={styles.nav_item} key={item_name}>
                  {item_name}
                </button>
              );
            })}
          </div>
        </div>
        <Button
          style={{ visibility: "hidden" }}
          onClick={() => router.push("/search")}
          className={styles.explore_button}
          variant="contained"
          endIcon={<Search fontSize="large" />}
        >
          Explore
        </Button>
      </div>
    </div>
  );
};

export default Header;
