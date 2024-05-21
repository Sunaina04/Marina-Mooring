import { useEffect, useMemo, useState } from 'react'
import CustomModal from '../../CustomComponent/CustomModal'
import AddBoatyards from './AddBoatyards'
import { InputText } from 'primereact/inputtext'
import {
  BoatYardData,
  BoatYardPayload,
  BoatYardResponse,
  MooringResponseDtoList,
  TechnicianPayload,
} from '../../../Type/ApiTypes'
import { useGetBoatyardsMutation } from '../../../Services/MoorManage/MoormanageApi'
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

const Boatyards = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [boatyardsData, setboatyardsData] = useState<BoatYardPayload[]>([])
  const [filteredboatyardsData, setFilteredboatyardsData] = useState<BoatYardPayload[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [expandedRows, setExpandedRows] = useState<any>(undefined)
  const [getBoatyards] = useGetBoatyardsMutation()
  const [selectedCustomer, setSelectedCustomer] = useState<any>(undefined)
  const [editMode, setEditMode] = useState(false)
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(null)

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

  const rowExpansionTemplate = (data: Product) => {
    return (
      <DataTable value={data.orders}>
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
          field="boatyardGpsCoordinates"
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
        body: () => {},
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
        field: 'totalMooringInventoried',
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

  return (
    <>
      <Header header="MOORMANAGE/Boatyards" />
      <div className="flex justify-end mr-14 mt-14">
        <div className="flex gap-6 mr-8">
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
                customerData={selectedCustomer}
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
            }}
            dialogStyle={{
              width: '800px',
              minWidth: '800px',
              height: '630px',
              minHeight: '630px',
              borderRadius: '1rem',
              maxHeight: '95% !important',
            }}
          />
        </div>
      </div>
      <div className=" flex  ml-20  gap-10 mt-10">
        <div
          data-testid="dataTable"
          className="bg-[#FFFFFF] rounded-xl border-[1px] border-gray-300 w-[515px] h-[650px] mb-60">
          <InputTextWithHeader
            header={properties.boatyardDetail}
            placeholder={'Search by name, ID,address...'}
            headerStyle={{
              backgroundColor: '#00426F',
              color: '#FFFFFF',
              borderTopLeftRadius: '10px',
              borderTopRightRadius: '10px',
            }}
            iconStyle={{ marginLeft: '1.5rem', color: '#00426F' }}
            inputTextStyle={{
              height: '44px',
              width: '480px',
              margin: '1rem',
              cursor: 'pointer',
              color: '#A4A4A4',
              border: '1px solid  #9F9F9F',
              paddingLeft: '2.5rem',
              borderRadius: '5px',
              fontSize: '0.80rem',
              backgroundColor: 'F2F2F2',
            }}
          />
          <div></div>
          <div className="bg-#00426F overflow-x-hidden overflow-y-scroll ">
            <DataTableWithToogle
              data={boatyardsData}
              rowExpansionTemplate={rowExpansionTemplate}
              onRowToggle={(e: any) => {
                setExpandedRows(e.data)
              }}
              expandedRows={expandedRows}
              dataKey="id"
              columns={boatYardColumns}
            />
          </div>
        </div>

        <div
          data-testid="customer-admin-users-table"
          className=" bg-[#FFFFFF]  rounded-xl border-[1px]  mr-20  border-gray-300 w-[515px] h-[650px] mb-60">
          <div className="text-sm font-extrabold rounded-sm w-full   bg-[#D9D9D9]">
            <div
              className="flex  align-items-center justify-between  bg-[#00426F] rounded-tl-[10px] rounded-tr-[10px]"
              style={{ color: '#FFFFFF' }}>
              <h1 className="p-4">{properties.boatyardMooringHeader}</h1>
            </div>
          </div>
          <div className=" bg-[] mt-3 ">
            <div
              className="flex justify-start gap-14 ml-4  "
              style={{ fontSize: '12px', fontWeight: '700' }}>
              <p>{properties.address}</p>
              <p>{properties.mooringInventoried}</p>
              <p>{properties.boatyardGPSCoordinates}</p>
            </div>
          </div>

          <div className="border-[1px] border-[#D5E1EA]  w-[full] mt-3 "></div>
          <div className="flex justify-start gap-14  mt-2  font-normal text-[12px]">
            <p className="ml-3.5">123 Elm St</p>
            <p className="w-15">25</p>
            <p className="ml-24  underline">38 21.806 144</p>
          </div>
          {/* </div> */}
          <div className="w-[512px] h-[150px] p-3.5 ">
            <CustomSelectPositionMap onPositionChange={handlePositionChange} zoomLevel={50} />
          </div>
          <div className="overflow-x-hidden overflow-y-scroll  ">
            <DataTableComponent
              tableStyle={{
                fontSize: '12px',
                color: '#000000',
                fontWeight: 400,
              }}
              scrollable={true}
              data={boatyardMooring}
              columns={tableColumnsTechnicians}
              actionButtons={ActionButtonColumn}
              style={{ borderBottom: '1px solid #D5E1EA', fontWeight: '500' }}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Boatyards
