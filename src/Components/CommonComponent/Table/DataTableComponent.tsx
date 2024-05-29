import React from 'react'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { DataTableProps } from '../../../Type/Components/TableTypes'
import DataTableButton from './DataTableButton'

const DataTableComponent: React.FC<DataTableProps> = ({
  data = [],
  scrollable = true,
  columns,
  rowStyle,
  tableStyle = undefined,
  header,
  actionButtons,
  onRowClick,
  style,
  emptyMessage
}) => {
  const buttonBody = (rowData: any) => {
    return (
      <div className="flex gap-4  ">
        {actionButtons?.buttons?.map((b, index) => (
          <DataTableButton
            {...b}
            key={index}
            data-testid="custom-element"
            onClick={() => {
              b.onClick && b.onClick(rowData)
            }}
          />
        ))}
      </div>
    )
  }

  const getRowStyle = (rowData: any) => {
    return rowStyle ? rowStyle(rowData) : {}
  }

  return (
    <div className="card ">
      <DataTable
        value={data}
        tableStyle={tableStyle}
        scrollable={scrollable}
        header={header}
        emptyMessage={emptyMessage}
        onRowClick={onRowClick}
        rowClassName={getRowStyle}>
        {columns?.map((d) => (
          <Column
            key={d.id}
            headerStyle={d.style}
            field={d.id}
            header={d.label}
            body={d.body}
            style={style}
          />
        ))}
        {actionButtons && (
          <Column
            header={actionButtons.header}
            body={(rowData) => buttonBody(rowData)}
            style={actionButtons.style}
            headerStyle={actionButtons.headerStyle}
          />
        )}
      </DataTable>
    </div>
  )
}

export default DataTableComponent
