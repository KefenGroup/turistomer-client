"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { GeolocateControl, Map } from "react-map-gl";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";
import { useSearchParams } from "next/navigation";
import mapboxgl from "mapbox-gl";

export default function DirectionsMap() {
  // interface IViewState {
  //   longitude: number;
  //   latitude: number;
  //   zoom: number;
  // }

  // const [viewState, setViewState] = useState<IViewState>({
  //   longitude: 35.243322,
  //   latitude: 38.963745,
  //   zoom: 5,
  // });
  const DEFAULT_LNG = 35.243322;
  const DEFAULT_LAT = 38.963745;
  const searchParams = useSearchParams();

  const [mapState, setMapState] = useState<Map | null>(null);
  const [userLocation, setUserLocation] = useState({
    lng: DEFAULT_LNG,
    lat: DEFAULT_LAT,
  });

  const mapControlRef = useRef(
    new MapboxDirections({
      accessToken: process.env.NEXT_PUBLIC_MAP_BOX_API_TOKEN,
      unit: "metric",
      profile: "mapbox/driving",
    })
  );
  const mapGeoLocRef = useRef(
    new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
      showUserHeading: true,
    })
  );

  useEffect(() => {
    navigator.geolocation.watchPosition(
      (position) => {
        mapControlRef.current.setOrigin([
          position.coords.longitude,
          position.coords.latitude,
        ]);
      },
      (err) => console.log(err),
      { maximumAge: 0, timeout: 15000, enableHighAccuracy: true }
    );
  }, []);

  useEffect(() => {
    if (mapState) {
      if (!mapState.hasControl(mapControlRef.current)) {
        mapState.addControl(mapControlRef.current, "top-left");
        mapState.addControl(mapGeoLocRef.current);
      }
      mapControlRef.current.setDestination([
        searchParams.get("lat"),
        searchParams.get("lng"),
      ]);
    }
  }, [mapState, userLocation, searchParams]);

  return (
    <Map
      // {...viewState}
      // onMove={(state) => setViewState(state.viewState)}
      initialViewState={{ longitude: 35.243322, latitude: 38.963745, zoom: 5 }}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAP_BOX_API_TOKEN}
      style={{ width: "100%", height: "100%" }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      ref={(nextRef) => {
        setMapState(nextRef);
      }}
    />
  );
}
