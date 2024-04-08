/* eslint-disable react/no-unescaped-entities */
"use client";
import Header from "@/components/Header";
import styles from "./page.module.css";
import {
  Fab,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Send, Bed, Restaurant } from "@mui/icons-material";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [dataType, setDataType] = useState<newApiDataType>(null);
  const [startingPrompt, setStartingPrompt] = useState<string>("");
  const router = useRouter();
  return (
    <main className={styles.background}>
      <Header />
      <div className={styles.content}>
        <div className={styles.title_area}>
          <p className={styles.title_part_1}>Let's Make Your</p>
          <p className={styles.title_part_2}>Dream Vacation</p>
        </div>
        <div
          style={{
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            width: "100%",
            flexDirection: "column",
          }}
        >
          <TextField
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (dataType) {
                  router.push(
                    `/search?dataType=${dataType}&initialPrompt=${startingPrompt}`
                  );
                }
              }
            }}
            value={startingPrompt}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setStartingPrompt(event.target.value);
            }}
            className={styles.text_field}
            id="filled-basic"
            label="Your Message"
            variant="filled"
            sx={{ backgroundColor: "#d4e4ec" }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    type="submit"
                    onClick={() => {
                      if (dataType) {
                        router.push(
                          `/search?dataType=${dataType}&initialPrompt=${startingPrompt}`
                        );
                      }
                    }}
                    edge="end"
                  >
                    <Send />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <div
            style={{
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
              width: "100%",
              marginTop: "3rem",
            }}
          >
            <Fab
              className={styles.buttons}
              sx={{
                display: "flex",
                flexDirection: "column",
                width: 100,
                height: 100,
                borderRadius: 5,
                mr: 10,
                color: dataType === "hotels" ? "white" : "#425e6f",
                backgroundColor: dataType === "hotels" ? "#37657c" : "#d4e4ec",
              }}
              onClick={(e) => {
                setDataType("hotels");
              }}
            >
              <Bed sx={{ height: 30, width: 30 }} />
              <Typography variant="h5">Hotels</Typography>
            </Fab>
            <Fab
              className={styles.buttons}
              sx={{
                display: "flex",
                flexDirection: "column",
                width: 100,
                height: 100,
                borderRadius: 5,
                color: dataType === "restaurants" ? "white" : "#425e6f",
                backgroundColor:
                  dataType === "restaurants" ? "#37657c" : "#d4e4ec",
              }}
              onClick={(e) => {
                setDataType("restaurants");
              }}
            >
              <Restaurant sx={{ height: 30, width: 30 }} />
              <Typography variant="h5">Restaurants</Typography>
            </Fab>
          </div>
        </div>
      </div>
    </main>
  );
}
