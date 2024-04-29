import { useEffect, useState } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { SelectButton, SelectButtonChangeEvent } from 'primereact/selectbutton'
import { Nullable } from 'primereact/ts-helpers'
import { BiCalendarAlt } from 'react-icons/bi'
import AddTechnication from './AddTechnician'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import ButtonComponent from '../../Common/ButtonComponent'
import { Calendar } from 'primereact/calendar'
import { TECHNICIAN_PAYLOAD, TECHNICIAN_RESPONSE } from '../../../Services/MoorManage/types'
import { useGetTechnicianMutation } from '../../../Services/MoorManage/moormanage'
import DataTableSearchFieldComponent from '../../Common/ DataTableSearchFieldComponent'
import { IoSearch } from 'react-icons/io5'

interface TableColumn {
  id: string;
  label: string;
  style: React.CSSProperties;
}

interface TableColumns extends Array<TableColumn> {}

const Technicians = () => {
  const [date, setDate] = useState<Nullable<(Date | null)[]>>(null)
  const options: string[] = ['Open', 'Completed']
  const [value, setValue] = useState<string>(options[0])
  const [dataVisible, setDataVisible] = useState(false)
  const [technicianRecord, setTechnicianRecord] = useState()
  console.log('sfsffas', technicianRecord)
  const [globalFilter, setGlobalFilter] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())
  const [technicianData, setTechnicianData] = useState<TECHNICIAN_PAYLOAD[]>([])
  const [filteredTechnicianData, setFilteredTechnicianData] = useState<TECHNICIAN_PAYLOAD[]>([])
  const [getTechnicians] = useGetTechnicianMutation()



  const tableColumns: TableColumns = [
    {
      id: 'id',
      label: 'ID',
      style: { width: '4vw', borderBottom: '1px solid #C0C0C0', fontSize: '0.90rem', backgroundColor: '#F2F2F2' },
    },
    {
      id: 'mooring',
      label: 'Mooring',
      style: { width: '6vw', borderBottom: '1px solid #C0C0C0', fontSize: '0.90rem', backgroundColor: '#F2F2F2' },
    },

    {
      id: 'customerName',
      label: 'Customer Name',
      style: { width: '10vw', borderBottom: '1px solid #C0C0C0', fontSize: '0.90rem', backgroundColor: '#F2F2F2' },
    },


    {
      id: 'dueDate',
      label: 'Due date',
      style: { width: '12vw', borderBottom: '1px solid #C0C0C0', fontSize: '0.90rem', backgroundColor: '#F2F2F2' },
    },

  ]




  const tableCol: TableColumns  = [
    {
      id: 'id',
      label: 'ID',
      style: { width: '3vw', borderBottom: '1px solid #C0C0C0', fontSize: '0.90rem', backgroundColor: '#F2F2F2' },
    },
    {
      id: 'techniciansName',
      label: 'Technicians Name',
      style: { width: '6vw', borderBottom: '1px solid #C0C0C0', fontSize: '0.90rem', backgroundColor: '#F2F2F2' },
    },
    {
      id: 'openWorkOrders',
      label: 'Open Work Orders',
      style: { width: '6vw', borderBottom: '1px solid #C0C0C0', fontSize: '0.90rem', backgroundColor: '#F2F2F2' },
    },
    {
      id: 'completedJobs',
      label: 'Completed jobs',
      style: { width: '6vw', borderBottom: '1px solid #C0C0C0', fontSize: '0.90rem', backgroundColor: '#F2F2F2' },
    },

  ]
  const boatData = [
    {
      id: '#001',
      mooring: 'Suncatcher',
      customerName: 'John Doe',
      dueDate: "15,March 2024",
    },

  ]


  const CustomersHeader = () => {
    return (
      <div className="">
        <div className="flex items-center  bg-[#F2F2F2]">
          <div className="p-input-icon-left">
            <IoSearch style={{ marginLeft: '1rem', color: '#A4A4A4' }} />
            <InputText
              placeholder="Search by name, ID"
              className="h-[5vh] w-[65vh] cursor-pointer text-[0.65rem]
               text-[#A4A4A4]  border-1 border-[1px]
               border-[#9F9F9F] rounded-md pl-10"
            />
          </div>
        </div>
      </div>
    )
  }

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
  }

  const handleDateUnselect = () => {
    setSelectedDate(null)
  }

  //table header 2
  const workOrder = (
    <>
      <div className="flex gap-80 rounded-md">
        <div>
          <p className="font-bold"> Work Orders </p>
        </div>
        <div>
          <SelectButton value={value} onChange={(e) => setValue(e.value)} options={options} />
        </div>
      </div>
    </>
  )

  const actionButtons = [
    () => (
      <>
        <div className="flex">
          <Button
            label="View"
            style={{
              fontWeight: 'bold',
              textDecoration: 'underline',
              cursor: 'pointer',
            }}
          // onClick={handleViewInventory}
          />
        </div>

      </>
    ),

  ];



  const ActionHeader = () => {
    return (

      <div className="flex items-center">
        <div >

        </div>
      </div>

    )
  }

  const getTechniciansData = async () => {
    await getTechnicians({})
      .unwrap()
      .then(async (response) => {
        console.log('RESPONSE', response)
        const { status, content } = response as TECHNICIAN_RESPONSE
        if (status === 200 && Array.isArray(content)) {
          setTechnicianData(content)
          setFilteredTechnicianData(content) // Initialize filtered data with all data
        }
      })
  }

  useEffect(() => {
    getTechniciansData()
  }, [])

  return (
    <>
      <div className="flex justify-between items-center ml-12">
        <div>
          <h1 className="mt-14 ml-20 opacity-30 text-2xl font-normal">MOORMANAGE/Technicians</h1>
        </div>
        <div className="flex gap-4 items-center mr-10 mt-14">
          <div className="">
            <p> Filter order by Date </p>
          </div>
          <div>
            <Calendar
              value={date}
              onChange={(e) => setDate(e.value)}
              selectionMode="range"
              readOnlyInput
            />
          </div>
        </div>
      </div>

      <div className="flex gap-5 mt-10 ml-20">
        <div className="rounded-md border-[1px] p-4 border-gray-300 w-[38vw] h-[65vh] mb-96 overflow-x-hidden overflow-y-scroll ">
          <DataTableSearchFieldComponent
            data={filteredTechnicianData}
            tableStyle={{
              color: '#000000',
              fontWeight: 600,
              backgroundColor: 'red',
            }}
            columns={tableCol}
            header={CustomersHeader}
          />
        </div>

        {dataVisible && (
          // <div className=" rounded-md border-[1px]  border-[#D1D1D1]  ml-10  w-[35vw] ">
          //   <DataTable
          //     header={workOrder}
          //     value={billsData}
          //     scrollable={true}
          //   >
          //     <Column
          //       style={{ width: "1vw", fontSize: "0.75rem" }}
          //       field="id"
          //       header="ID"
          //     ></Column>
          //     <Column
          //       style={{ width: "3vw", fontSize: "0.75rem" }}
          //       field="mooring"
          //       header="Mooring"
          //     ></Column>
          //     <Column
          //       style={{ width: "4vw", fontSize: "0.75rem" }}
          //       field="techniciansName"
          //       header="Customer Name"
          //     ></Column>
          //     <Column
          //       style={{ width: "2vw", fontSize: "0.75rem" }}
          //       field="dueDate"
          //       header="Due Date"
          //     ></Column>
          //     <Column
          //       style={{ width: "4vw" }}
          //       body={(rowData) => <p className="underline">view</p>}
          //     ></Column>
          //   </DataTable>



          // </div>

          <div className="rounded-md border-[1px] p-4 border-gray-300 w-[38vw] h-[65vh] mb-96 overflow-x-hidden overflow-y-scroll ">
            <DataTableSearchFieldComponent
              data={boatData}
              tableStyle={{

                fontWeight: 600,

              }}
              columns={tableColumns}
              header={workOrder}
              actionbuttons={actionButtons}
              actionHeader={ActionHeader}
              style={{ backgroundColor: "#F2F2F2", borderBottom: "1px solid #C0C0C0" }}
            />
          </div>

        )}
      </div>
    </>
  )
}

export default Technicians
