import { Fade, Grid, Slide } from "@material-ui/core";
import React, { ReactElement, useEffect, useState } from "react";
import axios from "axios";
import { DateTime } from "luxon";
import { hourlyData } from "../models/apiModel";
import { useParams } from "react-router";

const APIURL = "https://api.weatherbit.io/v2.0/history/hourly";

export const Demo = (): ReactElement => {
  const [values, setValues] = useState<number[]>([]);
  const { city, country } = useParams<{ city: string; country?: string }>();
  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      const { data } = await axios.get<hourlyData>(APIURL, {
        params: {
          key: "4ff81fbde1ea45ed8db17c27ebd39bc4",
          city,
          country,
          start_date: DateTime.now()
            .minus({ days: 2 })
            .startOf("day")
            .toISODate(),
          end_date: DateTime.now().minus({ days: 1 }).endOf("day").toISODate(),
        },
      });
      if (isMounted && data.data !== undefined) {
        const dailies = data.data.map((d) => d.solar_rad);
        const min = Math.min(...dailies);
        const normalizedDailies = dailies.map((d) => d - min);
        const max = Math.max(...normalizedDailies);
        const greyScales = normalizedDailies.map((d) => (d / max) * 255);
        // const trimmedGreyScales = greyScales.filter((d) => d !== 0);
        // setValues(trimmedGreyScales);
        setValues(greyScales);
      }
    };
    fetchData();
    return () => {
      isMounted = false;
    };
  }, [city, country]);
  // ?city=Paris&country=FR&start_date=2021-07-21&end_date=2021-07-22&units=S&lang=fr&tz=local&key=4ff81fbde1ea45ed8db17c27ebd39bc4

  const rows = values.map(row);
  return (
    <Fade in={rows.length > 0}>
      <Grid container>{rows}</Grid>
    </Fade>
  );
};

const row = (value: number, index: number, array: number[]) => {
  let nextValue = value;
  if (index + 1 < array.length) {
    nextValue = array[index + 1];
  }
  return (
    <Grid
      item
      xs={12}
      key={index}
      style={{
        height: `${100 / array.length}vh`,
        backgroundImage: `linear-gradient(rgb(${value},${value},${value}), rgb(${nextValue},${nextValue},${nextValue}))`,
      }}
    ></Grid>
  );
};

// 17c5f74c42fb4d7283c181912212707

// NSEL
// ez3ccAaEXiZfslNEOsRNZSwUmreAI3JJbsfQUjoI

// Weatherbit.io
// 4ff81fbde1ea45ed8db17c27ebd39bc4
