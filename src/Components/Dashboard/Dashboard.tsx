import { useMemo, useState } from 'react'
import Accordition from '../CommonComponent/Accordion'
import { NullableDateArray } from '../../Type/CommonType'
import DataTableComponent from '../CommonComponent/Table/DataTableComponent'
import Header from '../Layout/LayoutComponents/Header'
import { ActionButtonColumnProps, TableColumnProps } from '../../Type/Components/TableTypes'
import { dasboardTable } from '../Utils/CustomData'

const Dashboard = () => {
  const [date, setDate] = useState<NullableDateArray>(null)
  const options: string[] = ['Pending', 'Cleared']
  const [value, setValue] = useState<string>(options[0])
  const columns: TableColumnProps[] = useMemo(
    () => [
      {
        id: 'id',
        label: 'ID',
        style: { fontSize: '10px', width: '12vw', backgroundColor: '#F2F2F2', color: '#000000' },
      },
      {
        id: 'customerName',
        label: 'Customer Name',
        style: { fontSize: '10px', width: '12vw', backgroundColor: '#F2F2F2', color: '#000000' },
      },
      {
        id: 'mooringServiceData',
        label: 'Mooring service Data',
        style: { fontSize: '10px', width: '18vw', backgroundColor: '#F2F2F2', color: '#000000' },
      },
      {
        id: 'mooringLoaction',
        label: 'Mooring Loacation',
        style: { fontSize: '10px', width: '12vw', backgroundColor: '#F2F2F2', color: '#000000' },
      },
      {
        id: 'status',
        label: 'Status',
        style: { fontSize: '10px', width: '20vw', backgroundColor: '#F2F2F2', color: 'black' },
      },
    ],
    [],
  )

  const ActionButtonColumn: ActionButtonColumnProps = {
    header: '',
    buttons: [
      {
        underline: true,
        label: 'Edit',
        color: 'green',
      },
    ],
    headerStyle: { backgroundColor: '#F2F2F2' },
  }

  const Boatsheader = (
    <div className="flex flex-wrap align-items-center justify-between gap-2 p-4">
      <span className="text-xl font-extrabold">Moorings Due for Service</span>
      <span
        style={{
          fontFamily: 'Lato',
          fontSize: '14px',
          fontWeight: 700,
          lineHeight: '16.8px',
          letterSpacing: '0.4837472140789032px',
          textAlign: 'right',
        }}
        className=" font-bold leading-4 text-right tracking-tight">
        View All
      </span>
    </div>
  )

  return (
    <>
      <Header header="DASHBOARD" />
      <div className="flex justify-around">
        <div className="right flex flex-col">
          <div>
            {/* right section */}
            {/* <div className="w-[43vw] h-14 mt-11">
              <img src="/assets/images/map.png" />
              <div className="-translate-y-[45vh] translate-x-[5vw]"></div>
              <div className="-translate-y-[45vh] translate-x-[20vw]"></div>
              <div className="absolute -translate-y-[19vh] translate-x-[25vw] bottom-0  rounded-md border-[1px] p-1 border-gray-300 w-[17vw] h-[13vh] bg-white">
                <p className="text-[0.7rem] ml-1  text-black">Status</p>
                <hr className="m-1 border-black" />
                <div className="flex">
                  <div>
                    <FaCircle className="h-3 text-red-600 mt-1" />
                    <FaCircle className="h-3 text-green-600 mt-4" />
                  </div>
                  <div>
                    <p className="text-[0.6rem] text-black mt-1">Need inspection</p>
                    <p className="text-[0.6rem] text-black tracking-tighter mt-[0.9rem]">
                      Gear On (in the water)
                    </p>
                  </div>
                  <div className="ml-1">
                    <FaCircle className="h-3 text-violet-600 mt-1 " />
                    <FaCircle className="h-3 text-gray-500 mt-4" />
                  </div>
                  <div>
                    <p className="text-[0.6rem] text-black tracking-tighter mt-1">
                      Gear Off (out of the water)
                    </p>
                    <p className="text-[0.6rem] text-black tracking-tighter mt-[0.9rem]">Not in Use</p>
                  </div>
                </div>
              </div>
            </div> */}
            <h1> Map </h1>
          </div>

          <div className="bg-[#F2F2F2] border-[#D1D1D1]  w-[43vw] ">
            <DataTableComponent
              columns={columns}
              actionButtons={ActionButtonColumn}
              header={Boatsheader}
              data={dasboardTable}
            />
          </div>
        </div>

        <div className="left">
          {/* leftSection */}
          <div className="mr-50 mt-11">
            <Accordition />
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
