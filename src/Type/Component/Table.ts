import { ColumnBodyOptions, ColumnHeaderOptions } from 'primereact/column'
import { textColors } from '../../Components/Utils/Properties'
import { CSSProperties } from 'react'

export type TableBodyType = React.ReactNode | ((data: any, options: ColumnBodyOptions) => React.ReactNode)

export interface TableColumnProps {
  id: string | undefined
  label: String
  style?: React.CSSProperties | undefined
  body?: TableBodyType
}

export interface DataTableProps {
  data?: any[] 
  scrollable?: boolean
  columns: TableColumnProps[]
  tableStyle?: React.CSSProperties | undefined
  style?: React.CSSProperties | undefined
  header: any
  actionButtons?: ActionButtonColumnProps
}


export interface ButtonProps {
    underline?: boolean;
    color?: keyof typeof textColors
    filled?: boolean;
    disabled?: boolean,
    hidden?: boolean;
    onClick?: (data?: any) => void;
    label: string;
}

// Can be defined single in future 
export interface ActionButtonColumnProps {
    headerStyle: CSSProperties | undefined
    header?: React.ReactNode | ((options: ColumnHeaderOptions) => React.ReactNode);
    buttons? : ButtonProps[];
    style?: React.CSSProperties | undefined;
}
