import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Accordition from '../CommonComponent/Accordion'
import { NullableDateArray } from '../../Type/CommonType'
import DataTableComponent from '../CommonComponent/Table/DataTableComponent'
import Header from '../Layout/LayoutComponents/Header'
import { ActionButtonColumnProps, TableColumnProps } from '../../Type/Components/TableTypes'
import { dasboardTable } from '../Utils/CustomData'
import CustomDisplayPositionMap from '../Map/CustomDisplayPositionMap'
import CustomMooringPositionMap from '../Map/CustomMooringPositionMap'
import Accordion from '../CommonComponent/Accordion'
import { ErrorResponse, MooringPayload, MooringResponse } from '../../Type/ApiTypes'
import {
  useGetMooringsDueForServiceMutation,
  useGetMooringsMutation,
} from '../../Services/MoorManage/MoormanageApi'
import { useSelector } from 'react-redux'
import { selectCustomerId } from '../../Store/Slice/userSlice'
import { Toast } from 'primereact/toast'
import { PositionType } from '../../Type/Components/MapTypes'
import { GearOffIcon, GearOnIcon, NeedInspectionIcon, NotInUseIcon } from '../Map/DefaultIcon'
import { Paginator } from 'primereact/paginator'

const Dashboard = () => {
  const selectedCustomerId = useSelector(selectCustomerId)
  const [isLoading, setIsLoading] = useState(true)
  const [mooringData, setMooringData] = useState<MooringPayload[]>([])
  const [mooringResponseData, setMooringResponseData] = useState<any>()
  const [getMoorings] = useGetMooringsDueForServiceMutation()
  const toast = useRef<Toast>(null)

  const position: PositionType = [41.56725, 70.94045]

  const parseCoordinates = (coordinates: any) => {
    if (!coordinates) return null
    const [latitude, longitude] = coordinates.split(' ').map(parseFloat)
    return isNaN(latitude) || isNaN(longitude) ? null : [latitude, longitude]
  }

  const gpsCoordinatesArray =
    mooringData &&
    mooringData?.map(
      (mooring: any) => parseCoordinates(mooring.gpsCoordinates) || [41.56725, 70.94045],
    )

  const initialPosition = gpsCoordinatesArray?.length > 0 ? gpsCoordinatesArray[0] : position

  const convertStringToArray = (str: any) => {
    return str?.split(' ').map(Number)
  }

  const coordinatesArray = convertStringToArray(mooringResponseData)

  const iconsByStatus = {
    GearOn: GearOnIcon,
    GearOff: GearOffIcon,
    NeedInspection: NeedInspectionIcon,
    NotInUse: NotInUseIcon,
  }
  const firstLastName = (data: any) => {
    console.log('data', data)

    return data.customerResponseDto.firstName + ' ' + data.customerResponseDto.lastName
  }
  const columns: TableColumnProps[] = useMemo(
    () => [
      {
        id: 'id',
        label: 'ID',
        style: {
          fontSize: '10px',
          // width: '2vw',
          backgroundColor: '#FFFFFF',
          color: '#000000',
          fontWeight: '700',
        },
      },
      {
        id: 'firstName',
        label: 'Customer Name',
        body: firstLastName,
        style: {
          fontSize: '10px',
          // width: '8vw',
          backgroundColor: '#FFFFFF',
          color: '#000000',
          fontWeight: '700',
        },
      },
      {
        id: 'mooringNumber',
        label: 'Mooring Number',
        style: {
          fontSize: '10px',
          // width: '8vw',
          backgroundColor: '#FFFFFF',
          color: '#000000',
          fontWeight: '700',
        },
      },

      {
        id: 'installBottomChainDate',
        label: 'Mooring service Date',
        style: {
          fontSize: '10px',
          // width: '9vw',
          backgroundColor: '#FFFFFF',
          color: '#000000',
          fontWeight: '700',
        },
      },
      {
        id: 'gpsCoordinates',
        label: 'Mooring Location ',
        style: {
          fontSize: '10px',
          // width: '10vw',
          backgroundColor: '#FFFFFF',
          color: '#000000',
          fontWeight: '700',
        },
      },
      {
        id: 'mooringStatus.status',
        label: 'Status',
        style: {
          fontSize: '10px',
          // width: '10vw',
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
    style: {
      fontSize: '10px',
      backgroundColor: '#FFFFFF',
      color: '#000000',
      fontWeight: '700',
    },
  }

  const MooringHeader = (
    <div>
      <div className="flex justify-between gap-2 p-2 bg-white">
        <div
          style={{
            fontWeight: '700',
            fontSize: '16px',
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
          }}>
          View all
        </div>
      </div>
    </div>
  )

  const getMooringsData = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await getMoorings({}).unwrap()
      const { status, content, message, totalSize } = response as MooringResponse
      if (status === 200 && Array.isArray(content)) {
        if (content?.length > 0) {
          setIsLoading(false)
          setMooringData(content)
        } else {
          setIsLoading(false)
          setMooringData([])
        }
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
      setIsLoading(false)
      const { message } = error as ErrorResponse
      console.error('Error fetching moorings data:', error)
    }
  }, [getMoorings, selectedCustomerId])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      getMooringsData()
    }, 2000)
    return () => clearTimeout(timeoutId)
  }, [selectedCustomerId])

  return (
    <>
      <Header header="MOORMANAGE/DASHBOARD" />
      <Toast ref={toast} />
      <div className="mt-6">
        <div className="flex lg:flex-row justify-around md:flex-col mt-4">
          <div
            style={{
              marginLeft: '3rem',
            }}>
            <div
              data-testid="technician-data"
              className="flex flex-col mt-[3px] ml-[15px] mr-[15px] table-container "
              style={{ height: '780px' }}>
              <CustomMooringPositionMap
                position={coordinatesArray ? coordinatesArray : initialPosition}
                zoomLevel={10}
                style={{ height: '60%', width: '100%' }}
                iconsByStatus={iconsByStatus}
                moorings={mooringData}
              />

              <div className="mt-2 ">
                <DataTableComponent
                  columns={columns}
                  actionButtons={ActionButtonColumn}
                  header={MooringHeader}
                  scrollable={true}
                  tableStyle={{
                    backgroundColor: '#FFFFFF',
                    fontSize: '12px',
                    color: '#000000',
                    fontWeight: 600,
                  }}
                  onRowClick={(rowData) => {
                    setMooringResponseData(rowData?.data?.gpsCoordinates)
                  }}
                  data={mooringData}
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
          </div>

          <div
            className={`md:ml-12 md:mt-3 lg:mt-0`}
            style={{
              flexGrow: 1,
              marginRight: '50px',
            }}>
            <div
              data-testid="work-order-data"
              className="flex flex-col mt-[3px] ml-[15px] mr-[15px] table-container "
              style={{ height: '600px' }}>
              <Accordion />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
