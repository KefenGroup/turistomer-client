/* eslint-disable react/no-unescaped-entities */
import styles from "./page.module.css";
import Image from 'next/image'
import hotel from "../../assets/hotel.png"

export default function HomePage() {
    return (
    <div className={styles.content}>
        <div className={styles.div_categories}>
            <p className={styles.header}>Our Popular Categories</p>
            <div className={styles.categories}>
                <div className={styles.hotels_div}>
                    <div className={styles.hotel}>
                        <div className={styles.hotel_png_div}>
                            <div className={styles.category_png}>
                                <Image src={hotel} alt="hotel" width={60} height={60}></Image>
                            </div>
                        </div>
                        <p className={styles.category_title}>Hotels</p>
                    </div>
                </div>
                <div className={styles.rests_div}>

                </div>
                <div>

                </div>
            </div>
        </div>
    </div>)
}