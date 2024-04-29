import { useEffect, useState } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { SelectButton, SelectButtonChangeEvent } from 'primereact/selectbutton'
import { Nullable } from 'primereact/ts-helpers'
import { Button } from 'primereact/button'
import { Calendar } from 'primereact/calendar'
import { TechnicianPayload, TechnicianResponse } from '../../../Type/ApiTypes'
import { useGetTechnicianMutation } from '../../../Services/MoorManage/MoormanageApi'
import { BillsData } from '../../../Type/CommonType'

const Technicians = () => {
  const [date, setDate] = useState<Nullable<(Date | null)[]>>(null)
  const options: string[] = ['Open', 'Completed']
  const [value, setValue] = useState<string>(options[0])
  const [dataVisible, setDataVisible] = useState(false)
  const [technicianRecord, setTechnicianRecord] = useState()
  const [globalFilter, setGlobalFilter] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())
  const [technicianData, setTechnicianData] = useState<TechnicianPayload[]>([])
  const [filteredTechnicianData, setFilteredTechnicianData] = useState<TechnicianPayload[]>([])
  const [getTechnicians] = useGetTechnicianMutation()

  const [workOrderData, setWorkOrderData] = useState<BillsData[]>([
    {
      id: 0,
      technician: 'Suncatcher',
      techniciansName: 'John Smith',
      dueDate: '3-12-2024',
    },
  ])

  const technicianHeader = (
    <div>
      <div className="p-input-icon-left">
        <i className="pi pi-search" />
        <input
          type="search"
          value={globalFilter as string}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search By name, Id..."
          className="border-[1px] w-[30vw] p-2 pl-10 rounded-md"
        />
      </div>
    </div>
  )

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
  }

  const handleDateUnselect = () => {
    setSelectedDate(null)
  }

  const workOrder = (
    <>
      <div className="flex gap-40 rounded-md">
        <div>
          <p className="font-bold"> Work Orders </p>
        </div>
        <div>
          <SelectButton value={value} onChange={(e) => setValue(e.value)} options={options} />
        </div>
      </div>
    </>
  )

  const Billsheader = (
    <div className="flex flex-wrap align-items-center gap-4 ">
      <span className="text-sm font-bold text-[black]">Work Orders</span>
      <div className=" ">
        <div className="">
          <SelectButton
            style={{ fontSize: '0.2rem', fontWeight: 'bolder', height: '2rem' }}
            value={value}
            onChange={(e: SelectButtonChangeEvent) => setValue(e.value)}
            options={options}
          />
        </div>
      </div>

      <div className="ml-72">
        <Button
          onClick={function (): void {
            throw new Error('Function not implemented.')
          }}
          label={'Add New'}
          style={{
            backgroundColor: 'black',
            height: '4vh',
            fontSize: '0.75rem',
            borderRadius: '0.20rem',
          }}
        />
      </div>
    </div>
  )

  const getTechniciansData = async () => {
    await getTechnicians({})
      .unwrap()
      .then(async (response) => {
        console.log('RESPONSE', response)
        const { status, content } = response as TechnicianResponse
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
        <div className="bg-[F2F2F2] rounded-md border-[1px] p-1 border-gray-300 w-[35vw] ">
          <DataTable
            header={technicianHeader}
            value={technicianData}
            scrollable={true}
            selectionMode="single"
            onRowSelect={(e) => {
              setTechnicianRecord(e.data)
              setDataVisible(true)
            }}
            tableStyle={{
              // minWidth: "20rem",
              fontSize: '12px',
              color: '#000000',
              fontWeight: 600,
              backgroundColor: '#D9D9D9',
            }}
            size="small">
            <Column header="ID:" field="id" style={{ width: '6vw' }}></Column>
            <Column
              style={{ width: '6vw' }}
              field="techniciansName"
              header="Technician Name"></Column>
            <Column
              style={{ width: '10vw' }}
              field="openWorkOrders"
              header="Open Work Orders"></Column>
            <Column
              style={{ width: '10vw' }}
              field="completedJobs"
              header="Completed Jobs"></Column>
          </DataTable>
        </div>

        {dataVisible && (
          <div className=" rounded-md border-[1px]  border-[#D1D1D1]  ml-10  w-[35vw] ">
            <DataTable header={workOrder} value={workOrderData} scrollable={true}>
              <Column style={{ width: '1vw', fontSize: '0.75rem' }} field="id" header="ID"></Column>
              <Column
                style={{ width: '3vw', fontSize: '0.75rem' }}
                field="mooring"
                header="Mooring"></Column>
              <Column
                style={{ width: '4vw', fontSize: '0.75rem' }}
                field="techniciansName"
                header="Customer Name"></Column>
              <Column
                style={{ width: '2vw', fontSize: '0.75rem' }}
                field="dueDate"
                header="Due Date"></Column>
              <Column
                style={{ width: '4vw' }}
                body={(rowData) => <p className="underline">view</p>}></Column>
            </DataTable>
          </div>
        )}
      </div>
    </>
  )
}

export default Technicians
