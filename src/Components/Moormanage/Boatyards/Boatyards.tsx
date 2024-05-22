import { useEffect, useMemo, useState } from 'react'
import CustomModal from '../../CustomComponent/CustomModal'
import AddBoatyards from './AddBoatyards'
import { InputText } from 'primereact/inputtext'
import {
  BoatYardData,
  BoatYardPayload,
  BoatYardResponse,
  MooringResponseDtoList,
  MooringWithBoatYardResponse,
  TechnicianPayload,
} from '../../../Type/ApiTypes'
import {
  useGetBoatyardsMutation,
  useGetMooringWithBoatyardMutation,
} from '../../../Services/MoorManage/MoormanageApi'
import DataTableWithToogle from '../../CommonComponent/Table/DataTableWithToogle'
import { ActionButtonColumnProps, Product } from '../../../Type/Components/TableTypes'
import { boatyardMooring, getProductsWithOrdersData } from '../../Utils/CustomData'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import InputTextWithHeader from '../../CommonComponent/Table/InputTextWithHeader'
import DataTableComponent from '../../CommonComponent/Table/DataTableComponent'
import CustomDisplayPositionMap from '../../Map/CustomDisplayPositionMap'
import { properties } from '../../Utils/MeassageProperties'
import Header from '../../Layout/LayoutComponents/Header'
import { IoSearchSharp } from 'react-icons/io5'
import CustomSelectPositionMap from '../../Map/CustomSelectPositionMap'
import './Boatyard.css'

const Boatyards = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [boatyardsData, setboatyardsData] = useState<BoatYardPayload[]>([])
  const [mooringWithBoatyardsData, setMooringWithBoatyardsData] = useState<
    MooringWithBoatYardResponse[]
  >([])
  const [filteredboatyardsData, setFilteredboatyardsData] = useState<BoatYardPayload[]>([])
  const [expandedRows, setExpandedRows] = useState<any>()
  const [selectedBoatYard, setSelectedBoatYard] = useState<any>()
  const [editMode, setEditMode] = useState(false)
  const [position, setPosition] = useState<{ lat: number; lng: number } | undefined>(undefined)
  const [getBoatyards] = useGetBoatyardsMutation()
  const [getMooringsWithBoatyard] = useGetMooringWithBoatyardMutation()

  const handlePositionChange = (lat: number, lng: number) => {
    setPosition({ lat, lng })
  }

  const handleButtonClick = () => {
    setModalVisible(true)
  }

  const handleModalClose = () => {
    setModalVisible(false)
  }

  const ActionButtonColumn: ActionButtonColumnProps = {
    header: '',
    buttons: [
      {
        color: 'red',
        label: 'view',
        underline: true,
      },
    ],
    headerStyle: { backgroundColor: '#00426F', color: 'black' },
    style: { borderBottom: '1px solid #D5E1EA' },
  }

  const techniciansTableStyle = {
    backgroundColor: '#00426F',
    borderBottom: '1px solid #C0C0C0',
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: '10px',
  }

  const tableColumnsTechnicians = useMemo(
    () => [
      {
        id: 'id',
        label: 'ID',
        style: techniciansTableStyle,
      },
      {
        id: 'mainContact',
        label: 'Main Contact',
        style: techniciansTableStyle,
      },
      {
        id: 'mooringId',
        label: 'Mooring ID',
        style: techniciansTableStyle,
      },
      {
        id: 'boatName',
        label: 'Boat Name',
        style: techniciansTableStyle,
      },
    ],
    [],
  )

  const getBoatyardsData = async () => {
    try {
      await getBoatyards({})
        .unwrap()
        .then(async (response) => {
          const { status, content } = response as BoatYardResponse
          if (status === 200 && Array.isArray(content.content)) {
            setboatyardsData(content.content)
            setFilteredboatyardsData(content.content)
          }
        })
    } catch (error) {
      console.error('Error fetching getBoatyardsdata:', error)
    }
  }

  useEffect(() => {
    getBoatyardsData()
  }, [])


  const allowExpansion = (rowData: Product): boolean => {
    return !!rowData.orders && rowData.orders.length > 0
  }

  const rowExpansionStyle = {
    backgroundColor: '#ECF3F9',
    fontSize: '0.80rem',
    borderBottom: '1px solid #C0C0C0 ',
  }

  const rowExpansionTemplate = (data: BoatYardData) => {
    return (
      <DataTable>
        <Column
          field="address"
          header="Address"
          style={rowExpansionStyle}
          headerStyle={{ backgroundColor: '#00426F', color: '#FFFFFF' }}
        />
        <Column
          field="mooringInventoried"
          header="Mooring Inventoried"
          style={rowExpansionStyle}
          headerStyle={{ backgroundColor: '#00426F', color: '#FFFFFF' }}
        />
        <Column
          field="gpsCoordinates"
          header="Boatyard GPS Coordinates"
          style={rowExpansionStyle}
          headerStyle={{ backgroundColor: '#00426F', color: '#FFFFFF' }}
        />
      </DataTable>
    )
  }

  const columnStyle = {
    backgroundColor: '#FFFFFF',
    fontSize: '10px',
    color: 'black',
    fontWeight: '500',
    borderBottom: '1px solid #D5E1EA ',
  }

  const boatYardColumns = useMemo(
    () => [
      {
        field: 'id',
        header: 'ID',
        style: columnStyle,
        // body: () => {},
      },
      {
        field: 'boatyardName',
        header: 'Name',
        style: columnStyle,
      },
      {
        field: 'noOfBoatYards',
        header: 'No.of Boatyards',
        style: columnStyle,
      },
      {
        field: 'mooringInventoried',
        header: 'Total Mooring Inventoried',
        style: columnStyle,
      },
      {
        field: '',
        header: '',
        expander: allowExpansion,
        style: { backgroundColor: '#FFFFFF', borderBottom: '1px solid #D5E1EA ' },
      },
    ],
    [allowExpansion],
  )

  const handleRowClickBoatYardDetail = (rowData: any) => {
    setSelectedBoatYard(rowData.data)
  }


  const getMooringsWithBoatyardData = async () => {
    try {
      await getMooringsWithBoatyard({ id: selectedBoatYard?.id })
        .unwrap()
        .then(async (response) => {
          const { status, content } = response as MooringWithBoatYardResponse
          if (status === 200 && Array.isArray(content)) {
            setMooringWithBoatyardsData(content)
          }
        })
    } catch (error) {
      console.error('Error fetching getMooringsWithBoatyardData:', error)
    }
  }

  useEffect(() => {
    getBoatyardsData()
  }, [])

  useEffect(() => {
    getMooringsWithBoatyardData()
  }, [selectedBoatYard])

  return (
    <>
      <Header header="MOORMANAGE/Boatyards" />
      <div className="flex justify-end mr-14 mt-[40px]">
        <div className="flex gap-6 ">
          <div>
            <div className="p-input-icon-left">
              <IoSearchSharp className="ml-2 text-blue-900" />
              <InputText
                placeholder="Search"
                className="h-[44px] w-[237px] cursor-pointer pl-8 rounded-lg text-bold  "
              />
            </div>
          </div>
          <CustomModal
            buttonText={'ADD NEW'}
            children={
              <AddBoatyards
                closeModal={handleModalClose}
                boatYardData={getBoatyardsData}
                customerData={selectedBoatYard}
                editMode={editMode}
              />
            }
            headerText={<h1 className="text-xl font-extrabold text-black ml-4">Add Boatyard</h1>}
            visible={modalVisible}
            onClick={handleButtonClick}
            onHide={handleModalClose}
            buttonStyle={{
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
              marginTop: '40px',
            }}
            dialogStyle={{
              width: '820px',
              minWidth: '800px',
              height: '600px',
              minHeight: '610px',
              borderRadius: '1rem',
              maxHeight: '95% !important',
            }}
          />
        </div>
      </div>

      <div className="ml-20 gap-[19px] mt-10 " style={{display:'flex' ,justifyContent:'space-evenly'}}>

        <div
          data-testid="dataTable"
          className="flex-grow  bg-[#FFFFFF] rounded-xl border-[1px] border-[#D5E1EA]  w-[515px] h-[650px] mb-0 ">

          <InputTextWithHeader
            header={properties.boatyardDetail}
            placeholder={'Search by name, ID,address...'}
            headerStyle={{
              backgroundColor: '#00426F',
              color: '#FFFFFF',
              borderTopLeftRadius: '10px',
              borderTopRightRadius: '10px',
            }}
            iconStyle={{ marginLeft: '26px', color: '#00426F', marginTop: '0px' }}
            inputTextStyle={{
              marginTop: '10px',
              height: '44px',
              width: '480px',
              border: '1px solid #D5E1EA',
              cursor: 'pointer',
              color: '#A4A4A4',
              marginLeft: '17px',
              marginRight: '17px',
              borderRadius: '5px',
              fontSize: '0.80rem',
              backgroundColor: 'F2F2F2',
              paddingLeft: '30px',
              fontWeight: '400',
            }}
          />
      {boatyardsData.length!==0?

          <div className="bg-#00426F overflow-x-hidden overflow-y-scroll h-[500px] mt-[20px] ml-[15px] mr-[15px] table-container  ">
            <DataTableWithToogle
              data={boatyardsData}
              rowExpansionTemplate={rowExpansionTemplate}
              onRowToggle={(e: any) => {
                setExpandedRows(e.data)
              }}
              expandedRows={expandedRows}
              dataKey="id"
              columns={boatYardColumns}
              onRowClick={(e: any) => handleRowClickBoatYardDetail(e)}
            />
          </div>:(<div className="text-center mt-40 mb-10">
              <img src="/assets/images/empty.png" alt="Empty Data" className="w-20 mx-auto mb-4" />
              <p className="text-gray-500">No data available</p>
            </div>)}
        </div>

        <div
          data-testid="customer-admin-users-table"
          className=" flex-grow bg-[#FFFFFF]  rounded-xl border-[1px]    border-gray-300 w-[515px] h-[650px] mr-[50px] rounded-md mb-0" >
          <div className="text-sm font-extrabold rounded-sm w-full   bg-[#D9D9D9]">
            <div
              className="flex  align-items-center justify-between  bg-[#00426F] rounded-tl-[10px] rounded-tr-[10px]"
              style={{ color: '#FFFFFF' }}>
              <h1 className="p-4">{properties.boatyardMooringHeader}</h1>
            </div>
          </div>
          <div className=" bg-[] mt-3 ">
            <div
              className="flex justify-start gap-14 ml-4 mt-[30px] "
              style={{ fontSize: '12px', fontWeight: '700' }}>
              <p>{properties.address}</p>
              <p>{properties.mooringInventoried}</p>
              <p>{properties.boatyardGPSCoordinates}</p>
            </div>
          </div>

          <div className="border-[1px] border-[#D5E1EA]  w-[full] mt-3 "></div>
          {selectedBoatYard ? (
            <>
              <div className="flex justify-start gap-14  mt-4  font-normal text-[12px]">
                <p className="ml-3.5">
                  {selectedBoatYard?.street}
                  {selectedBoatYard?.apt}
                  {selectedBoatYard?.state}
                  {selectedBoatYard?.country}t
                </p>
                <p className="w-15">{selectedBoatYard?.mooringInventoried}</p>
                <p className="ml-24  underline">{selectedBoatYard?.gpsCoordinates}</p>
              </div>
              <div
                className="w-[480px] h-[150px]  mt-[20px] mb-3 "
                style={{
                  border: '1px solid #D5E1EA',
                  borderRadius: '10px',
                  padding: '0px',
                  marginLeft: '10px',
                  marginRight: '10px',
                }}>
                <CustomSelectPositionMap onPositionChange={handlePositionChange} />
              </div>
              <div className="bg-#00426F overflow-x-hidden overflow-y-scroll mt-[13px] h-[250px] table-container  ">
                <DataTableComponent
                  tableStyle={{
                    fontSize: '12px',
                    color: '#000000',
                  }}
                  data={mooringWithBoatyardsData}
                  columns={tableColumnsTechnicians}
                  actionButtons={ActionButtonColumn}
                  style={{
                    borderBottom: '1px solid #D5E1EA ',
                    fontWeight: '400',
                    color: '#000000',
                  }}
                />
              </div>
            </>
          ) : (
            <div className="text-center mt-40 mb-10">
              <img src="/assets/images/empty.png" alt="Empty Data" className="w-20 mx-auto mb-4" />
              <p className="text-gray-500">No data available</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Boatyards
