import { useMemo, useState } from 'react'
import Accordition from '../CommonComponent/Accordion'
import { NullableDateArray } from '../../Type/CommonType'
import DataTableComponent from '../CommonComponent/Table/DataTableComponent'
import Header from '../Layout/LayoutComponents/Header'
import { ActionButtonColumnProps, TableColumnProps } from '../../Type/Components/TableTypes'
import { dasboardTable } from '../Utils/CustomData'
import CustomDisplayPositionMap from '../Map/CustomDisplayPositionMap'

const Dashboard = () => {
  const [date, setDate] = useState<NullableDateArray>(null)
  const options: string[] = ['Pending', 'Cleared']
  const [value, setValue] = useState<string>(options[0])
  const columns: TableColumnProps[] = useMemo(
    () => [
      {
        id: 'id',
        label: 'ID',
        style: {
          fontSize: '10px',
          width: '12vw',
          backgroundColor: '#FFFFFF',
          color: '#000000',
          fontWeight: '700',
        },
      },
      {
        id: 'customerName',
        label: 'Customer Name',
        style: {
          fontSize: '10px',
          width: '18vw',
          backgroundColor: '#FFFFFF',
          color: '#000000',
          fontWeight: '700',
        },
      },
      {
        id: 'mooringId',
        label: 'Mooring ID',
        style: {
          fontSize: '10px',
          width: '18vw',
          backgroundColor: '#FFFFFF',
          color: '#000000',
          fontWeight: '700',
        },
      },

      {
        id: 'mooringServiceDate',
        label: 'Mooring service Date',
        style: {
          fontSize: '10px',
          width: '20vw',
          backgroundColor: '#FFFFFF',
          color: '#000000',
          fontWeight: '700',
        },
      },
      {
        id: 'mooringLocation ',
        label: 'Mooring Location ',
        style: {
          fontSize: '10px',
          width: '20vw',
          backgroundColor: '#FFFFFF',
          color: '#000000',
          fontWeight: '700',
        },
      },
      {
        id: 'status',
        label: 'Status',
        style: {
          fontSize: '10px',
          width: '24vw',
          backgroundColor: '#FFFFFF',
          color: '#000000',
          fontWeight: '700',
        },
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
    headerStyle: { backgroundColor: '#FFFFFF' },
  }

  const Boatsheader = (
    <div className="flex flex-wrap align-items-center justify-between gap-2 p-4 bg-[#FFFFFF] ">
      <span
        style={{
          fontWeight: '700',
          fontSize: '16px',
          lineHeight: '18.75px',
          letterSpacing: '0.46px',
          color: '#000000',
        }}>
        Moorings Due for Service
      </span>
      <span
        style={{
          width: '80px',
          height: '16px',
          opacity: '50%',
          fontSize: '13.59px',
          fontWeight: '400',
          lineHeight: '15.92px',
          letterSpacing: '0.46px',
          textAlign: 'right',
        }}>
        View all
      </span>
    </div>
  )
  return (
    <>
      <Header header="DASHBOARD" />
      <div className="flex flex-shrink  ml-12 gap-6 mt-10">
        <div className="right flex flex-col ">
          <div
            style={{
              flexShrink: 1,
              border: '1px solid #D5E1EA',
              borderRadius: '10px',
              padding: '0px',
              height: '334.01px',
              gap: '0px',

              opacity: '0px',
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#FFFFFF',
            }}>
            {/* <div>
              <h1 className="">map</h1> */}
            <CustomDisplayPositionMap position={[78.965768, 79.8097687]} />
            {/* </div> */}
          </div>
          <div
            style={{
              height: '300.2px',
              maxWidth: '728.9px',
              gap: '0px',
              borderRadius: '10px',
              opacity: '0px',
              border: '1px solid #D5E1EA',
              backgroundColor: '#FFFFFF',
              marginTop: '20px',
            }}>
            <DataTableComponent
              columns={columns}
              actionButtons={ActionButtonColumn}
              header={Boatsheader}
            />
          </div>
        </div>
        <div
          className="left "
          style={{
            flexShrink: 1,
          }}>
          <div>
            <Accordition />
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
