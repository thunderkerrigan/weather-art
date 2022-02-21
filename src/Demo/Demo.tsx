import { Fade, Grid } from "@material-ui/core";
import React, { ReactElement, useEffect, useState } from "react";
import axios from "axios";
import _ from "lodash";
import { DateTime } from "luxon";
import { APICallResponse } from "../models/apiModel";
import { useParams } from "react-router";
const APIURL = process.env.REACT_APP_WEATHER_API_URL;

interface Color {
  R: number;
  G: number;
  B: number;
  direction: number;
}

export const Demo = (): ReactElement => {
  const [values, setValues] = useState<Color[]>([]);
  const { city, country } = useParams<{ city: string; country?: string }>();
  const makeURL = (
    city: string,
    startDate: DateTime = DateTime.now().minus({ days: 1 }).startOf("day"),
    endDate: DateTime = DateTime.now().minus({ days: 1 }).endOf("day")
  ) => {
    const formattedStartTime = startDate.toISODate();
    const formattedEndTime = endDate.toISODate();
    return `${APIURL}/${city}/${formattedStartTime}/${formattedEndTime}/`;
  };

  const scalesValues = (rawValues: number[]): number[] => {
    const min = Math.min(...rawValues);
    const normalized = rawValues.map((d) => d - min);
    const max = Math.max(...normalized);
    return normalized.map((d) => (d / max) * 255);
  };

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      if (!city) {
        return;
      }
      const url = makeURL(city);
      const { data } = await axios.get<APICallResponse>(url, {
        // TODO: handle country code
        params: {
          key: process.env.REACT_APP_WEATHER_API_KEY,
          unitGroup: "metric",
          include: "hours",
        },
      });
      if (isMounted && data.days !== undefined && data.days.length > 0) {
        const firstDay = data.days.shift();
        if (firstDay) {
          const radiationDailies = firstDay.hours.map(
            (h) => h.solarradiation || 0
          );
          const windDailies = firstDay.hours.map((h) => h.windspeed || 0);
          const pressureDailies = firstDay.hours.map((h) => h.pressure || 0);
          const windDirectionDailies = firstDay.hours.map(
            (h) => h.winddir || 0
          );
          const R = scalesValues(radiationDailies);
          const G = scalesValues(windDailies);
          const B = scalesValues(pressureDailies);
          const D = scalesValues(windDirectionDailies);
          // const G = scalesValues(radiationDailies);
          // const B = scalesValues(radiationDailies);
          const colors = _.zip(R, G, B, D).map((row) => ({
            R: row[0] || 0,
            G: row[1] || 0,
            B: row[2] || 0,
            direction: 0,
          }));
          // const trimmedGreyScales = greyScales.filter((d) => d !== 0);
          // setValues(trimmedGreyScales);
          setValues(colors);
        }
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
      <Grid container>
        <div
          style={{
            position: "absolute",
            width: "100vw",
            height: "100vh",
            zIndex: 100,
            backgroundColor: "transparent",
            backdropFilter: "sepia(1)",
          }}
        />
        {rows}
      </Grid>
    </Fade>
  );
};

const row = (value: Color, index: number, array: Color[]) => {
  let nextValue = value;
  if (index + 1 < array.length) {
    nextValue = array[index + 1];
  }
  console.log(value);
  return (
    <Grid
      item
      xs={12}
      key={index}
      style={{
        height: `${100 / array.length}vh`,
        backgroundImage: `linear-gradient( rgb(${value.R},${value.R},${value.R}), rgb(${nextValue.R},${nextValue.R},${nextValue.R}))`,
      }}
    ></Grid>
  );
};

// 17c5f74c42fb4d7283c181912212707

// NSEL
// ez3ccAaEXiZfslNEOsRNZSwUmreAI3JJbsfQUjoI

// Weatherbit.io
// 4ff81fbde1ea45ed8db17c27ebd39bc4
