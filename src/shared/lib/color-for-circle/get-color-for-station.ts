import { stationToColorMap } from "../../../app/config/config";

// Define the type for the stationToColorMap
type StationColorMap = {
  [key: string]: string;
};

// Assert the type of stationToColorMap
const typedStationToColorMap = stationToColorMap as StationColorMap;

export const getColorForStation = (station: string): string => {
  return typedStationToColorMap[station] || '#D9001B';
}