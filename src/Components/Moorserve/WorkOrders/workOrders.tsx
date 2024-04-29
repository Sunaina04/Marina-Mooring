import { useEffect, useMemo, useState } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import ButtonComponent from '../../Common/ButtonComponent'
import CustomModal from '../../customComponent/CustomModal'
import { InputText } from 'primereact/inputtext'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import AddWorkOrders from './AddWorkOrders'
import { WorkOrder_PAYLOAD, WorkOrder_RESPONSE } from '../../../Services/MoorServe/types'
import { useGetWorkOrdersMutation } from '../../../Services/MoorServe/moorserve'
import DataTableSearchFieldComponent from '../../Common/ DataTableSearchFieldComponent'
interface TableColumn {
  id: string
  label: string
  style: React.CSSProperties
}

type TableColumns = TableColumn[]

const WorkOrders = () => {
  const [visible, setVisible] = useState(false)
  const [workOrderData, setWorkOrderData] = useState<WorkOrder_PAYLOAD[]>([])
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null)

  const [editMode, setEditMode] = useState(false)
  const [getWorkOrder] = useGetWorkOrdersMutation()

  const header = (
    <div className="flex flex-wrap align-items-center justify-between  p-4">
      <span className="text-xl font-bold">Work Orders</span>
      <div className="">
        <div className="p-input-icon-left">
          <i className="pi pi-search text-[#D2D2D2] " data-testid="search-icon" />
          <InputText
            placeholder="Search"
            className="h-[5vh] cursor-pointer font-bold"
            style={{ border: '1px solid #D2D2D2', borderRadius: '10px' }}
          />
        </div>
      </div>
    </div>
  )

  const actionButtons = [
    () => (
      <>
        <div className="flex ">
          <div className="flex gap-4">
            <span
              className=" underline cursor-pointer"
              //  onClick={() => handleEdit(rowData)}
            >
              Edit
            </span>
          </div>
        </div>
      </>
    ),
  ]

  const tableColumns: TableColumns = useMemo<TableColumns>(
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

  const getWorkOrderData = async () => {
    try {
      const response = await getWorkOrder({}).unwrap()
      const { status, content } = response as WorkOrder_RESPONSE
      if (status === 200 && Array.isArray(content)) {
        setWorkOrderData(content)
      }
    } catch (error) {
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
      <div className="">
        <div className="flex justify-between gap-4 mr-4 mt-24">
          <div>
            <h1 className="mt-6 opacity-30 text-2xl ml-36 font-normal">MOORSERVE/Work Orders</h1>
          </div>
          <div className="flex mr-36 gap-4">
            <div>
              <div className="flex gap-4">
                <Button
                  label={'Create New'}
                  onClick={() => setVisible(true)}
                  style={{
                    width: '7vw',
                    height: '5vh',
                    backgroundColor: 'black',
                    cursor: 'pointer',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '0.80vw',
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
          </div>
        </div>

        {/* <div className="bg-[#F2F2F2] rounded-xl border-[1px] border-[#D1D1D1] ml-36 p-2 mt-12 w-[64vw] ">
          <DataTable
            value={workOrderData}
            header={header}
            tableStyle={{
              // width: "73rem",
              fontSize: "0.80rem",
              fontWeight: "bold",

              backgroundColor:"red"
            }}
            scrollable={true}
          >
            <Column
              style={{ width: "4vw" }}
              field="customerId"
              header="Customer ID"
            ></Column>
            <Column
              style={{ width: "7vw" }}
              field="customerName"
              header="Customer Name"
            ></Column>
            <Column
              style={{ width: "7vw" }}
              field="mooringNumber"
              header="Mooring ID"
            ></Column>
            <Column
              style={{ width: "15vw" }}
              field="boatYard"
              header="Boatyard"
            ></Column>
            <Column
              style={{ width: "13vw" }}
              field="assignedTo"
              header="Assigned to"
            ></Column>
            <Column
              style={{ width: "6vw" }}
              field="dueDate"
              header="Due date"
            ></Column>
            <Column
              style={{ width: "6vw" }}
              field="status"
              header="Status"
            ></Column>
            <Column
              header="Action"
              body={(rowData) => (
                <div className="flex gap-4">
                  <span
                    className="text-black underline cursor-pointer"
                    onClick={() => handleEdit(rowData)}
                  >
                    Edit
                  </span>
                </div>
              )}
            ></Column>
          </DataTable>

         

        </div> */}

        <div className="bg-[F2F2F2] rounded-md border-[1px] border-gray-300 w-[64vw]  ml-32 mt-12 ">
          <DataTableSearchFieldComponent
            tableStyle={{
              fontSize: '12px',
              color: '#000000',
              fontWeight: 600,
            }}
            data={workOrderData}
            columns={tableColumns}
            header={header}
            actionbuttons={actionButtons}
            actionHeader={'Action'}
            style={{ backgroundColor: '#F2F2F2' }}
          />
        </div>
      </div>
    </>
  )
}

export default WorkOrders
