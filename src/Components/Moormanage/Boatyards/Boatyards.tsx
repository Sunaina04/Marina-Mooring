import { useEffect, useMemo, useState } from 'react'
import CustomModal from '../../CustomComponent/CustomModal'
import AddBoatyards from './AddBoatyards'
import { InputText } from 'primereact/inputtext'
import { BoatYardPayload, BoatYardResponse } from '../../../Type/ApiTypes'
import { useGetBoatyardsMutation } from '../../../Services/MoorManage/MoormanageApi'
import DataTableWithToogle from '../../CommonComponent/Table/DataTableWithToogle'
import { ActionButtonColumnProps, Product } from '../../../Type/Component/Table'
import { IoSearch } from 'react-icons/io5'
import { boatyardMooring, getProductsWithOrdersData } from '../../Utils/CustomData'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import InputTextWithHeader from '../../CommonComponent/Table/InputTextWithHeader'
import DataTableComponent from '../../CommonComponent/Table/DataTableComponent'
import { FaSearch } from 'react-icons/fa'

const Boatyards = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [boatyardsData, setboatyardsData] = useState<BoatYardPayload[]>([])
  const [filteredboatyardsData, setFilteredboatyardsData] = useState<BoatYardPayload[]>([])
  const [getBaotyards] = useGetBoatyardsMutation()

  const [products, setProducts] = useState<Product[]>([])
  const [expandedRows, setExpandedRows] = useState<any>(undefined)

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
    headerStyle: { backgroundColor: '#F2F2F2', color: 'black' },
    style: { borderBottom: '1px solid #C0C0C0' },
  }

  const tableColumnsTechnicians= useMemo(
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
        id: 'boatName',
        label: 'Boat Name',
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

  const getBaotyardsData = async () => {
    try {
      await getBaotyards({})
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
    getBaotyardsData()
  }, [])

  useEffect(() => {
    const productsData = getProductsWithOrdersData()
    setProducts(productsData)
  }, [])

  const allowExpansion = (rowData: Product): boolean => {
    console.log('rowData', rowData)

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
      <div className="flex justify-between items-center ml-12">
        <h1 className="mt-14 ml-28 opacity-30 text-2xl font-normal">MOORMANAGE/Boatyards</h1>
        <div className="flex gap-4 items-center mr-12 mt-14">
          <div className="flex mr-24">
            <div className="mr-5 relative">
              <FaSearch className="absolute z-10 top-[1.5rem] left-2 text-gray-500" />
              <InputText
                placeholder="Search"
                style={{
                  width: '15vw',
                  height: '7vh',
                  padding: '0 4rem 0 3rem',
                  border: '1px solid gray',
                  fontSize: '1.10vw',
                }}
              />
            </div>

            <CustomModal
              label={'ADD NEW'}
              style={{
                width: '8.5vw',
                height: '7vh',
                backgroundColor: 'black',
                cursor: 'pointer',
                fontSize: '18px',
                fontWeight: 'bold',
                color: 'white',
              }}
              onClick={handleButtonClick}
              visible={false}
              onHide={handleModalClose}>
              <AddBoatyards />
            </CustomModal>
          </div>
        </div>
      </div>
      <div className="ml-8 flex gap-4">
        <div
          data-testid="customer-admin-users-table"
          className="bg-[F2F2F2] overflow-x-hidden overflow-y-scroll  rounded-md border-[1px]  border-gray-300 w-[40vw] h-[55vh] mb-60">
          <InputTextWithHeader
            header={'Boatyards Detail'}
            placeholder={'Search by name, ID,address...'}
            style={{ marginLeft: '1rem', color: '#A4A4A4' }}
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
          <DataTableWithToogle
            data={products}
            rowExpansionTemplate={rowExpansionTemplate}
            onRowToggle={(e) => setExpandedRows(e.data)}
            expandedRows={expandedRows}
            dataKey="id"
            columns={columns}
          />
        </div>
        <div
          data-testid="customer-admin-users-table"
          className="bg-[F2F2F2]  rounded-md border-[1px]  border-gray-300 w-[33vw] h-[55vh] mb-60">
          <div className="text-sm font-extrabold rounded-sm w-full  bg-[#D9D9D9]">
            <h1 className="p-4">Boatyard Moorings</h1>
          </div>
          <div className="items-center bg-[#F2F2F2] mt-2">
            <div className="flex justify-around">
              <p>Address</p>
              <p>Mooring Inventoried</p>
              <p>Boatyard GPS Coordinates</p>
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
            data={boatyardMooring}
            columns={tableColumnsTechnicians}
            actionButtons={ActionButtonColumn}
          />
        </div>
      </div>
    </>
  )
}

export default Boatyards
