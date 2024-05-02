import { useMemo, useState } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import CustomModal from '../../CustomComponent/CustomModal'
import { MoorPayProps } from '../../../Type/ComponentBasedType'
import DataTableSearchFieldComponent from '../../CommonComponent/DataTableSearchFieldComponent'
import AddCustomer from '../../Moormanage/Customer/AddCustomer'


const AccountRecievable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [accountRecievableData, setAccountRecievableData] = useState<MoorPayProps[]>([
    {
      invoice: '#425',
      mooringid: '#6658',
      name: 'John Smith',
      technicianName: 'jim Carry',
      services: 'Regular Services',
      time: '2hrs',
      amount: '$12',
    },

    {
      invoice: '#425',
      mooringid: '#6658',
      name: 'John Smith',
      technicianName: 'jim Carry',
      services: 'Regular Services',
      time: '2hrs',
      amount: '$12',
    },
    {
      invoice: '#425',
      mooringid: '#6658',
      name: 'John Smith',
      technicianName: 'jim Carry',
      services: 'Regular Services',
      time: '2hrs',
      amount: '$12',
    },
    {
      invoice: '#425',
      mooringid: '#6658',
      name: 'John Smith',
      technicianName: 'jim Carry',
      services: 'Regular Services',
      time: '2hrs',
      amount: '$12',
    },
  ])

  const handleButtonClick = () => {
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  const header = (
    <div className="flex flex-wrap align-items-center justify-between gap-2 ">
      <span className="text-xl font-bold">Account Recievable</span>
    </div>
  )

  const tableColumns = useMemo(
    () => [
      {
        id: 'invoice',
        label: 'Invoice',
        style: { width: '6vw', backgroundColor: '#F2F2F2' },
      },
      {
        id: 'mooringId',
        label: 'Mooring ID',
        style: { width: '12vw', backgroundColor: '#F2F2F2' },
      },
      {
        id: 'customerName',
        label: 'Customer Name',
        style: { width: '10vw', backgroundColor: '#F2F2F2' },
      },
      {
        id: 'technicianName',
        label: 'Technician Name',
        style: { width: '12vw', backgroundColor: '#F2F2F2' },
      },
      {
        id: 'services',
        label: 'Services',
        style: { width: '10vw', backgroundColor: '#F2F2F2' },
      },
      {
        id: 'time',
        label: 'Time',
        style: { width: '10vw', backgroundColor: '#F2F2F2' },
      },
      {
        id: 'amount',
        label: 'Amount',
        style: { width: '10vw', backgroundColor: '#F2F2F2' },
      },
    ],
    [],
  )

  const actionButtons = [
    () => (
      <>
        <div className="flex ">
          <div className="flex gap-4">
            <span className="text-green-500  bg-green-100 cursor-pointer">Approve</span>
            <span className="text-red-500  bg-red-100 cursor-pointer">Deny</span>
          </div>
        </div>
      </>
    ),
  ]

  return (
    <>
      <div className="flex justify-between items-center ml-12">
        <div>
          <h1 className="mt-14 ml-8 opacity-30 text-2xl font-normal">
            Moormanage/Account Receivable
          </h1>
        </div>

        <div className="flex gap-1 ml-[18rem] text-[gray] font-extrabold mt-14">
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

          <div></div>
        </div>
        <div className="items-center mr-[10rem] mt-14">
          <CustomModal
            onClick={handleButtonClick}
            visible={false}
            onHide={handleModalClose}
            header={header}>
            <AddCustomer
              customer={undefined}
              editMode={false}
              closeModal={() => {}}
              getCustomer={() => {}}
            />
          </CustomModal>
        </div>
      </div>

      <div className="bg-[F2F2F2] rounded-md border-[1px] border-gray-300 w-[67vw]  ml-32 mb-80">
        <DataTableSearchFieldComponent
          tableStyle={{
            fontSize: '12px',
            color: '#000000',
            fontWeight: 600,
          }}
          data={accountRecievableData}
          columns={tableColumns}
          header={header}
          actionbuttons={actionButtons}
          actionHeader={'Action'}
          style={{ backgroundColor: '#F2F2F2' }}
        />
      </div>
    </>
  )
}

export default AccountRecievable
