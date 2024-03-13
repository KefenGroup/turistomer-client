"use client";
import React, { FC } from "react";
import styles from "../styles/categorylist.module.css";
import Image, { StaticImageData } from "next/image";
import hotel from "../assets/hotel.png";
import restaurant from "../assets/restaurant.png";

interface ListItem {
  outerClassName: string;
  name: string;
  innerClassName: string;
  src: StaticImageData;
  title: string;
}

const listItems: ListItem[] = [
  {
    outerClassName: "hotels_div",
    name: "hotel",
    innerClassName: "hotel_png_div",
    src: hotel,
    title: "Hotels",
  },
  {
    outerClassName: "rests_div",
    name: "rest",
    innerClassName: "rest_png_div",
    src: restaurant,
    title: "Restaurants",
  },
];

const CategoryList: FC<{}> = () => {
  return (
    <div className={styles.categories}>
      {listItems.map((item) => (
        <div className={styles[item.outerClassName]} key={item.name}>
          <div className={styles[item.name]}>
            <div className={styles[item.innerClassName]}>
              <div className={styles.category_png}>
                <Image
                  src={item.src}
                  alt={item.name}
                  width={30}
                  height={30}
                ></Image>
              </div>
            </div>
            <p className={styles.category_title}>{item.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
