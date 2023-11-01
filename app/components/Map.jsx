"use client";
import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken =
  "pk.eyJ1Ijoic3VwZXJnYWxhY3RpcHVzIiwiYSI6ImNsbzkwcWtrdDA1bngya21rMm1la2Q2NXMifQ.sDlPzxnnduARjS7IFc7rjQ";

export default function Map() {
  const mapContainer = useRef(null);
  const [lng, setLng] = useState(-93.699346);
  const [lat, setLat] = useState(39.927905);
  const [zoom, setZoom] = useState(13);
  const [projection, setProjection] = useState("globe");
  const [style, setStyle] = useState(
    "mapbox://styles/mapbox/satellite-streets-v11"
  );

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: style,
      center: [lng, lat],
      zoom: zoom,
      projection: projection,
    });

    const popup = new mapboxgl.Popup({ offset: 25 }).setText("I'm a popup");

    const marker = new mapboxgl.Marker({ color: "red", scale: 1.0 })
      .setLngLat([-93.701786, 39.915073])
      .setPopup(popup)
      .addTo(map);
    map.addControl(new mapboxgl.NavigationControl(), "top-right");
  }, []);

  return (
    <div className="flex h-full w-full">
      <div ref={mapContainer} className="map-container w-full" />
    </div>
  );
}
