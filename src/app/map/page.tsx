"use client";
import React, { useEffect, useRef, useState } from "react";
import { Map } from "react-map-gl";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";

export default function DirectionsMap() {
  interface IViewState {
    longitude: number;
    latitude: number;
    zoom: number;
  }
  const [viewState, setViewState] = useState<IViewState>({
    longitude: -122.4,
    latitude: 37.8,
    zoom: 14,
  });
  const [mapRef, setMapRef] = useState<Map | null>(null);

  useEffect(() => {
    if (mapRef) {
      const directions = new MapboxDirections({
        accessToken: process.env.NEXT_PUBLIC_MAP_BOX_API_TOKEN,
        unit: "metric",
        profile: "mapbox/driving",
      });
      mapRef.addControl(directions, "top-left");
    }
  }, [mapRef]);

  return (
    <Map
      {...viewState}
      onMove={(state) => setViewState(state.viewState)}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAP_BOX_API_TOKEN}
      style={{ width: 600, height: 400 }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      ref={(nextRef) => setMapRef(nextRef)}
    />
  );
}
