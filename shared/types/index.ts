export type DataItem = {
  name: string;
  value: number;
};

export enum ChartType {
  PIE = "pie",
  BAR = "bar",
}

type Endpoint = {
  key: string;
  table: string;
  select: string;
  chartType: ChartType;
};

export type EndpointsType = {
  [key: string]: Endpoint[];
};

