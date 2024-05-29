import { useCallback, useEffect, useMemo, useState } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { SelectButton, SelectButtonChangeEvent } from 'primereact/selectbutton'
import { Calendar } from 'primereact/calendar'
import { TechnicianPayload, TechnicianResponse } from '../../../Type/ApiTypes'
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
      console.error('Error fetching technician data:', error)
    }
  }, [getTechnicians])

  useEffect(() => {
    getTechniciansData()
  }, [getTechniciansData])

  return { technicianData, filteredTechnicianData }
}

 const Technicians = () => {
//   const [date, setDate] = useState<NullableDateArray>(null)
//   const options: string[] = ['Open', 'Completed']
//   const [value, setValue] = useState<string>(options[0])
//   const [dataVisible, setDataVisible] = useState(false)
//   const [technicianRecord, setTechnicianRecord] = useState()
//   const [globalFilter, setGlobalFilter] = useState<string | undefined>(undefined)
//   const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
//   const { technicianData, filteredTechnicianData } = useFetchTechnicians()

//   const [workOrderData, setWorkOrderData] = useState<BillsData[]>([
//     {
//       id: 0,
//       technician: 'Suncatcher',
//       techniciansName: 'John Smith',
//       dueDate: '3-12-2024',
//     },
//   ])

//   const TechnicianTableColumnStyle = {
//     fontSize: '10px',
//     height: '12px',
//     color: '#000000',
//   }
//   const WorkOrdersColumnStyle = {
//     fontSize: '10px',
//     height: '12px',
//     color: 'white',
//     backgroundColor: '#00426F',
//     marginTop:'1rem'
//   }

//   const TechnicianTableColumn = useMemo(
//     () => [
//       { id: 'id', label: 'ID', style: TechnicianTableColumnStyle },
//       { id: 'name', label: 'Technicians Name', style: TechnicianTableColumnStyle },
//       { id: 'email', label: 'Open Work Orders', style: TechnicianTableColumnStyle },
//       { id: 'phoneNumber', label: 'Completed Jobs', style: TechnicianTableColumnStyle },
//     ],
//     [],
//   )
//   const WorkOrdersColumn = useMemo(
//     () => [
//       { id: 'id', label: 'ID', style: WorkOrdersColumnStyle },
//       { id: 'name', label: 'Mooring', style: WorkOrdersColumnStyle },
//       { id: 'email', label: 'Customer Name', style: WorkOrdersColumnStyle },
//       { id: 'phoneNumber', label: 'Due Date', style: WorkOrdersColumnStyle },
//     ],
//     [],
//   )

//   const handleDateSelect = (date: Date) => {
//     setSelectedDate(date)
//   }

//   const handleDateUnselect = () => {
//     setSelectedDate(undefined)
//   }

//   const handleRowSelection = (e: any) => {
//     setTechnicianRecord(e.data)
//     setDataVisible(true)
//   }
//   const workOrder = (
//     <>
//       <div className="flex gap-40 mt-3">
//         <div>
//           <p className="text-[18px] text-black w-[106px] h-[21px]"> Work Orders </p>
//         </div>
//         <div>
//           <SelectButton value={value} onChange={(e) => setValue(e.value)} options={options} />
//         </div>
//       </div>
//     </>
//   )
//   const actionButtons = [
//     () => (
//       <>
//         <div className="flex">
//           <Button
//             label="View"
//             style={{
//               fontWeight: 'bold',
//               textDecoration: 'underline',
//               cursor: 'pointer',
//             }}
//             // onClick={handleViewInventory}
//           />
//         </div>
//       </>
//     ),
//   ]
 
  
  return (
    <>
      <Header header="MOORMANAGE/Technicians" />
      {/* <div className="flex justify-end ml-12">
        <div className="flex gap-4 items-center mr-10 mt-14">
          <div className="">
            <p style={{ color: '#00426F' }}> Filter order by Date </p>
          </div>
          <div>
            <Calendar
              value={date}
              onChange={(e) => setDate(e.value || null)}
              selectionMode="range"
              readOnlyInput
            />
          </div>
        </div>
      </div>

      <div className="flex justify-evenly mt-10">
        <div
          style={{
            width: '519px',
            height: '671px',
            backgroundColor: '#FFFFFF',
            border: '1px solid #D5E1EA',
            borderRadius: '5px',
          }}>
          <InputTextWithHeader
            placeholder={'search by name, ID....'}
            inputTextStyle={{
              height: '44px',
              width: '400px',
              cursor: 'pointer',
              fontSize: '',
              color: '#D5E1EA',
              border: '1px solid #D5E1EA',
              paddingLeft: '35px',
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
          {technicianData.length !== 0 ? (
            <DataTableComponent
              columns={TechnicianTableColumn}
              scrollable={true}
              tableStyle={{
                border: '1px #D5E1EA',
                backgroundColor: '#FFFFFF',
              }}
              data={technicianData}
            />
          ) : (
            <div className="text-center mt-40 mb-10">
              <img src="/assets/images/empty.png" alt="Empty Data" className="w-20 mx-auto mb-4" />
              <p className="text-gray-500">No data available</p>
            </div>
          )}
        </div>

        <div
          style={{
            width: '519px',
            height: '671px',
            backgroundColor: '#FFFFFF',
            border: '1px solid #D5E1EA',
            borderRadius: '5px',
          }}>
          <div className="flex ml-10 mt-6 gap-40 mb-3">
            <div className="font-bold">
              <p style={{ color: '#000000', fontSize: '18px' }}>{properties.workOrderHeader}</p>
            </div>
            <div>
              <SelectButton value={value} onChange={(e) => setValue(e.value)} options={options} />
            </div>
          </div>

          {workOrderData.length !== 0 ? (
            <DataTableComponent columns={WorkOrdersColumn} scrollable={true} data={workOrderData} />
          ) : (
            <div className="text-center mt-40 mb-10">
              <img src="/assets/images/empty.png" alt="Empty Data" className="w-20 mx-auto mb-4" />
              <p className="text-gray-500">No data available</p>
            </div>
          )}
        </div>
      </div> */}
    </>
  )
}

export default Technicians
