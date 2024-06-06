import { useMemo, useState } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import CustomModal from '../../CustomComponent/CustomModal'
import AddEstimates from './AddEstimates'
import { InputText } from 'primereact/inputtext'
import { EstimateProps } from '../../../Type/ComponentBasedType'
import DataTableSearchFieldComponent from '../../CommonComponent/Table/DataTableComponent'
import { ActionButtonColumnProps } from '../../../Type/Components/TableTypes'
import DataTableComponent from '../../CommonComponent/Table/DataTableComponent'
import Header from '../../Layout/LayoutComponents/Header'
import { EstimateData } from '../../Utils/CustomData'

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
    //  setIsModalOpen(true)
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

  const columnStyle = {
    backgroundColor: '#FFFFFF',
    color: '#000000',
    fontWeight: '500',
    fontSize: '12px',
  }

  const workOrderColumns = useMemo(
    () => [
      {
        id: 'customerId',
        label: 'Customer ID',
        style: columnStyle,
      },
      {
        id: 'customerName',
        label: 'CustomerName',
        style: columnStyle,
      },
      {
        id: 'mooringId',
        label: 'Mooring ID',
        style: columnStyle,
      },
      {
        id: 'boatyard',
        label: 'Boatyard',
        style: columnStyle,
      },
      {
        id: 'assigned',
        label: 'Assigned to',
        style: columnStyle,
      },
      {
        id: 'dueDate',
        label: 'Due Date',
        style: columnStyle,
      },
    ],
    [],
  )

  const ActionButtonColumn: ActionButtonColumnProps = {
    header: 'Action',
    buttons: [
      {
        color: 'black',
        label: 'Convert',
        underline: true,
      },

      {
        color: 'black',
        label: 'Edit',
        underline: true,
      },
    ],
    headerStyle: { backgroundColor: '#FFFFFF', color: '#000000', fontWeight: '500' },
    style: { borderBottom: '1px solid #D5E1EA', backgroundColor: '#FFFFFF', fontWeight: '400' },
  }

  return (
    <>
      <Header header="MOORSERVE/Estimates" />

      {/* <div className="flex justify-end gap-6 mt-14 mr-16">
        <div className="flex text-blue-900 font-extrabold">
          <div>
            <img
              src="/assets/images/download.png"
              alt=""
              className="w-5"
              style={{ filter: 'grayscale(100%)', color: 'blue' }}
            />
          </div>

          <div>
            <h1>DownLoad </h1>
          </div>

          <div></div>
        </div>
        <div className="items-center">
          <CustomModal
            buttonText={'ADD NEW'}
            children={<AddEstimates />}
            headerText={<h1 className="text-xl font-extrabold text-black ml-4">New User</h1>}
            visible={false}
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

      <div
        style={{
          height: '640px',
          gap: '0px',
          borderRadius: '10px',
          border: '1px solid #D5E1EA',
          opacity: '0px',
          backgroundColor: '#FFFFFF',
        }}
        className="bg-[F2F2F2]  ml-12  mt-6 mr-14">
        <div className="flex flex-wrap align-items-center justify-between  bg-[#00426F] p-2   rounded-tl-[5px] rounded-tr-[5px]">
          <span
            style={{
              fontSize: '18px',
              fontWeight: '700',
              lineHeight: '21.09px',
              letterSpacing: '0.4837472140789032px',
              color: '#FFFFFF',
              padding: '8px',
            }}>
            Estimate
          </span>

          <div className="relative inline-block">
            <div className="relative">
              <img
                src="/assets/images/Search.png"
                alt="search icon"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
                data-testid="search-icon"
              />
              <InputText
                placeholder="Search"
                className="pl-10 w-[237px] 
                  bg-[#00426F]
              
                  h-[35px] rounded-lg border text-white border-[#D5E1EA] focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="text-center mt-40">
          <img src="/assets/images/empty.png" alt="Empty Data" className="w-32 mx-auto mb-4" />
          <p className="text-gray-500">No data available</p>
        </div>

        <DataTableSearchFieldComponent
          tableStyle={{
            fontSize: '12px',
            color: '#000000',
            fontWeight: 600,
          }}
          data={EstimateData}
          columns={workOrderColumns}
          actionButtons={ActionButtonColumn}
          style={{ borderBottom: '1px solid #D5E1EA', fontWeight: '200' }}
        />
      </div> */}
    </>
  )
}

export default Estimates
