import { useEffect, useMemo, useState } from 'react'
import CustomModal from '../../CustomComponent/CustomModal'
import AddBoatyards from './AddBoatyards'
import { InputText } from 'primereact/inputtext'
import { BoatYardData, BoatYardPayload, BoatYardResponse } from '../../../Type/ApiTypes'
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

const Boatyards = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [boatyardsData, setboatyardsData] = useState<BoatYardPayload[]>([])
  const [filteredboatyardsData, setFilteredboatyardsData] = useState<BoatYardPayload[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [expandedRows, setExpandedRows] = useState<any>(undefined)
  const [getBoatyards] = useGetBoatyardsMutation()
  const [selectedCustomer, setSelectedCustomer] = useState<any>(undefined)
  const [editMode, setEditMode] = useState(false)

  const moorings: BoatYardData[] = [
    {
      id: '#9715',
      moorings: 'Pioneer',
      boatyards: 2,
      name: 'John smith',
      phoneNumber: '+1 234 543 4324',
      email: 'demo@gmail.com',
      boatyardDetails: [
        {
          id: 1,
          name: 'Pioneer',
          address: '123 Elm St',
          phone: '+1 234 543 4324',
          mooring: 15,
          mooringDetails: [
            {
              id: '#46645',
              mainContact: 'Maxwell',
              mooringNumber: '54345',
              boatName: 'Sunriase',
            },
            {
              id: '#46645',
              mainContact: 'Maxwell',
              mooringNumber: '54345',
              boatName: 'Sunriase',
            },
            {
              id: '#46645',
              mainContact: 'Maxwell',
              mooringNumber: '54345',
              boatName: 'Sunriase',
            },
            {
              id: '#46645',
              mainContact: 'Maxwell',
              mooringNumber: '54345',
              boatName: 'Sunriase',
            },
          ],
        },
        {
          id: 1,
          name: 'Pioneer',
          address: '123 Elm St',
          phone: '+1 234 543 4324',
          mooring: 15,
          mooringDetails: [
            {
              id: '#46645',
              mainContact: 'Maxwell',
              mooringNumber: '54345',
              boatName: 'Sunriase',
            },
            {
              id: '#46645',
              mainContact: 'Maxwell',
              mooringNumber: '54345',
              boatName: 'Sunriase',
            },
            {
              id: '#46645',
              mainContact: 'Maxwell',
              mooringNumber: '54345',
              boatName: 'Sunriase',
            },
            {
              id: '#46645',
              mainContact: 'Maxwell',
              mooringNumber: '54345',
              boatName: 'Sunriase',
            },
          ],
        },
      ],
    },
    {
      id: '#9715',
      moorings: 'Pioneer',
      boatyards: 2,
      name: 'John smith',
      phoneNumber: '+1 234 543 4324',
      email: 'demo@gmail.com',
      boatyardDetails: [
        {
          id: 1,
          name: 'Pioneer',
          address: '123 Elm St',
          phone: '+1 234 543 4324',
          mooring: 15,
          mooringDetails: [
            {
              id: '#46645',
              mainContact: 'Maxwell',
              mooringNumber: '54345',
              boatName: 'Sunriase',
            },
            {
              id: '#46645',
              mainContact: 'Maxwell',
              mooringNumber: '54345',
              boatName: 'Sunriase',
            },
            {
              id: '#46645',
              mainContact: 'Maxwell',
              mooringNumber: '54345',
              boatName: 'Sunriase',
            },
            {
              id: '#46645',
              mainContact: 'Maxwell',
              mooringNumber: '54345',
              boatName: 'Sunriase',
            },
          ],
        },
        {
          id: 1,
          name: 'Pioneer',
          address: '123 Elm St',
          phone: '+1 234 543 4324',
          mooring: 15,
          mooringDetails: [
            {
              id: '#46645',
              mainContact: 'Maxwell',
              mooringNumber: '54345',
              boatName: 'Sunriase',
            },
            {
              id: '#46645',
              mainContact: 'Maxwell',
              mooringNumber: '54345',
              boatName: 'Sunriase',
            },
            {
              id: '#46645',
              mainContact: 'Maxwell',
              mooringNumber: '54345',
              boatName: 'Sunriase',
            },
            {
              id: '#46645',
              mainContact: 'Maxwell',
              mooringNumber: '54345',
              boatName: 'Sunriase',
            },
          ],
        },
      ],
    },
  ]

  const handleButtonClick = () => {
   // setModalVisible(true)
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
    headerStyle: { backgroundColor: '#F2F2F2', color: 'black' },
    style: { borderBottom: '1px solid #C0C0C0' },
  }
  const tableColumnsTechnicians = useMemo(
    () => [
      {
        id: 'id',
        label: 'ID',
        style: {
          width: '4vw',
          backgroundColor: '#F2F2F2',
          borderBottom: '1px solid #C0C0C0',
          color: 'black',
        },
      },
      {
        id: 'mainContact',
        label: 'Main Contact',
        style: {
          width: '9vw',
          backgroundColor: '#F2F2F2',
          borderBottom: '1px solid #C0C0C0',
          color: 'black',
        },
      },
      {
        id: 'mooringId',
        label: 'Mooring ID',
        style: {
          width: '9vw',
          backgroundColor: '#F2F2F2',
          borderBottom: '1px solid #C0C0C0',
          color: 'black',
        },
      },
      {
        id: 'boatName',
        label: 'Boat Name',
        body: (rowData: { mooringResponseDtoList: any }) =>
          rowData.mooringResponseDtoList[0].boatName,
        style: {
          width: '12vw',
          backgroundColor: '#F2F2F2',
          borderBottom: '1px solid #C0C0C0',
          color: 'black',
        },
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
          if (status === 200 && Array.isArray(content)) {
            setboatyardsData(content)
            setFilteredboatyardsData(content)
          }
        })
    } catch (error) {
      console.error('Error fetching getBoatyardsdata:', error)
    }
  }
  useEffect(() => {
    getBoatyardsData()
  }, [])

  useEffect(() => {
    const productsData = getProductsWithOrdersData()
    setProducts(productsData)
  }, [])

  const allowExpansion = (rowData: Product): boolean => {
    return !!rowData.orders && rowData.orders.length > 0
  }

  const rowExpansionTemplate = (data: Product) => {
    return (
      <DataTable value={data.orders}>
        <Column
          field="address"
          header="Address"
          style={{
            width: '',
            backgroundColor: '#F2F2F2',
            fontSize: '0.80rem',
            borderBottom: '1px solid #C0C0C0',
          }}
        />
        <Column
          field="mooringInventoried"
          header="Mooring Inventoried"
          style={{
            width: '14rem',
            backgroundColor: '#F2F2F2',
            fontSize: '0.80rem',
            borderBottom: '1px solid #C0C0C0',
          }}
        />
        <Column
          field="boatyardGpsCoordinates"
          header="Boatyard GPS Coordinates"
          style={{
            width: '14rem',
            fontSize: '0.80rem',
            backgroundColor: '#F2F2F2',
            borderBottom: '1px solid #C0C0C0',
          }}
        />
      </DataTable>
    )
  }

  const columns = useMemo(
    () => [
      {
        field: 'id',
        header: 'ID',
        style: {
          width: '8rem',
          backgroundColor: '#F2F2F2',
          fontSize: '0.80rem',
          color: 'black',
          fontWeight: 'bold',
        },
        body: () => {},
      },
      {
        field: 'name',
        header: 'Name',
        style: {
          width: '8rem',
          backgroundColor: '#F2F2F2',
          fontSize: '0.80rem',
          color: 'black',
          fontWeight: 'bold',
        },
      },
      {
        field: 'noOfBoatYards',
        header: 'No.of Boatyards',
        style: {
          width: '24rem',
          backgroundColor: '#F2F2F2',
          fontSize: '0.80rem',
          color: 'black',
          fontWeight: 'bold',
        },
      },
      {
        field: 'totalMooringInventoried',
        header: 'Total Mooring Inventoried',
        style: {
          width: '28rem',
          backgroundColor: '#F2F2F2',
          fontSize: '0.80rem',
          color: 'black',
          fontWeight: 'bold',
        },
      },
      {
        field: '',
        header: '',
        expander: allowExpansion,
        style: { backgroundColor: '#F2F2F2' },
      },
    ],
    [allowExpansion],
  )
  return (
    <>
      <Header header="MOORMANAGE/Boatyards" />
      <div className="flex justify-end mr-14 mt-14">
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
                customerData={selectedCustomer}
                editMode={editMode}
              />
            }
            headerText={<h1 className="text-xl font-extrabold text-black ml-4">New User</h1>}
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
      <div className="ml-8 flex gap-4 mt-10">
        <div
          data-testid="dataTable"
          className="bg-[F2F2F2] overflow-x-hidden overflow-y-scroll  rounded-md border-[1px]  border-gray-300 w-[40vw] h-[55vh] mb-60">
          <InputTextWithHeader
            header={properties.boatyardDeatile}
            placeholder={'Search by name, ID,address...'}
            iconStyle={{ marginLeft: '1rem', color: '#A4A4A4' }}
            inputTextStyle={{
              height: '5vh',
              width: '80vh',
              cursor: 'pointer',
              color: '#A4A4A4',
              border: '1px solid  #9F9F9F',
              paddingLeft: '3rem',
              borderRadius: '0.45rem',
              fontSize: '0.80rem',
            }}
          />
          <div></div>
          <DataTableWithToogle
            data={products}
            rowExpansionTemplate={rowExpansionTemplate}
            onRowToggle={(e: any) => setExpandedRows(e.data)}
            expandedRows={expandedRows}
            dataKey="id"
            columns={columns}
          />
        </div>
        <div
          data-testid="customer-admin-users-table"
          className="bg-[F2F2F2]  rounded-md border-[1px]  border-gray-300 w-[33vw] h-[55vh] mb-60">
          <div className="text-sm font-extrabold rounded-sm w-full  bg-[#D9D9D9]">
            <h1 className="p-4">{properties.boatyardMooringHeader}</h1>
          </div>
          <div className="items-center bg-[#F2F2F2] mt-2">
            <div className="flex justify-around">
              <p>{properties.address}</p>
              <p>{properties.mooringInventoried}</p>
              <p>{properties.boatyardGPSCoordinates}</p>
            </div>
            <div className="border-[1px] border-[#9F9F9F]  w-[] mt-3 "></div>
            <div className="flex justify-between mt-2">
              <p className="ml-8">123 Elm St</p>
              <p>25</p>
              <p className="mr-[7.50rem]">38 21.806 144</p>
            </div>
          </div>
          <DataTableComponent
            tableStyle={{
              fontSize: '12px',
              color: '#000000',
              fontWeight: 600,
            }}
            data={boatyardsData}
            columns={tableColumnsTechnicians}
            actionButtons={ActionButtonColumn}
          />
        </div>
      </div>
    </>
  )
}

export default Boatyards
