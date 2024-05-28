import React from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { RowExpansionDemoProps } from '../../../Type/Components/TableTypes'

const DataTableWithToogle: React.FC<RowExpansionDemoProps> = ({
  data,
  rowExpansionTemplate,
  dataKey,
  tableStyle,
  columns,
  onRowClick,
  expandedRows,
  onRowToggle,
  emptyMessage
}) => {
  const generateRandomKey = () => {
    return Math.random().toString(36).substring(7)
  }
  return (
    <DataTable
      value={data}
      expandedRows={expandedRows}
      onRowToggle={onRowToggle}
      rowExpansionTemplate={rowExpansionTemplate}
      dataKey={dataKey}
      onRowClick={onRowClick}
      tableStyle={tableStyle}
      emptyMessage={emptyMessage}
      >
      {columns.map((col) => (
        <Column
          key={generateRandomKey()}
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
