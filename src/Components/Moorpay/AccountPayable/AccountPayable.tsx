import { useMemo, useState } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import CustomModal from '../../CustomComponent/CustomModal'
import { MoorPayProps } from '../../../Type/ComponentBasedType'
import DataTableSearchFieldComponent from '../../CommonComponent/Table/DataTableComponent'
import { ActionButtonColumnProps } from '../../../Type/Components/TableTypes'
import Header from '../../Layout/LayoutComponents/Header'
import AddCustomer from '../../Moormanage/Customer/AddCustomer'

interface TableColumn {
  id: string
  label: string
  style: {
    width: string
    backgroundColor: string
  }
}

type TableColumns = TableColumn[]
const AccountPayable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [accountPayableData, setAccountPayableData] = useState<MoorPayProps[]>([
    {
      invoice: '#425',
      mooringId: '#6658',
      customerName: 'John Smith',
      technicianName: 'jim Carry',
      services: 'Regular Services',
      time: '2hrs',
      amount: '$12',
    },

    {
      invoice: '#425',
      mooringId: '#6658',
      customerName: 'John Smith',
      technicianName: 'jim Carry',
      services: 'Regular Services',
      time: '2hrs',
      amount: '$12',
    },
    {
      invoice: '#425',
      mooringId: '#6658',
      customerName: 'John Smith',
      technicianName: 'jim Carry',
      services: 'Regular Services',
      time: '2hrs',
      amount: '$12',
    },
    {
      invoice: '#425',
      mooringId: '#6658',
      customerName: 'John Smith',
      technicianName: 'jim Carry',
      services: 'Regular Services',
      time: '2hrs',
      amount: '$12',
    },
  ])

  const handleButtonClick = () => {
    //setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  const tableColumns: TableColumns = useMemo<TableColumns>(
    () => [
      {
        id: 'customerId',
        label: 'Customer ID',
        style: { width: '6vw', backgroundColor: '#F2F2F2' },
      },
      {
        id: 'mooringId',
        label: 'Mooring ID',
        style: { width: '12vw', backgroundColor: '#F2F2F2' },
      },
      {
        id: 'boatyard',
        label: 'Boatyard',
        style: { width: '10vw', backgroundColor: '#F2F2F2' },
      },
      {
        id: 'assignedTo',
        label: 'Assigned to',
        style: { width: '12vw', backgroundColor: '#F2F2F2' },
      },
      {
        id: 'status',
        label: 'Status',
        style: { width: '10vw', backgroundColor: '#F2F2F2' },
      },
    ],
    [],
  )

  const CustomersHeader = () => {
    return (
      <div className="flex items-center">
        <div className="">
          <h1>Account Payable</h1>
        </div>
      </div>
    )
  }

  const ActionButtonColumn: ActionButtonColumnProps = {
    header: 'Action',
    buttons: [
      {
        color: 'green',
        label: 'Paid',
        filled: true,
      },
    ],
    headerStyle: { backgroundColor: '#F2F2F2' },
  }

  return (
    <>
      <Header header="MOORPAY/Account Payable" />
      <div className="flex justify-end gap-4 mr-16">
        <div className="flex  text-blue-900 font-extrabold mt-14">
          <div>
            <img
              src="/assets/images/download.png"
              alt=""
              className="w-5 "
              style={{ filter: 'grayscale(100%)', color: 'gray' }}
            />
          </div>
          <div>
            <h1>DownLoad Excel</h1>
          </div>
        </div>

        <div className="mt-14">
          <CustomModal
            buttonText={'ADD NEW'}
            children={
              <AddCustomer
                customer={undefined}
                editMode={false}
                closeModal={() => {}}
                getCustomer={() => {}}
              />
            }
            headerText={<h1 className="text-xl font-extrabold text-black ml-4">New User</h1>}
            visible={isModalOpen}
            onClick={handleButtonClick}
            onHide={handleModalClose}
            buttonStyle={{
              width: '121px',
              height: '44px',
              minHeight: '44px',
              backgroundColor: '#0098FF',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 700,
              color: 'white',
              borderRadius: '0.50rem',
              marginLeft: '8px',
            }}
            dialogStyle={{
              width: '800px',
              minWidth: '800px',
              height: '630px',
              minHeight: '630px',
              borderRadius: '1rem',
              maxHeight: '95% !important',
            }}
          />
        </div>
      </div>

      <div className="bg-[F2F2F2] rounded-md border-[1px] border-gray-300 w-[67vw]  ml-32 mb-80">
        <DataTableSearchFieldComponent
          tableStyle={{
            fontSize: '12px',
            color: '#000000',
            fontWeight: 600,
          }}
          data={accountPayableData}
          columns={tableColumns}
          header={CustomersHeader}
          actionButtons={ActionButtonColumn}
          style={{ backgroundColor: '#F2F2F2' }}
        />
      </div>
    </>
  )
}

export default AccountPayable
