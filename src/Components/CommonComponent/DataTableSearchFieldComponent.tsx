import React from 'react'
import { Column, ColumnBodyOptions, ColumnHeaderOptions } from 'primereact/column'
import { DataTable } from 'primereact/datatable'

type TableBodyType = React.ReactNode | ((data: any, options: ColumnBodyOptions) => React.ReactNode)

interface TableColumnProps {
  id: string | undefined
  label: String
  style?: React.CSSProperties | undefined
  body?: TableBodyType
}

interface DataTableCompProps {
  data?: any[] 
  scrollable?: boolean
  columns: TableColumnProps[]
  tableStyle?: React.CSSProperties | undefined
  actionbuttons?: TableBodyType[]
  style?: React.CSSProperties | undefined
  header: any
  actionHeader?:React.ReactNode | ((options: ColumnHeaderOptions) => React.ReactNode);
}

const DataTableSearchFieldComponent: React.FC<DataTableCompProps> = ({
  data = [],
  scrollable = true,
  columns,
  tableStyle = undefined,
  actionbuttons = [],
  style,
  header,
  actionHeader
}) => {
  return (
    <div className="card">
      <DataTable value={data} tableStyle={tableStyle} scrollable={scrollable} header={header}>
        {columns.map((d) => (
          <Column style={d.style} field={d.id} header={d.label} body={d.body} />
        ))}

        {actionbuttons.map((actionbutton) => (
          <Column header={actionHeader} body={actionbutton} style={style}></Column>
        ))}
      </DataTable>
    </div>
  )
}

export default DataTableSearchFieldComponent

