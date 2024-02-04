/* eslint-disable react/no-unescaped-entities */
import styles from "./page.module.css";
import CategoryList from "@/components/CategoryList";

export default function HomePage() {
    return (
    <div className={styles.content}>
        <div className={styles.div_categories}>
            <p className={styles.header}>Our Popular Categories</p>
            <CategoryList />
        </div>
    </div>)
}