import { useEffect, useMemo, useState } from 'react'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import AddWorkOrders from './AddWorkOrders'
import { ErrorResponse, WorkOrderPayload, WorkOrderResponse } from '../../../Type/ApiTypes'
import { useGetWorkOrdersMutation } from '../../../Services/MoorServe/MoorserveApi'
import DataTableSearchFieldComponent from '../../CommonComponent/Table/DataTableComponent'
import { ActionButtonColumnProps } from '../../../Type/Components/TableTypes'
import Header from '../../Layout/LayoutComponents/Header'
import './WorkOrder.module.css'
import { vendor } from '../../Utils/CustomData'
import { InputText } from 'primereact/inputtext'

const WorkOrders = () => {
  const [visible, setVisible] = useState(false)
  const [workOrderData, setWorkOrderData] = useState<WorkOrderPayload[]>([])
  const [selectedCustomer, setSelectedCustomer] = useState<any>(undefined)
  const [editMode, setEditMode] = useState(false)
  const [getWorkOrder] = useGetWorkOrdersMutation()

  const ActionButtonColumn: ActionButtonColumnProps = {
    header: '',
    buttons: [
      {
        color: 'black',
        label: 'Edit',
        underline: true,
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
      {
        id: 'status',
        label: 'Status',
        style: columnStyle,
      },
    ],
    [],
  )

  const getWorkOrderData = async () => {
    try {
      const response = await getWorkOrder({}).unwrap()
      const { status, content } = response as WorkOrderResponse
      if (status === 200 && Array.isArray(content)) {
        setWorkOrderData(content)
      }
    } catch (error) {
      const { message } = error as ErrorResponse
      console.error('Error fetching work order data:', error)
    }
  }

  const handleEdit = (rowData: any) => {
    setSelectedCustomer(rowData)
    setEditMode(true)
    setVisible(true)
  }

  useEffect(() => {
    getWorkOrderData()
  }, [])

  return (
    <>
      <Header header="MOORSERVE/Work Orders" />

      <div className="">
        <div className="flex justify-end mr-16 mt-14">
          <div>
            <Button
              label={'Create New'}
              onClick={() => setVisible(true)}
              style={{
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
                boxShadow: 'none',
              }}></Button>

            <Dialog
              header={''}
              visible={visible}
              modal={false}
              style={{ width: '50vw' }}
              onHide={() => setVisible(false)}>
              <AddWorkOrders
                workOrderData={selectedCustomer}
                editMode={editMode}
                setVisible={setVisible}
              />
            </Dialog>
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
                  placeholder="Search"
                  className="pl-10 w-[237px] bg-[#00426F] h-[35px] rounded-lg border border-[#D5E1EA] placeholder:text-[#FFFFFF] text-[#FFFFFF] focus:outline-none"
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
            data={undefined}
            columns={workOrderColumns}
            actionButtons={ActionButtonColumn}
            style={{ borderBottom: '1px solid #D5E1EA', fontWeight: '200' }}
          />
        </div>
      </div>
    </>
  )
}

export default WorkOrders
