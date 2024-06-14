import { useCallback, useEffect, useMemo, useState } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { SelectButton, SelectButtonChangeEvent } from 'primereact/selectbutton'
import { Calendar } from 'primereact/calendar'
import { ErrorResponse, TechnicianPayload, TechnicianResponse } from '../../../Type/ApiTypes'
import { useGetTechnicianMutation } from '../../../Services/MoorManage/MoormanageApi'
import { BillsData, NullableDateArray } from '../../../Type/CommonType'
import { Button } from 'primereact/button'
import DataTableSearchFieldComponent from '../../CommonComponent/Table/DataTableComponent'
import { IoSearch } from 'react-icons/io5'
import { InputText } from 'primereact/inputtext'
import Header from '../../Layout/LayoutComponents/Header'
import DataTableComponent from '../../CommonComponent/Table/DataTableComponent'
import InputTextWithHeader from '../../CommonComponent/Table/InputTextWithHeader'
import { properties } from '../../Utils/MeassageProperties'
import { ProgressSpinner } from 'primereact/progressspinner'
import { ActionButtonColumnProps } from '../../../Type/Components/TableTypes'

const useFetchTechnicians = () => {
  const [technicianData, setTechnicianData] = useState<TechnicianPayload[]>([])
  const [filteredTechnicianData, setFilteredTechnicianData] = useState<TechnicianPayload[]>([])
  const [getTechnicians] = useGetTechnicianMutation()
  const getTechniciansData = useCallback(async () => {
    try {
      const response = await getTechnicians({}).unwrap()
      const { status, content } = response as TechnicianResponse
      if (status === 200 && Array.isArray(content)) {
        setTechnicianData(content)
        setFilteredTechnicianData(content)
      }
    } catch (error) {
      const { message } = error as ErrorResponse
      console.error('Error fetching technician data:', error)
    }
  }, [getTechnicians])

  useEffect(() => {
    getTechniciansData()
  }, [getTechniciansData])

  return { technicianData, filteredTechnicianData }
}

const Technicians = () => {
  const [date, setDate] = useState<NullableDateArray>(null)
  const options: string[] = ['Open', 'Completed']
  const [value, setValue] = useState<string>(options[0])
  const [dataVisible, setDataVisible] = useState(false)
  const [technicianRecord, setTechnicianRecord] = useState()
  const [globalFilter, setGlobalFilter] = useState<string | undefined>(undefined)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const { technicianData, filteredTechnicianData } = useFetchTechnicians()
  const [isLoading, setIsLoading] = useState(false)
  const [workOrderData, setWorkOrderData] = useState<BillsData[]>([
    {
      id: 0,
      technician: 'Suncatcher',
      techniciansName: 'John Smith',
      dueDate: '3-12-2024',
    },
  ])

  const TechnicianTableColumnStyle = {
    fontSize: '10px',
    height: '12px',
    color: '#000000',
    backgroundColor: '#FFFFFF',
  }
  const WorkOrdersColumnStyle = {
    fontSize: '10px',
    height: '12px',
    color: 'white',
    backgroundColor: '#00426F',
    marginTop: '1rem',
    border: '1px solid #00426F',
  }

  const TechnicianTableColumn = useMemo(
    () => [
      { id: 'id', label: 'ID', style: TechnicianTableColumnStyle },
      { id: 'name', label: 'Technicians Name', style: TechnicianTableColumnStyle },
      { id: 'email', label: 'Open Work Orders', style: TechnicianTableColumnStyle },
      { id: 'phoneNumber', label: 'Completed Jobs', style: TechnicianTableColumnStyle },
    ],

    [],
  )
  const WorkOrdersColumn = useMemo(
    () => [
      { id: 'id', label: 'ID', style: WorkOrdersColumnStyle },
      { id: 'name', label: 'Mooring', style: WorkOrdersColumnStyle },
      { id: 'email', label: 'Customer Name', style: WorkOrdersColumnStyle },
      { id: 'phoneNumber', label: 'Due Date', style: WorkOrdersColumnStyle },
    ],
    [],
  )

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
  }

  const handleDateUnselect = () => {
    setSelectedDate(undefined)
  }

  const handleRowSelection = (e: any) => {
    setTechnicianRecord(e.data)
    setDataVisible(true)
  }

  const ActionButtonColumn: ActionButtonColumnProps = {
    header: '',
    buttons: [
      {
        color: 'black',
        label: 'View',
        underline: true,
        fontWeight: 500,
        // onClick: (rowData) => handleEditButtonClick(rowData),
      },
    ],
    headerStyle: {
      fontSize: '10px',
      height: '12px',
      color: 'white',
      backgroundColor: '#00426F',
      marginTop: '1rem',
      border: '1px solid #00426F',
    },
    style: { borderBottom: '1px solid #D5E1EA' },
  }

  return (
    <>
      <Header header="MOORMANAGE/Technicians" />

      <div className="mt-10">
        <div className="flex justify-end mr-[54px]">
          <div className="flex gap-4 items-center">
            <div className="">
              <p style={{ color: '#00426F' }}>Filter order by Date</p>
            </div>
            <div
              style={{
                position: 'relative',
                border: '1px solid #D5E1EA',
                borderRadius: '5px',
                display: 'inline-block',
              }}>
              <Calendar
                value={date}
                onChange={(e) => setDate(e.value || null)}
                selectionMode="range"
                readOnlyInput
                // placeholder="from: 15, March 2024   to: 21, March 2024"
                className="h-8"
                id="clander"
              />
              <img
                src="/assets/images/Calendar.svg"
                alt="Envelope Icon"
                className="p-clickable"
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '20px',
                  height: '15px',
                }}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-around gap-10 mt-6 ">
          <div
            style={{
              width: '700px',
              height: '720px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #D5E1EA',
              borderRadius: '5px',
              marginLeft: '3rem',
            }}>
            <InputTextWithHeader
              placeholder="Search by name, ID..."
              inputTextStyle={{
                height: '44px',
                width: '100%',
                cursor: 'pointer',
                fontSize: '',
                color: '#D5E1EA',
                border: '1px solid #D5E1EA',
                paddingLeft: '40px',
                borderRadius: '5px',
              }}
              iconStyle={{
                position: 'absolute',
                left: '15px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '18px',
                height: '18px',
              }}
            />

            <DataTableComponent
              columns={TechnicianTableColumn}
              scrollable={true}
              tableStyle={{
                fontSize: '12px',
                color: '#000000',
                fontWeight: 600,
                backgroundColor: '#FFFFFF',
                cursor: 'pointer',
              }}
              data={technicianData}
              emptyMessage={
                <div className="text-center mt-40 mb-10">
                  <img
                    src="/assets/images/empty.png"
                    alt="Empty Data"
                    className="w-20 mx-auto mb-4"
                  />
                  <p className="text-gray-500">No data available</p>
                </div>
              }
            />
          </div>

          <div
            className={`${isLoading ? 'blur-screen' : ''}`}
            style={{
              flexGrow: 1,
              borderRadius: '5px',
              border: '1px solid #D5E1EA',
              backgroundColor: '#FFFFFF',
              marginRight: '50px',
              width: '700px',
              height: '720px',
              // border:"1px solid red"
            }}>
            <div className="flex justify-between mt-6  mb-3 ">
              <div className="font-bold ml-5">
                <p style={{ color: '#000000', fontSize: '18px' }}>{properties.workOrderHeader}</p>
              </div>
              <div className="mr-10">
                <div className="card flex justify-content-center ">
                  <SelectButton
                    invalid
                    value={value}
                    onChange={(e: SelectButtonChangeEvent) => setValue(e.value)}
                    options={options}
                  />
                </div>
              </div>
            </div>
            {isLoading && (
              <ProgressSpinner
                style={{
                  position: 'absolute',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '50px',
                  height: '50px',
                }}
                strokeWidth="4"
              />
            )}
            <div
              style={{
                overflow: 'auto',
                // width:"100%"
              }}
              data-testid="customer-admin-users-table">
              <DataTableComponent
                tableStyle={{
                  fontSize: '12px',
                  color: '#000000',
                  fontWeight: 600,
                  backgroundColor: '#D9D9D9',
                  cursor: 'pointer',
                }}
                scrollable={true}
                columns={WorkOrdersColumn}
                // scrollable={true}
                data={[]}
                actionButtons={ActionButtonColumn}
                emptyMessage={
                  <div className="text-center mt-40 mb-10">
                    <img
                      src="/assets/images/empty.png"
                      alt="Empty Data"
                      className="w-20 mx-auto mb-4"
                    />
                    <p className="text-gray-500">No data available</p>
                  </div>
                }
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Technicians
