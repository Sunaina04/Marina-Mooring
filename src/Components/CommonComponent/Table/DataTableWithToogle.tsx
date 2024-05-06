import React from 'react'
import {
  DataTable,
  DataTableExpandedRows,
  DataTableRowData,
  DataTableRowExpansionTemplate,
  DataTableRowToggleEvent,
  DataTableValueArray,
} from 'primereact/datatable'
import { Column, ColumnBodyOptions } from 'primereact/column'

interface RowExpansionDemoProps {
  data: any[]
  rowExpansionTemplate?(
    data: DataTableRowData<any>,
    options: DataTableRowExpansionTemplate,
  ): React.ReactNode
  dataKey?: string | undefined
  tableStyle?: React.CSSProperties
  columns: {
    expander?: boolean | ((data: any, options: ColumnBodyOptions) => boolean)
    field: string
    header: string
    style?: React.CSSProperties
  }[]
  expandedRows?: DataTableValueArray | DataTableExpandedRows | undefined
  onRowToggle?(event: DataTableRowToggleEvent): void
}

const DataTableWithToogle: React.FC<RowExpansionDemoProps> = ({
  data,
  rowExpansionTemplate,
  dataKey,
  tableStyle,
  columns,
  expandedRows,
  onRowToggle,
}) => {
  return (
    <DataTable
      value={data}
      expandedRows={expandedRows}
      onRowToggle={onRowToggle}
      rowExpansionTemplate={rowExpansionTemplate}
      dataKey={dataKey}
      tableStyle={tableStyle}>
      {columns.map((col) => (
        <Column
          key={col.field}
          field={col.field}
          header={col.header}
          style={col.style}
          expander={col.expander}
        />
      ))}
    </DataTable>
  )
}

export default DataTableWithToogle
