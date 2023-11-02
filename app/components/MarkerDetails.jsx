import { useEffect, useState } from "react";

export const MarkerDetails = (props) => {
  const { lng, lat } = props;

  const [coords, setCoords] = useState(null);

  useEffect(() => {
    console.log("hello there, ", props);
    if (props) {
      setCoords([props.lng, props.lat]);
    }
  }, []);

  return (
    `<div className="flex border border-red-600 w-12 h-12">
      You click here special: <br />
      [${props.lng}, ${props.lat}]
    </div>`
  );
}
