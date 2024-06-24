import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import AddWorkOrders from './AddWorkOrders'
import { ErrorResponse, WorkOrderPayload, WorkOrderResponse } from '../../../Type/ApiTypes'
import { useGetWorkOrdersMutation } from '../../../Services/MoorServe/MoorserveApi'
import DataTableSearchFieldComponent from '../../CommonComponent/Table/DataTableComponent'
import { ActionButtonColumnProps } from '../../../Type/Components/TableTypes'
import Header from '../../Layout/LayoutComponents/Header'
import './WorkOrder.module.css'
import { boatyardMooring, vendor } from '../../Utils/CustomData'
import { InputText } from 'primereact/inputtext'
import DataTableComponent from '../../CommonComponent/Table/DataTableComponent'
import CustomModal from '../../CustomComponent/CustomModal'
import { useSelector } from 'react-redux'
import { selectCustomerId } from '../../../Store/Slice/userSlice'
import { Toast } from 'primereact/toast'
import { Params } from '../../../Type/CommonType'
import { ProgressSpinner } from 'primereact/progressspinner'

const WorkOrders = () => {
  const selectedCustomerId = useSelector(selectCustomerId)
  const [visible, setVisible] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [workOrderData, setWorkOrderData] = useState<WorkOrderPayload[]>([])
  const [selectedCustomer, setSelectedCustomer] = useState<any>(undefined)
  const [editMode, setEditMode] = useState(false)
  const [getWorkOrder] = useGetWorkOrdersMutation()
  const toast = useRef<Toast>(null)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
  }

  const ActionButtonColumn: ActionButtonColumnProps = {
    header: '',
    buttons: [
      {
        color: 'black',
        label: 'Edit',
        underline: true,
        onClick: (row) => handleEdit(row),
      },
    ],
    headerStyle: { backgroundColor: '#FFFFFF' },
    style: { borderBottom: '1px solid #D5E1EA', backgroundColor: '#FFFFFF', fontWeight: '400' },
  }

  const columnStyle = {
    backgroundColor: '#FFFFFF',
    color: '#000000',
    fontWeight: '500',
    fontSize: '12px',
  }

  const firstLastName = (data: any) => {
    return data.customerResponseDto.firstName + ' ' + data.customerResponseDto.lastName
  }

  const workOrderColumns = useMemo(
    () => [
      {
        id: 'customerResponseDto.customerId',
        label: 'Customer ID',
        style: columnStyle,
      },
      {
        id: 'firstName',
        label: 'CustomerName',
        style: columnStyle,
        body: firstLastName,
      },
      {
        id: 'mooringResponseDto.mooringNumber',
        label: 'Mooring Number',
        style: columnStyle,
      },
      {
        id: 'boatyardResponseDto.boatyardId',
        label: 'Boatyard',
        style: columnStyle,
      },
      {
        id: 'technicianUserResponseDto.name',
        label: 'Assigned to',
        style: columnStyle,
      },
      {
        id: 'dueDate',
        label: 'Due Date',
        style: columnStyle,
      },
      {
        id: 'workOrderStatusDto.status',
        label: 'Status',
        style: columnStyle,
      },
    ],
    [],
  )

  const getWorkOrderData = useCallback(async () => {
    setIsLoading(true)
    try {
      let params: Params = {}
      if (searchText) {
        params.searchText = searchText
      }
      const response = await getWorkOrder(params).unwrap()
      const { status, content, message } = response as WorkOrderResponse
      if (status === 200 && Array.isArray(content)) {
        setWorkOrderData(content)
        setIsLoading(false)
      } else {
        setIsLoading(false)
        toast?.current?.show({
          severity: 'error',
          summary: 'Error',
          detail: message,
          life: 3000,
        })
      }
    } catch (error) {
      const { message: msg } = error as ErrorResponse
      console.error('Error occurred while fetching customer data:', msg)
    }
  }, [searchText, selectedCustomerId])

  const handleEdit = (rowData: any) => {
    setSelectedCustomer(rowData)
    setEditMode(true)
    setVisible(true)
  }

  const handleModalClose = () => {
    setVisible(false)
    setEditMode(false)
    getWorkOrderData()
  }
  const handleButtonClick = () => {
    setVisible(true)
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      getWorkOrderData()
    }, 600)
    return () => clearTimeout(timeoutId)
  }, [searchText, selectedCustomerId])

  return (
    <div 
    
    className={visible ? 'backdrop-blur-lg' : ''}>
      <Header header="MOORSERVE/Work Orders" />
      <Toast ref={toast} />
      <div className="">
        <div className="flex justify-end mr-16 mt-10">
          <div>
            <CustomModal
              buttonText={'Create New'}
              children={
                <AddWorkOrders
                  workOrderData={selectedCustomer}
                  editModeWorkOrder={editMode}
                  setVisible={setVisible}
                  toastRef={toast}
                  closeModal={handleModalClose}
                />
              }
              headerText={<h1 className="text-xl font-extrabold text-black ml-4">Work Order</h1>}
              visible={visible}
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
            height: '713px',
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
              Work Order
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
                  value={searchText}
                  onChange={handleSearch}
                  placeholder="Search"
                  id="placeholder"
                  className="pl-10 w-[237px] bg-[#00426F] h-[35px] rounded-lg border text-[white] border-[#D5E1EA] placeholder:text-[#FFFFFF]  focus:outline-none"
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
            data={workOrderData}
            columns={workOrderColumns}
            actionButtons={ActionButtonColumn}
            style={{ borderBottom: '1px solid #D5E1EA', fontWeight: '400' }}
            emptyMessage={
              <div className="text-center mt-40">
                <img
                  src="/assets/images/empty.png"
                  alt="Empty Data"
                  className="w-28 mx-auto mb-4"
                />
                <p className="text-gray-500">No data available</p>
              </div>
            }
          />

          {isLoading && (
            <ProgressSpinner
              style={{
                position: 'absolute',
                top: '50%',
                left: '60%',
                transform: 'translate(-50%, -50%)',
                width: '50px',
                height: '50px',
              }}
              strokeWidth="4"
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default WorkOrders
