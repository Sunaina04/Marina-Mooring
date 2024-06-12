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
  emptyMessage,
  selectionMode,
  onSelectionChange,
  selection,
  dataKey,
}) => {
  const buttonBody = (rowData: any) => {
    return (
      <div className="flex gap-4">
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

  const getRowClassName = (rowData: any) => {
    return {
      'p-highlight': selection && selection.id === rowData.id,
    }
  }

  return (
    <div className="card">
      <DataTable
        value={data}
        selectionMode={selectionMode}
        selection={selection}
        onSelectionChange={onSelectionChange}
        dataKey={dataKey}
        tableStyle={tableStyle}
        scrollable={scrollable}
        header={header}
        emptyMessage={emptyMessage}
        onRowClick={onRowClick}
        rowClassName={getRowClassName}>
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
            body={buttonBody}
            style={actionButtons.style}
            headerStyle={actionButtons.headerStyle}
          />
        )}
      </DataTable>
    </div>
  )
}

export default DataTableComponent
