import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import CustomModal from '../../CustomComponent/CustomModal'
import AddBoatyards from './AddBoatyards'
import { InputText } from 'primereact/inputtext'
import {
  BoatYardData,
  BoatYardPayload,
  BoatYardResponse,
  DeleteCustomerResponse,
  ErrorResponse,
  MooringWithBoatYardResponse,
} from '../../../Type/ApiTypes'
import {
  useDeleteBoatyardsMutation,
  useDeleteCustomerMutation,
  useGetBoatyardsMutation,
  useGetMooringWithBoatyardMutation,
} from '../../../Services/MoorManage/MoormanageApi'
import DataTableWithToogle from '../../CommonComponent/Table/DataTableWithToogle'
import { ActionButtonColumnProps, Product } from '../../../Type/Components/TableTypes'
import InputTextWithHeader from '../../CommonComponent/Table/InputTextWithHeader'
import DataTableComponent from '../../CommonComponent/Table/DataTableComponent'
import { properties } from '../../Utils/MeassageProperties'
import Header from '../../Layout/LayoutComponents/Header'
import { IoSearchSharp } from 'react-icons/io5'
import '../Boatyards/Boatyard.module.css'
import CustomDisplayPositionMap from '../../Map/CustomDisplayPositionMap'
import { Toast } from 'primereact/toast'
import { Params } from '../../../Type/CommonType'
import { Dialog } from 'primereact/dialog'
import { ProgressSpinner } from 'primereact/progressspinner'
import { useSelector } from 'react-redux'
import { selectCustomerId } from '../../../Store/Slice/userSlice'
import { FaEdit } from 'react-icons/fa'
import { RiDeleteBin5Fill } from 'react-icons/ri'

const Boatyards = () => {
  const selectedCustomerId = useSelector(selectCustomerId)
  const userData = useSelector((state: any) => state.user?.userData)
  const role = userData?.role?.id
  const [modalVisible, setModalVisible] = useState(false)
  const [boatyardsData, setboatyardsData] = useState<BoatYardPayload[]>([])

  // console.log("boatyardsData", boatyardsData[0].id);

  const [mooringWithBoatyardsData, setMooringWithBoatyardsData] = useState<
    MooringWithBoatYardResponse[]
  >([])
  const [filteredboatyardsData, setFilteredboatyardsData] = useState<BoatYardPayload[]>([])
  const [expandedRows, setExpandedRows] = useState<any>()
  const [selectedBoatYard, setSelectedBoatYard] = useState<any>()

  const [selectedProduct, setSelectedProduct] = useState()
  const [editMode, setEditMode] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [searchFieldText, setSearchFieldText] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isLoader, setIsLoader] = useState(false)
  const [dialogVisible, setDialogVisible] = useState(false)
  const [mooringRowData, setMooringRowData] = useState<any>([])
  const [boatYardRecord, setBoatyardRecord] = useState(false)

  const [getBoatyards] = useGetBoatyardsMutation()
  const [deleteBoatyard] = useDeleteBoatyardsMutation()
  const [getMooringsWithBoatyard] = useGetMooringWithBoatyardMutation()

  const toast = useRef<Toast>(null)

  const handleMooringTableRowClick = (rowData: any) => {
    setDialogVisible(true)
    setMooringRowData(rowData)
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchFieldText('')
    setSearchText(e.target.value)
    setSelectedBoatYard('')
    setMooringRowData('')
  }

  const handleSearchField = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText('')
    setSearchFieldText(e.target.value)
  }


  const handleButtonClick = () => {
    setModalVisible(true)
  }

  const handleModalClose = () => {
    setModalVisible(false)
    setEditMode(false)
    // setSelectedBoatYard('')
    setMooringRowData('')
  }

  const ActionButtonColumn: ActionButtonColumnProps = {
    header: '',
    buttons: [
      {
        color: 'red',
        label: 'view',
        underline: true,
        onClick: (rowData) => {
          handleMooringTableRowClick(rowData)
        },
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
    padding: '15px',
  }

  const rowExpansionColumn = useMemo(
    () => [
      {
        id: 'street',
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
              fontSize: '14px',
              color: '#000000',
              padding: '5rem',
            }}
            data={[data]}
            columns={rowExpansionColumn}
            style={{ fontWeight: '500', backgroundColor: '#ECF3F9' }}
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
    fontSize: '13px',
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
        field: 'emailAddress',
        header: 'Email Address',
        style: columnStyle,
      },
      {
        field: 'mooringInventoried',
        header: 'Total Mooring Inventoried',
        style: columnStyle,
      },
      // {
      //   field: '',
      //   header: '',
      //   expander: allowExpansion,
      //   style: { backgroundColor: '#FFFFFF', borderBottom: '1px solid #D5E1EA ' },
      // },
    ],
    [allowExpansion],
  )

  const handleRowClickBoatYardDetail = (rowData: any) => {
    // alert("hi")
    setIsLoader(true)
    setSelectedBoatYard('')
    setMooringWithBoatyardsData([])
    setBoatyardRecord(true)
    const timeoutId = setTimeout(() => {
      setSelectedBoatYard(rowData.data)
    }, 600)
    return () => clearTimeout(timeoutId)
  }

  const handleEdit = () => {
    if (boatYardRecord == true) {
      setModalVisible(true)
      setEditMode(true)
    }
  }

  const handleDelete = async () => {
    if (boatYardRecord == true) {
      try {
        const response = await deleteBoatyard({ id: selectedBoatYard?.id }).unwrap()
        const { status, message } = response as DeleteCustomerResponse
        if (status === 200) {
          toast.current?.show({
            severity: 'success',
            summary: 'Success',
            detail: 'BoatYard deleted successfully',
            life: 3000,
          })
          setSelectedBoatYard('')
          getBoatyardsData()
        } else {
          toast.current?.show({
            severity: 'error',
            summary: 'Error',
            detail: message,
            life: 3000,
          })
        }
      } catch (error) {
        const { message } = error as ErrorResponse
        toast.current?.show({
          severity: 'error',
          summary: 'Error',
          detail: 'Error while deleting customer',
          life: 3000,
        })
      }
    }

    setBoatyardRecord(false)
  }

  const parseCoordinates = (coordinates: any) => {
    if (!coordinates) return null
    const [latitude, longitude] = coordinates.split(' ').map(parseFloat)
    return isNaN(latitude) || isNaN(longitude) ? null : [latitude, longitude]
  }

  const [latitude, longitude] = parseCoordinates(selectedBoatYard?.gpsCoordinates) || []

  const getBoatyardsData = useCallback(async () => {
    setIsLoading(true)
    try {
      let params: Params = {}
      if (searchText) {
        params.searchText = searchText
      }
      if (searchFieldText) {
        params.searchText = searchFieldText
      }
      await getBoatyards(params)
        .unwrap()
        .then(async (response) => {
          const { status, content, message } = response as BoatYardResponse
          if (status === 200 && Array.isArray(content)) {
            setboatyardsData(content)
            if (selectedBoatYard) {
              const data = content.find((data) => data.id === selectedBoatYard.id)
              if (data) {
                setSelectedBoatYard(data)
              }
            }
            setFilteredboatyardsData(content)
            const timeoutId = setTimeout(() => {
              setIsLoading(false)
            }, 400)
            return () => {
              clearTimeout(timeoutId)
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
        })
    } catch (error) {
      const { message } = error as ErrorResponse
      console.error('Error fetching getBoatyardsdata:', message)
    }
  }, [getBoatyards, searchText, searchFieldText, selectedCustomerId, selectedBoatYard])

  const getMooringsWithBoatyardData = async () => {
    try {
      await getMooringsWithBoatyard({ id: selectedBoatYard?.id })
        .unwrap()
        .then(async (response) => {
          const { status, content } = response as MooringWithBoatYardResponse
          if (status === 200 && Array.isArray(content) && content.length > 0) {
            setIsLoading(false)
            setMooringWithBoatyardsData(content)
          } else {
            setIsLoading(false)
          }
        })
    } catch (error) {
      const { message } = error as ErrorResponse
      console.error('Error fetching getMooringsWithBoatyardData:', error)
    }
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      getBoatyardsData()
    }, 2000)
    return () => clearTimeout(timeoutId)
  }, [searchText, selectedCustomerId, searchFieldText])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (selectedBoatYard) getMooringsWithBoatyardData()
    }, 600)
    return () => clearTimeout(timeoutId)
  }, [selectedBoatYard])

  useEffect(() => {
    setIsLoader(true)
    const timeoutId = setTimeout(() => {
      setIsLoader(false)
    }, 400)
    return () => {
      clearTimeout(timeoutId)
    }
  }, [selectedBoatYard])

  const random = useMemo(() => {
    return (
      <AddBoatyards
        closeModal={handleModalClose}
        boatYardData={getBoatyardsData}
        customerData={selectedBoatYard}
        editMode={editMode}
        setModalVisible={setModalVisible}
        toastRef={toast}
      />
    )
  }, [selectedBoatYard, getBoatyardsData, editMode, toast, setModalVisible, handleModalClose])

  const BoatyardMoorings = useMemo(() => {
    return (
      <>
        <div
          className={`flex justify-between mt-4 p-3 ml-5 font-normal text-[12px] ${isLoader ? 'blur-screen' : ''}`}>
          <p className="">
            {selectedBoatYard?.street} {selectedBoatYard?.apt} ,
            {selectedBoatYard?.stateResponseDto?.name} ,{selectedBoatYard?.countryResponseDto?.name}
          </p>
          <p className="mr-[13rem]">{selectedBoatYard?.mooringInventoried}</p>
          <p className="underline mr-[4rem]">{selectedBoatYard?.gpsCoordinates}</p>
        </div>

        <div
          className={`h-[150px] mt-[30px] mb-6 sticky ${isLoader || modalVisible ? 'blur-screen' : ''}`}
          style={{
            flexGrow: 1,
            border: '1px solid #D5E1EA',
            borderRadius: '10px',
            padding: '0px',
            marginLeft: '10px',
            marginRight: '10px',
          }}>
          <CustomDisplayPositionMap position={[latitude, longitude]} zoomLevel={10} />
        </div>

        {isLoader && (
          <ProgressSpinner
            style={{
              position: 'absolute',
              top: '50%',
              left: '73%',
              transform: 'translate(-50%, -50%)',
              width: '50px',
              height: '50px',
            }}
            strokeWidth="4"
          />
        )}
        <div className="bg-#00426F overflow-x-hidden  mt-[13px] h-[250px] table-container  ">
          <DataTableComponent
            tableStyle={{
              fontSize: '12px',
              color: '#000000',
            }}
            data={mooringWithBoatyardsData ? mooringWithBoatyardsData : undefined}
            columns={tableColumnsTechnicians}
            actionButtons={ActionButtonColumn}
            selectionMode="single"
            dataKey="id"
            onSelectionChange={(e) => {
              setSelectedProduct(e.value)
            }}
            selection={selectedProduct}
            rowStyle={(rowData: any) => rowData}
            style={{
              borderBottom: '1px solid #D5E1EA',
              marginLeft: '5px',
              fontWeight: '400',
              color: '#000000',
            }}
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
      </>
    )
  }, [selectedBoatYard, boatyardsData])

  return (
    <div className={modalVisible ? 'backdrop-blur-lg' : ''}>
      <Toast ref={toast} />
      <Header header="MOORMANAGE/Boatyards" />
      <div className="flex justify-end mr-14 mt-6 ">
        <div className="flex gap-6 ">
          <div>
            <div className="p-input-icon-left">
              <IoSearchSharp className="ml-2 text-blue-900" />
              <InputText
                value={searchFieldText}
                onChange={handleSearchField}
                placeholder="Search"
                className="h-[44px] w-[237px] cursor-pointer pl-8 rounded-lg text-bold "
              />
            </div>
          </div>
          <CustomModal
            buttonText={'ADD NEW'}
            buttonStyle={{
              width: '121px',
              height: '44px',
              minHeight: '44px',
              backgroundColor: '#0098FF',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 600,
              color: 'white',
              borderRadius: '0.50rem',
              marginLeft: '8px',
              boxShadow: 'none',
            }}
            icon={
              <img src="/assets/images/Plus.png" alt="icon" className="w-3.8 h-3.8 ml-4 mb-0.5" />
            }
            children={random}
            headerText={<h1 className="text-xl font-extrabold text-black ml-4">Add Boatyard</h1>}
            visible={modalVisible}
            onClick={handleButtonClick}
            onHide={handleModalClose}
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
        className="ml-[50px] gap-[19px] mt-5"
        style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <div
          data-testid="dataTable"
          className="flex-grow  bg-[#FFFFFF] rounded-xl border-[1px] border-[#D5E1EA] w-[515px] h-[732px] mb-0 ">
          <div className="text-sm font-extrabold rounded-sm w-full bg-[#D9D9D9]">
            <div
              className="flex  align-items-center justify-between bg-[#00426F] rounded-tl-[10px] rounded-tr-[10px]"
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
              top: '65%',
              transform: 'translateY(-50%)',
              width: '16px',
              height: '16px',
              fontWeight: 'bold',
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
          <div className="bg-#00426F overflow-x-hidden  h-[500px] mt-[3px] ml-[15px] mr-[15px] table-container  ">
            <DataTableWithToogle
              tableStyle={{
                fontSize: '12px',
                color: '#000000',
                fontWeight: 600,
                backgroundColor: '#D9D9D9',
                cursor: 'pointer',
              }}
              data={boatyardsData}
              // rowExpansionTemplate={rowExpansionTemplate}
              // onRowToggle={(e: any) => {
              //   setExpandedRows(e.data)
              // }}
              // expandedRows={expandedRows}
              selectionMode="single"
              onSelectionChange={(e: any) => {
                setSelectedProduct(e.value)
              }}
              selection={selectedProduct}
              rowStyle={(rowData: any) => rowData}
              dataKey="id"
              columns={boatYardColumns}
              onRowClick={(e: any) => handleRowClickBoatYardDetail(e)}
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

        <div
          // style={{border:"1px solid red"}}
          data-testid="customer-admin-users-table"
          className=" flex-grow bg-[#FFFFFF] rounded-xl border-[1px] border-gray-300 w-[515px] h-[732px] mr-[50px]  mb-0 ">
          <div className="">
            <div className="text-sm font-extrabold rounded-sm w-full bg-[#D9D9D9]">
              <div
                className="flex align-items-center justify-between bg-[#00426F] rounded-tl-[10px] rounded-tr-[10px]"
                style={{ color: '#FFFFFF' }}>
                <h1 className="p-4">{properties.boatyardMooringHeader}</h1>
                <div className="flex">
                  <FaEdit
                    onClick={handleEdit}
                    className="mr-4 mt-3  text-[white]"
                    data-testid="FaEdit"
                    style={{ cursor: boatYardRecord ? 'pointer' : 'not-allowed' }}
                  />
                  <RiDeleteBin5Fill
                    onClick={handleDelete}
                    className="text-white mr-4 mt-3"
                    data-testid="RiDeleteBin5Fill"
                    style={{ cursor: boatYardRecord ? 'pointer' : 'not-allowed' }}
                  />
                </div>
              </div>
            </div>
            <div className={`bg-[] mt-3 ml-5 ${isLoader ? 'blur-screen' : ''}`}>
              <div
                className="flex justify-between p-3 mt-[10px] mr-10"
                style={{ fontSize: '10px', fontWeight: '700', lineHeight: '11.72px' }}>
                <p>{properties.address}</p>
                <p className="">{properties.mooringInventoried}</p>
                <p className="">{properties.boatyardGPSCoordinates}</p>
              </div>
            </div>
            <div className="mt-4">
              <hr style={{ border: '1px solid #D5E1EA' }} />
            </div>
          </div>

          {isLoading && (
            <ProgressSpinner
              style={{
                position: 'absolute',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                width: '50px',
                height: '50px',
              }}
              strokeWidth="4"
            />
          )}

          {selectedBoatYard ? (
            BoatyardMoorings
          ) : (
            <div className="text-center mt-40 mb-10">
              <img src="/assets/images/empty.png" alt="Empty Data" className="w-20 mx-auto mb-4" />
              <p className="text-gray-500">No data available</p>
            </div>
          )}
        </div>

        {/* Dialog BOX */}
        <div>
          <Dialog
            draggable={false}
            visible={dialogVisible}
            style={{
              width: '740px',
              minWidth: '300px',
              height: '490px',
              minHeight: '200px',
              borderRadius: '1rem',
              maxHeight: '50% !important',
            }}
            onHide={() => setDialogVisible(false)}
            header={
              <div className="flex gap-4">
                <div className="font-bolder text-[black]">Mooring Information</div>
                {/* <div className="font-bold mt-1">
                    <FaEdit onClick={handleEdit} color="#0098FF" />
                  </div> */}
              </div>
            }>
            <hr className="border border-[#000000] my-0 mx-0"></hr>

            <div
              style={{
                fontSize: '14px',
                fontWeight: '300',
                color: '#000000',
              }}
              className="flex leading-[3.50rem] gap-32 p-4">
              <div>
                <p>
                  <span>ID : </span> {mooringRowData?.id}
                </p>
                <p>
                  <span>Mooring ID : </span> {mooringRowData?.mooringId}
                </p>
                <p>
                  <span>Boat Name : </span> {mooringRowData?.boatName}
                </p>

                <p>
                  <span>Type : </span> {mooringRowData?.boatType?.boatType}
                </p>
                <p className="flex gap-1">
                  <span>Size of Weight : </span> {mooringRowData?.sizeOfWeight?.weight}
                  <span>{mooringRowData?.sizeOfWeight?.unitType}</span>
                </p>

                <p>
                  <span>Top Chain Condition : </span> {mooringRowData?.topChainCondition?.condition}
                </p>
                <p className="tracking-tighter">
                  <span>Bottom Chain Condition : </span>{' '}
                  {mooringRowData?.bottomChainCondition?.condition}
                </p>
                <p>
                  <span>Pennant Condition : </span> {mooringRowData?.pennantCondition?.condition}
                </p>
                <p>
                  <span>Water Depth : </span> {mooringRowData?.waterDepth}
                </p>
              </div>
              <div>
                <p>
                  <span>Harbor : </span> {mooringRowData?.harbor}
                </p>
                <p>
                  <span>G.P.S Coordinates : </span> {mooringRowData?.gpsCoordinates}
                </p>
                <p>
                  <span>Boatyard Name : </span> {mooringRowData?.boatyardName}
                </p>
                <p>
                  <span>Customer Name : </span> {mooringRowData?.customerName}
                </p>
                <p>
                  <span>Boat Size : </span> {mooringRowData?.boatSize}
                </p>
                <p>
                  <span>Weight : </span> {mooringRowData?.boatWeight}
                </p>
                <p>
                  <span>Type of Weight : </span> {mooringRowData?.typeOfWeight?.type}
                </p>
                <p>
                  <span>Condition of Eye : </span> {mooringRowData?.eyeCondition?.condition}
                </p>
                <p>
                  <span>Shackle, Swivel Condition : </span>{' '}
                  {mooringRowData?.shackleSwivelCondition?.condition}
                </p>
              </div>
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  )
}

export default Boatyards
