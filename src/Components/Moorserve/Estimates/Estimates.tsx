import { useState } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import ButtonComponent from '../../CommonComponent/ButtonComponent'
import CustomModal from '../../CustomComponent/CustomModal'
import AddCustomer from '../../Moormanage/Customer/AddCustomer'
import AddEstimates from './AddEstimates'
import { InputText } from 'primereact/inputtext'
import { EstimateProps } from '../../../Type/ComponentBasedType'

const Estimates = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [boatData, setBoatData] = useState<EstimateProps[]>([
    {
      customerId: '1',
      customerName: 'jon Smith',
      mooringId: '#75677',
      boatyard: 'pioneer',
      assigned: 'Clara Ortiz',
      duedate: '15,March 2024',
    },

    {
      customerId: '1',
      customerName: 'jon Smith',
      mooringId: '#75677',
      boatyard: 'pioneer',
      assigned: 'Clara Ortiz',
      duedate: '15,March 2024',
    },
    {
      customerId: '1',
      customerName: 'jon Smith',
      mooringId: '#75677',
      boatyard: 'pioneer',
      assigned: 'Clara Ortiz',
      duedate: '15,March 2024',
    },
    {
      customerId: '1',
      customerName: 'jon Smith',
      mooringId: '#75677',
      boatyard: 'pioneer',
      assigned: 'Clara Ortiz',
      duedate: '15,March 2024',
    },
  ])

  const handleButtonClick = () => {
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  const header = (
    <div className="flex flex-wrap align-items-center justify-between gap-2 p-4">
      <span className="text-xl font-bold">Estimate</span>
      <span
        style={{
          fontFamily: 'Lato',
          fontSize: '14px',
          fontWeight: 700,
          lineHeight: '16.8px',
          letterSpacing: '0.4837472140789032px',
          textAlign: 'right',
        }}>
        <div className="flex  items-center  ">
          <div>
            <div className="p-input-icon-left">
              <i className="pi pi-search text-[#D2D2D2]" />
              <InputText
                placeholder="Search"
                className="h-[5vh] cursor-pointer rounded-lg bg-white font-bold"
              />
            </div>
          </div>
        </div>
      </span>
    </div>
  )

  return (
    <>
      <div className="flex justify-between items-center ml-12">
        <div>
          <h1 className="mt-14 ml-[7.50vw] opacity-30 text-2xl font-normal">MOORSERVE/Estimates</h1>
        </div>
        <div className="flex gap-1 ml-[15rem] text-[gray] font-extrabold mt-14">
          <div>
            <img
              src="/assets/images/download.png"
              alt=""
              className="w-5 "
              style={{ filter: 'grayscale(100%)', color: 'gray' }}
            />
          </div>

          <div>
            <h1>DownLoad </h1>
          </div>

          <div></div>
        </div>
        <div className="items-center mr-[10rem] mt-14">
          <CustomModal
            data-testid="modal"
            onClick={handleButtonClick}
            visible={false}
            onHide={handleModalClose}>
            <AddEstimates />
          </CustomModal>
        </div>
      </div>
      <div className="bg-[#F2F2F2] rounded-xl border-[1px] border-[#D1D1D1] ml-40  mb-3 p-2 mt-12 w-[55vw]">
        <DataTable
          value={boatData}
          header={header}
          tableStyle={{
            fontSize: '0.80rem',
            fontWeight: 'bold',
          }}>
          <Column header="Customer ID" field="customerId" style={{ width: '5vw' }}></Column>
          <Column field="customerName" header="Customer Name" style={{ width: '8vw' }}></Column>
          <Column field="mooringId" header="Mooring ID" style={{ width: '9vw' }}></Column>
          <Column field="boatyard" header="Boatyard" style={{ width: '8vw' }}></Column>
          <Column field="assigned" header="Assigned to" style={{ width: '8vw' }}></Column>
          <Column field="duedate" header="Due date" style={{ width: '8vw' }}></Column>
          <Column
            header="Actions"
            body={() => (
              <div className="flex gap-4">
                <span className="text-black underline cursor-pointer">Convert</span>
                <span className="text-black underline cursor-pointer">Edit</span>
              </div>
            )}></Column>
        </DataTable>
      </div>
    </>
  )
}

export default Estimates
