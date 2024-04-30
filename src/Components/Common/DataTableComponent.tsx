import React from "react";
import { DataTable, DataTableValueArray } from "primereact/datatable";
import { Column } from "primereact/column";
 
interface TableCompProps {
  header: React.JSX.Element;
  //   column: React.ReactNode;
  field?: string;
  value: DataTableValueArray | undefined;
  tableStyle?: React.CSSProperties;
  scrollable?: boolean;
}
 
const DataTableComponent: React.FC<TableCompProps> = ({
  header,
  //   column,
  field,
  tableStyle,
  value,
  scrollable,
}) => {
  return (
    <div>
      <DataTable
        header={header}
        value={value}
        tableStyle={tableStyle}
        scrollable={scrollable}
      >
        {value &&
          Object.keys(value?.[0]).map((key) => {
            return (
              <Column
                key={key}
                field={key}
                header={key.split(/(?=[A-Z])/).map(word=> word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
                style={{ width: "4vw" }}
              />
            );
          })}
        {/* {column} */}
      </DataTable>
    </div>
  );
};
 
export default DataTableComponent;