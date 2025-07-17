import React from "react";
import { DataTable } from "./data-table";
import { ColumnDef } from "@tanstack/react-table";

interface DataTableProps<TData, TValue> {
  title:string
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  filterColumn:string
}

function DataTableView<TData, TValue>({ columns, data , title, filterColumn}:DataTableProps<TData, TValue>) {
  return (
    <div className="py-3 pl-1 row-span-1">
      <h1 className="leading-none font-semibold mb-2">{title} Table</h1>
      <div className="w-full overflow-x-auto">
        <div className="w-min sm:min-w-[700px] md:min-w-[900px] lg:min-w-[1150px]">
          <DataTable columns={columns} data={data} filterColumnName={title.toLowerCase()} filterColumn={filterColumn} />
        </div>
      </div>
    </div>
  );
}

export default DataTableView;
