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
  header?: any
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

export interface Order {
  id: string;
  productCode: string;
  date: string;
  amount: number;
  quantity: number;
  customer: string;
  status: string;
}

export interface Product {
  id: string;
  code: string;
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
  quantity: number;
  inventoryStatus: string;
  rating: number;
  orders?: Order[];
}