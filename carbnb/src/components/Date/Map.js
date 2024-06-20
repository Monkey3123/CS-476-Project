"use client";

import React from "react";
import { useState } from "react";
import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";

export default function Intro() {
  const [Lat, setLat] = useState("");
  const [Long, setLong] = useState("");

  const [MLat, MsetLat] = useState("");
  const [MLong, MsetLong] = useState("");

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });
  });

  return (
    <APIProvider apiKey={process.env.REACT_APP_API_KEY}>
      <div style={{ height: "50vh", width: "50%" }}>
        <Map
          onClick={(ev) => {
            console.log("latitide = ", ev.detail.latLng.lat);
            console.log("latitide = ", ev.detail.latLng.lng);
            MsetLat(ev.detail.latLng.lat);
            MsetLong(ev.detail.latLng.lng);
          }}
          defaultZoom={14}
          defaultCenter={{ lat: Lat, lng: Long }}
          mapId={process.env.REACT_APP_MAP_KEY}
        >
          {MLat && <AdvancedMarker position={{ lat: MLat, lng: MLong }} />}
        </Map>
      </div>
    </APIProvider>
  );
}
