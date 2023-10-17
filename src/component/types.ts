import React from "react";
export interface IColumnConfig<T> {
  align?: "start" | "center" | "end";
  defaultSortDesc?: boolean;
  hidden?: boolean;
  hoverTitle?: string;
  renderCell?: (
    rowData: T,
    dataIndex: number,
    rowIndex: number
  ) => React.ReactElement | null;
  renderData?: (rowData: T, dataIndex: number) => string;
  sort?: (a: T, b: T, sortAsc: boolean) => number;
  sortByValue?: boolean;
  sortable?: boolean;
  title?: string | React.ReactElement;
  width?: number;
  order?: number;
  isFilterable?: boolean;
  dateFormat?: string;
}

export interface IRenderData {
  _index: number;
  // @todo remove | any
  [key: string]: string | any;
}
