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
import AddWorkOrders from '../WorkOrders/AddWorkOrders'

const Estimates = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState<any>(undefined)
  const [editMode, setEditMode] = useState(false)

  const handleButtonClick = () => {
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

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
    <div className={isModalOpen ? 'backdrop-blur-lg' : ''}>
      <Header header="MOORSERVE/Estimates" />
      <div className="flex justify-end gap-6 mt-10 mr-16">
        <div className="flex text-gray-600 mt-3 font-extrabold">
          <div className="">
            <img src="/assets/images/Group.png" alt="" className="w-24 font-bold" />
          </div>
        </div>
        <div className="items-center">
          <CustomModal
            buttonText={'ADD NEW'}
            children={
              <AddWorkOrders
                workOrderData={selectedCustomer}
                editMode={editMode}
                setVisible={setIsModalOpen}
              />
            }
            headerText={<h1 className="text-xl font-extrabold text-black ml-4">Estimate Form</h1>}
            visible={isModalOpen}
            onClick={handleButtonClick}
            onHide={handleModalClose}
            buttonStyle={{
              width: '121px',
              height: '44px',
              minHeight: '44px',
              backgroundColor: '#0098FF',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 600,
              color: 'white',
              borderRadius: '0.50rem',
              marginLeft: '8px',
              boxShadow: 'none',
            }}
            dialogStyle={{
              width: '851px',
              height: '526px',
              borderRadius: '1rem',
            }}
          />
        </div>
      </div>

      <div
        style={{
          height: '712px',
          gap: '0px',
          borderRadius: '10px',
          border: '1px solid #D5E1EA',
          opacity: '0px',
          backgroundColor: '#FFFFFF',
        }}
        className="bg-[F2F2F2]  ml-12  mt-6 mr-14">
        <div className="flex flex-wrap align-items-center justify-between  bg-[#00426F] p-2   rounded-tl-[10px] rounded-tr-[10px]">
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
                id="placeholder"
                placeholder="Search"
                className="pl-10 w-[237px] 
                  bg-[#00426F]
              
                  h-[35px] rounded-lg border text-white border-[#D5E1EA] focus:outline-none"
              />
            </div>
          </div>
        </div>

        <DataTableComponent
          tableStyle={{
            fontSize: '12px',
            color: '#000000',
            fontWeight: 600,
            backgroundColor: '#D9D9D9',
            cursor: 'pointer',
          }}
          data={EstimateData}
          columns={workOrderColumns}
          actionButtons={ActionButtonColumn}
          style={{ borderBottom: '1px solid #D5E1EA', fontWeight: '400' }}
          emptyMessage={
            <div className="text-center mt-40">
              <img src="/assets/images/empty.png" alt="Empty Data" className="w-28 mx-auto mb-4" />
              <p className="text-gray-500">No data available</p>
            </div>
          }
        />
      </div>
    </div>
  )
}

export default Estimates
