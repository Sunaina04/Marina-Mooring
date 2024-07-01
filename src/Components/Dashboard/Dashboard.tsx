import { useMemo, useState } from 'react'
import Accordition from '../CommonComponent/Accordion'
import { NullableDateArray } from '../../Type/CommonType'
import DataTableComponent from '../CommonComponent/Table/DataTableComponent'
import Header from '../Layout/LayoutComponents/Header'
import { ActionButtonColumnProps, TableColumnProps } from '../../Type/Components/TableTypes'
import { dasboardTable } from '../Utils/CustomData'
import CustomDisplayPositionMap from '../Map/CustomDisplayPositionMap'
import CustomMooringPositionMap from '../Map/CustomMooringPositionMap'
import Accordion from '../CommonComponent/Accordion'

const Dashboard = () => {
  const [date, setDate] = useState<NullableDateArray>(null)
  const options: string[] = ['Pending', 'Cleared']
  const [value, setValue] = useState<string>(options[0])
  const [serviceData, setServiceData] = useState<any>('')
  const columns: TableColumnProps[] = useMemo(
    () => [
      {
        id: 'id',
        label: 'ID',
        style: {
          fontSize: '10px',
          width: '2vw',
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
          width: '8vw',
          backgroundColor: '#FFFFFF',
          color: '#000000',
          fontWeight: '700',
        },
      },
      {
        id: 'mooringId',
        label: 'Mooring Number',
        style: {
          fontSize: '10px',
          width: '8vw',
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
          width: '8vw',
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
          width: '10vw',
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
          width: '10vw',
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
    <div>
      <div className="flex justify-between gap-2 p-4 bg-white">
        <div
          style={{
            fontWeight: '700',
            fontSize: '16px',
            // lineHeight: '18.75px',
            // letterSpacing: '0.46px',
            color: '#000000',
          }}>
          Moorings Due for Service
        </div>
        <div
          style={{
            width: '80px',
            height: '16px',
            opacity: '50%',
            fontSize: '13.59px',
            fontWeight: '500',
            // lineHeight: '15.92px',
            // letterSpacing: '0.46px',
            // textAlign: 'right',
          }}>
          View all
        </div>
      </div>
      <hr style={{ border: '1px solid #D5E1EA' }} />
    </div>
  )

  return (
    <>
      <Header header="DASHBOARD" />
      <div className="flex ml-12 gap-6 mt-10">
        <div className=" flex flex-col ">
          <div style={{ height: '500px', width: '50vw' }}>
            <CustomMooringPositionMap
              position={[30.698, 76.657]}
              zoomLevel={15}
              style={{ height: '60%', width: '100%' }}
            />
          </div>

          <div
            style={{
              maxWidth: '50vw',
              gap: '0px',
              borderRadius: '10px',
              opacity: '0px',
              border: '1px solid #D5E1EA',
              backgroundColor: '#FFFFFF',
              marginTop: '-180px',
            }}>
            <DataTableComponent
              columns={columns}
              actionButtons={ActionButtonColumn}
              header={Boatsheader}
              tableStyle={{ backgroundColor: '#FFFFFF' }}
              data={serviceData}
              emptyMessage={
                <div className="text-center mt-14">
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
        <div style={{ flexGrow: 1 }}>
          <div style={{ height: '100%', overflow: 'hidden' }}>
            <Accordion />
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
