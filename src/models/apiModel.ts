export interface hourlyData {
  timezone: string;
  state_code: string;
  country_code: string;
  lat: number;
  lon: number;
  city_name: string;
  station_id: string;
  data: {
    rh: number;
    wind_spd: number;
    timestamp_utc: string;
    pod: string;
    slp: number;
    app_temp: number;
    elev_angle: number;
    solar_rad: number;
    pres: number;
    h_angle: number;
    dewpt: number;
    snow: number;
    uv: number;
    azimuth: number;
    wind_dir: number;
    weather: { icon: string; code: number; description: string };
    ghi: number;
    dhi: number;
    timestamp_local: string;
    vis: number;
    dni: number;
    datetime: string;
    temp: number;
    precip: number;
    clouds: number;
    ts: number;
  }[];
  sources: string[];
  city_id: string;
}
