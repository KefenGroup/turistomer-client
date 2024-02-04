'use client';
import React, {FC} from "react";
import styles from  "../styles/header.module.css";

const navItemTitles: string[] = ['Home', 'About', 'Discover', 'Blog', 'Contact']

const Header: FC<{}> = () => {
    return (
    <div className={styles.header}>
        <div className={styles.header_box}>
            <p className={styles.title}>
                On trip
            </p>
            <div className={styles.nav_box}>
                <div className={styles.nav}>
                    {navItemTitles.map((item_name) => {
                        return (
                        <button
                            className={styles.nav_item} key={item_name}>{item_name}
                        </button>
                        )
                    } )}
                </div>
            </div>
        </div>
    </div>
    )
}

export default Header;