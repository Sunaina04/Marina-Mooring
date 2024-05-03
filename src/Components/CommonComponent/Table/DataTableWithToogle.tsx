import React, { useState, useEffect } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'

interface Order {
  id: string
  productCode: string
  date: string
  amount: number
  quantity: number
  customer: string
  status: string
}

interface Product {
  id: string
  name: string
  noOfBoatYards: string
  totalMooringInventoried: string
  orders?: Order[]
}

const RowExpansionDemo: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [expandedRows, setExpandedRows] = useState<any>(undefined)

  useEffect(() => {
    const productsData = getProductsWithOrdersData()
    setProducts(productsData)
  }, [])

  const getProductsWithOrdersData = (): Product[] => {
    return [
      {
        id: '10000',
        name: 'Bamboo Watch',
        noOfBoatYards: '16',
        totalMooringInventoried: '15',
        orders: [
          {
            id: '1000-3',
            productCode: 'f230fh0g3',
            date: '2020-09-13',
            amount: 195,
            quantity: 3,
            customer: 'Claire Morrow',
            status: 'CANCELLED',
          },
        ],
      },
      {
        id: '10',
        name: 'Watch',
        noOfBoatYards: '12',
        totalMooringInventoried: '10',
        orders: [
          {
            id: '1000-3',
            productCode: 'f230fh0g3',
            date: '2020-09-13',
            amount: 195,
            quantity: 3,
            customer: 'Claire Morrow',
            status: 'CANCELLED',
          },
        ],
      },
    ]
  }

  const allowExpansion = (rowData: Product): boolean => {
    return !!rowData.orders && rowData.orders.length > 0
  }

  const rowExpansionTemplate = (data: Product) => {
    return (
      <div className="p-3">
        <DataTable value={data.orders}>
          <Column
            field="id"
            header="Id"
            style={{ width: '', backgroundColor: '#F2F2F2', borderBottom: '1px solid #C0C0C0' }}
          />
          <Column
            field="customer"
            header="Customer"
            style={{
              width: '10rem',
              backgroundColor: '#F2F2F2',
              borderBottom: '1px solid #C0C0C0',
            }}
          />
          <Column
            field="date"
            header="Date"
            style={{
              width: '10rem',
              backgroundColor: '#F2F2F2',
              borderBottom: '1px solid #C0C0C0',
            }}
          />
          <Column
            field="amount"
            header="Amount"
            style={{
              width: '10rem',
              backgroundColor: '#F2F2F2',
              borderBottom: '1px solid #C0C0C0',
            }}
            body={() => null}
          />
          <Column
            field="status"
            header="Status"
            style={{ width: '', backgroundColor: '#F2F2F2', borderBottom: '1px solid #C0C0C0' }}
            body={() => null}
          />
          <Column
            headerStyle={{ width: '4rem' }}
            style={{ width: '', backgroundColor: '#F2F2F2' }}
            body={() => null}
          />
        </DataTable>
      </div>
    )
  }

  return (
    <div className="card">
      <DataTable
        value={products}
        expandedRows={expandedRows}
        onRowToggle={(e) => setExpandedRows(e.data)}
        rowExpansionTemplate={rowExpansionTemplate}
        dataKey="id"
        tableStyle={{ fontSize: '' }}>
        <Column expander={allowExpansion} style={{ width: '2rem', backgroundColor: '#F2F2F2' }} />
        <Column
          field="id"
          header="ID"
          style={{
            width: '5rem',
            backgroundColor: '#F2F2F2',
            fontSize: '0.80rem',
            color: 'black',
            fontWeight: 'bold',
          }}
        />
        <Column
          field="name"
          header="Name"
          style={{
            width: '13rem',
            backgroundColor: '#F2F2F2',
            fontSize: '0.80rem',
            color: 'black',
            fontWeight: 'bold',
          }}
        />
        <Column
          field="noOfBoatYards"
          header="No.of Boatyards"
          style={{
            width: '10rem',
            backgroundColor: '#F2F2F2',
            fontSize: '0.80rem',
            color: 'black',
            fontWeight: 'bold',
          }}
        />
        <Column
          field="totalMooringInventoried"
          header="Total Mooring Inventoried"
          style={{
            width: '18rem',
            backgroundColor: '#F2F2F2',
            fontSize: '0.80rem',
            color: 'black',
            fontWeight: 'bold',
          }}
        />
      </DataTable>
    </div>
  )
}

export default RowExpansionDemo
