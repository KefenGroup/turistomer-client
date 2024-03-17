/* eslint-disable react/no-unescaped-entities */
"use client";
import styles from "./page.module.css";
import { memo, useEffect, useState } from "react";
import { Search, Send } from "@mui/icons-material";
import {
  TextField,
  InputAdornment,
  IconButton,
  Pagination,
} from "@mui/material";
import RestaurantCard from "@/components/RestaurantCard2";
import HotelCard from "@/components/HotelCard2";
import FilterCard from "@/components/FilterCard";
import ChatBox from "@/components/ChatBox";

export default function HomePage() {
  type ApiDataType = "restaurants" | "hotels";

  const [dataType, setDataType] = useState<ApiDataType>("restaurants");
  const [apiData, setApiData] = useState<any>([]);
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [prompt, setPrompt] = useState<string>("");
  const [promptHistory, setPromptHistory] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      let base = process.env.BASE_URL;
      const req = await fetch(
        `http://localhost:8080/api/${dataType}/${pageNumber - 1}/30`
      );
      const data = await req.json();
      console.log("Hey", data);
      setApiData(data);
      setIsFetched(true);
    };
    fetchData();
  }, [dataType, pageNumber]);

  useEffect(() => {
    const messageBody = document.getElementById(
      `prompt_${promptHistory.length - 1}`
    );
    console.log("msg", messageBody);
    messageBody?.scrollIntoView({
      block: "nearest",
      behavior: "smooth",
    });
  }, [promptHistory]);

  const postPrompt = async () => {
    let userLoc = { longitude: 0, latitude: 0 };
    navigator.geolocation.getCurrentPosition((position) => {
      userLoc.longitude = position.coords.longitude;
      userLoc.latitude = position.coords.latitude;
    });
    const promptData = {
      type: "restaurant",
      prompt: prompt,
      latitude: userLoc.latitude,
      longitude: userLoc.longitude,
    };
    let basicAIPrompt = "";
    try {
      const req = await fetch(`http://localhost:8080/model`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(promptData),
      });
      const data = await req.json();

      basicAIPrompt = "DONE";
    } catch (e) {
      basicAIPrompt = "ERROR";
    }

    // setApiData(data);
    setPromptHistory((prev) => [...prev, basicAIPrompt]);
  };

  return (
    <>
      <style>{"body { overflow: auto; background-color: #e2ebf0; }"}</style>
      <div className={styles.content}>
        {/* <div className={styles.div_categories}>
          <p className={styles.header}>Our Popular Categories</p>
        </div> */}

        <div style={{ border: "solid 1px" }} className={styles.content_2}>
          <ChatBox promptHistory={promptHistory} />

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              position: "relative",
            }}
          >
            <TextField
              value={prompt}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setPrompt(event.target.value);
              }}
              sx={{ width: "80%" }}
              id="filled-basic"
              label="Your Message"
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      type="submit"
                      onClick={() => {
                        setPromptHistory((prev) => [...prev, prompt]);
                        postPrompt();
                      }}
                      edge="end"
                    >
                      <Send />
                    </IconButton>
                  </InputAdornment>
                ),
                style: { fontSize: 15 },
              }}
              InputLabelProps={{ style: { fontSize: 12 } }}
            ></TextField>
          </div>

          {/* <FilterCard
            establishmentType={dataType}
            handleEstablishmentType={(e) => {
              setIsFetched(false);
              setDataType(e.target.value as ApiDataType);
            }}
          /> */}
        </div>

        {/* <ChatBox promptHistory={promptHistory} />

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            position: "relative",
          }}
        >
          <TextField
            value={prompt}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setPrompt(event.target.value);
            }}
            sx={{ t: 5, width: "50%" }}
            id="outlined-basic"
            label="Chat with AI!"
            variant="filled"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => {
                      setPromptHistory((prev) => [...prev, prompt]);
                      postPrompt();
                    }}
                    edge="end"
                  >
                    <Search />
                  </IconButton>
                </InputAdornment>
              ),
              style: { background: "#b4cbd8", fontSize: 15 },
            }}
            InputLabelProps={{ style: { fontSize: 12 } }}
          ></TextField>
        </div>

        <FilterCard
          establishmentType={dataType}
          handleEstablishmentType={(e) => {
            setIsFetched(false);
            setDataType(e.target.value as ApiDataType);
          }}
        /> */}
        <div
          style={{
            height: "100%",
            width: "60%",
            marginLeft: 30,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Pagination
            page={pageNumber}
            onChange={(e, val) => setPageNumber(val)}
            sx={{ marginBottom: 2 }}
            count={10}
            color="primary"
          />
          <FilterCard
            establishmentType={dataType}
            handleEstablishmentType={(e) => {
              setIsFetched(false);
              setDataType(e.target.value as ApiDataType);
            }}
          />
          <div>
            {isFetched &&
              apiData.map((data: any) =>
                dataType === "restaurants" ? (
                  <RestaurantCard key={data.id} {...data} />
                ) : (
                  <HotelCard key={data.id} {...data} />
                )
              )}
          </div>
          <Pagination
            sx={{ marginBottom: 10 }}
            page={pageNumber}
            onChange={(e, val) => setPageNumber(val)}
            count={10}
            color="primary"
          />
        </div>

        {/* <Pagination
          page={pageNumber}
          onChange={(e, val) => setPageNumber(val)}
          sx={{ marginBottom: 2 }}
          count={10}
          color="primary"
        />

        <div>
          {isFetched &&
            apiData.map((data: any) =>
              dataType === "restaurants" ? (
                <RestaurantCard key={data.id} {...data} />
              ) : (
                <HotelCard key={data.id} {...data} />
              )
            )}
        </div>

        <Pagination
          sx={{ marginBottom: 10 }}
          page={pageNumber}
          onChange={(e, val) => setPageNumber(val)}
          count={10}
          color="primary"
        /> */}
      </div>
    </>
  );
}
