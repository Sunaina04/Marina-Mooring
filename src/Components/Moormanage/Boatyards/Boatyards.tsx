import { useCallback, useEffect, useMemo, useState } from 'react'
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
import { properties } from '../../Utils/MeassageProperties'
import Header from '../../Layout/LayoutComponents/Header'
import { IoSearchSharp } from 'react-icons/io5'
import CustomSelectPositionMap from '../../Map/CustomSelectPositionMap'

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
  const [selectedRowId, setSelectedRowID] = useState()
  const [searchText, setSearchText] = useState('')

  const handlePositionChange = (lat: number, lng: number) => {
    setPosition({ lat, lng })
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
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

  const allowExpansion = (rowData: BoatYardPayload): boolean => {
    return !!rowData.mooringInventoried
  }

  const rowExpansionStyle = {
    backgroundColor: '#00426F',
    fontSize: '10px',
    fontWeight: '700',
    color: '#FFFFFF',
    borderBottom: '1px solid #C0C0C0 ',
  }

  const rowExpansionColumn = useMemo(
    () => [
      {
        id: 'address',
        label: 'Address',
        style: rowExpansionStyle,
      },
      {
        id: 'mooringInventoried',
        label: 'Mooring Inventoried',
        style: rowExpansionStyle,
      },
      {
        id: 'gpsCoordinates',
        label: 'Mooring ID',
        style: rowExpansionStyle,
      },
    ],
    [],
  )

  const rowExpansionTemplate = (data: BoatYardData) => {
    return (
      <>
        {boatyardsData ? (
          <DataTableComponent
            tableStyle={{
              fontSize: '12px',
              color: '#000000',
            }}
            data={[data]}
            columns={rowExpansionColumn}
            style={{
              borderBottom: '1px solid #D5E1EA  ',
              marginLeft: '5px',
              fontWeight: '400',
              color: '#000000',
            }}
          />
        ) : (
          <div>
            <img src="/assets/images/empty.png" alt="Empty Data" className="w-20 mx-auto mb-4" />
          </div>
        )}
      </>
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

  const getRowStyle = (rowData: any) => {
    return {
      backgroundColor: rowData.id === selectedRowId ? '#FFD700' : '',
    }
  }

  const getBoatyardsData = useCallback(async () => {
    try {
      await getBoatyards({ searchText: searchText })
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
  }, [getBoatyards, searchText])

  const getMooringsWithBoatyardData = useCallback(async () => {
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
  }, [selectedBoatYard])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      getBoatyardsData()
    }, 600)
    return () => clearTimeout(timeoutId)
  }, [searchText])

  useEffect(() => {
    if (selectedBoatYard) getMooringsWithBoatyardData()
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
              maxHeight: '60% !important',
            }}
          />
        </div>
      </div>

      <div
        className="ml-[50px] gap-[19px] mt-10 "
        style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <div
          data-testid="dataTable"
          className="flex-grow  bg-[#FFFFFF] rounded-xl border-[1px] border-[#D5E1EA]  w-[515px] h-[650px] mb-0 ">
          <div className="text-sm font-extrabold rounded-sm w-full   bg-[#D9D9D9]">
            <div
              className="flex  align-items-center justify-between  bg-[#00426F] rounded-tl-[10px] rounded-tr-[10px]"
              style={{ color: '#FFFFFF' }}>
              <h1 className="p-4">{properties.boatyardDetail}</h1>
            </div>
          </div>
          <InputTextWithHeader
            value={searchText}
            onChange={handleSearch}
            placeholder={'Search by name, ID,address...'}
            iconStyle={{
              position: 'absolute',
              left: '15px',
              top: '60%',
              transform: 'translateY(-50%)',
              width: '18px',
              height: '18px',
            }}
            inputTextStyle={{
              flexGrow: 1,
              marginTop: '10px',
              height: '44px',
              border: '1px solid #C5D9E0',
              padding: '0 2rem 0 2.5rem',
              fontSize: '14px',
              color: '#000000',
              borderRadius: '4px',
              minHeight: '44px',
              fontWeight: 400,
              backgroundColor: '#FFFFFF',
            }}
          />
          {boatyardsData.length !== 0 ? (
            <div className="bg-#00426F overflow-x-hidden overflow-y-scroll h-[500px] mt-[3px] ml-[15px] mr-[15px] table-container  ">
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
            </div>
          ) : (
            <div className="text-center mt-40 mb-10">
              <img src="/assets/images/empty.png" alt="Empty Data" className="w-20 mx-auto mb-4" />
              <p className="text-gray-500">No data available</p>
            </div>
          )}
        </div>

        <div
          data-testid="customer-admin-users-table"
          className=" flex-grow bg-[#FFFFFF]  rounded-xl border-[1px]    border-gray-300 w-[515px] h-[650px] mr-[50px] rounded-md mb-0">
          <div className="text-sm font-extrabold rounded-sm w-full   bg-[#D9D9D9]">
            <div
              className="flex  align-items-center justify-between  bg-[#00426F] rounded-tl-[10px] rounded-tr-[10px]"
              style={{ color: '#FFFFFF' }}>
              <h1 className="p-4">{properties.boatyardMooringHeader}</h1>
            </div>
          </div>
          <div className=" bg-[] mt-3 ">
            <div
              className="flex justify-start  ml-4 mt-[30px]  "
              style={{ fontSize: '10px', fontWeight: '700' }}>
              <p>{properties.address}</p>
              <p className="ml-[8.4vw]">{properties.mooringInventoried}</p>
              <p className="ml-[5.7vw]">{properties.boatyardGPSCoordinates}</p>
            </div>
          </div>

          <div className="border-[1px] border-[#D5E1EA]  w-[full] mt-3 "></div>
          {selectedBoatYard ? (
            <>
              <div className="flex justify-start mt-4  font-normal text-[12px] ">
                <p className="ml-3.5 w-[6vw]">
                  {selectedBoatYard?.street}
                  <br />
                  {selectedBoatYard?.apt}
                  <br />
                  {selectedBoatYard?.state} ,{selectedBoatYard?.country}
                </p>
                <p className="w-15 ml-[5.4vw]">{selectedBoatYard?.mooringInventoried}</p>
                <p className="ml-[12vw]  underline">{selectedBoatYard?.gpsCoordinates}</p>
              </div>
              <div
                className=" h-[150px]  mt-[20px] mb-3 "
                style={{
                  flexGrow: 1,
                  border: '1px solid #D5E1EA',
                  borderRadius: '10px',
                  padding: '0px',
                  marginLeft: '10px',
                  marginRight: '10px',
                }}>
                <CustomSelectPositionMap onPositionChange={handlePositionChange} />
              </div>
              <div className="bg-#00426F overflow-x-hidden  mt-[13px] h-[250px] table-container  ">
                <DataTableComponent
                  tableStyle={{
                    fontSize: '12px',
                    color: '#000000',
                  }}
                  data={mooringWithBoatyardsData}
                  columns={tableColumnsTechnicians}
                  actionButtons={ActionButtonColumn}
                  style={{
                    borderBottom: '1px solid #D5E1EA  ',
                    marginLeft: '5px',
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
