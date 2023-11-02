"use client";
import React, { useRef } from "react";
import { useMap } from "../hooks/useMap";

export default function MapView() {
  const mapContainerRef = useRef(null);
  useMap(mapContainerRef);

  return (
    <div className="flex h-full w-full">
      <div ref={mapContainerRef} className="map-container w-full" />
    </div>
  );
}


