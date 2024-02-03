/* eslint-disable react/no-unescaped-entities */
import Header from "@/components/Header";
import styles from "./page.module.css";

export default function HomePage() {
    return (
    <main className={styles.background}>
        <Header />
        <div className={styles.content}>
            <div className={styles.title_area}>
                <p className={styles.title_part_1}>Let's Make Your</p>
                <p className={styles.title_part_2}>Dream Vacation</p>
            </div>
        </div>
    </main>)
}