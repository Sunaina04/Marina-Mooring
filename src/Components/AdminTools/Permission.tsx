import { useEffect, useMemo, useRef, useState } from 'react'
import CustomModal from '../CustomComponent/CustomModal'
import DataTableComponent from '../CommonComponent/Table/DataTableComponent'
import Header from '../Layout/LayoutComponents/Header'
import { InputText } from 'primereact/inputtext'
import { ActionButtonColumnProps } from '../../Type/Components/TableTypes'
import { useSelector } from 'react-redux'
import {
  CustomerPayload,
  DeleteUserResponse,
  ErrorResponse,
  GetUserResponse,
} from '../../Type/ApiTypes'
import { useDeleteUserMutation, useGetUsersMutation } from '../../Services/AdminTools/AdminToolsApi'
import AddNewCustomer from './AddNewCustomer'
import { Toast } from 'primereact/toast'
import { ProgressSpinner } from 'primereact/progressspinner'
import { Paginator } from 'primereact/paginator'
import { Params } from '../../Type/CommonType'

const Permission = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState<any>()
  const [searchInput, setSearchInput] = useState('')
  const userData = useSelector((state: any) => state.user?.userData)
  const customerAdminId = userData?.id
  const [getUser] = useGetUsersMutation()
  const [deleteUser] = useDeleteUserMutation()
  const [getCustomerOwnerUserData, setgetCustomerOwnerUserData] = useState<CustomerPayload[]>([])
  const toast = useRef<Toast>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [totalRecords, setTotalRecords] = useState<number>()
  const [pageNumber, setPageNumber] = useState(0)
  const [pageNumber1, setPageNumber1] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  

  const onPageChange = (event: any) => {
    setPageNumber(event.page)
    setPageNumber1(event.first)
    setPageSize(event.rows)
  }

  const handleEditButtonClick = (rowData: any) => {
    setEditMode(true)
    setModalVisible(true)
    setSelectedCustomer(rowData)
  }

  const tableColumnsPermission = useMemo(
    () => [
      {
        id: 'id',
        label: 'ID',
        style: {
          borderBottom: '1px solid #C0C0C0',
          backgroundColor: '#00426F',
          color: '#FFFFFF',
          fontWeight: 500,
          borderTopLeftRadius: '10px',
        },
      },
      {
        id: 'name',
        label: 'Name',
        style: {
          borderBottom: '1px solid #C0C0C0',
          backgroundColor: '#00426F',
          color: '#FFFFFF',
          fontWeight: 500,
        },
      },

      {
        id: 'email',
        label: 'Email',
        style: {
          borderBottom: '1px solid #C0C0C0',
          backgroundColor: '#00426F',
          color: '#FFFFFF',
          fontWeight: 500,
        },
      },

      {
        id: 'phoneNumber',
        label: 'Phone',
        style: {
          borderBottom: '1px solid #C0C0C0',
          backgroundColor: '#00426F',
          color: '#FFFFFF',
          fontWeight: 500,
        },
      },

      {
        id: 'roleResponseDto.name',
        label: 'Role',
        style: {
          borderBottom: '1px solid #C0C0C0',
          backgroundColor: '#00426F',
          color: '#FFFFFF',
          fontWeight: 500,
        },
      },
    ],

    [],
  )

  const ActionButtonColumn: ActionButtonColumnProps = {
    header: 'Action',
    style: {
      fontSize: '12px',
      fontWeight: 600,
      borderBottom: '1px solid #D5E1EA',
    },
    buttons: [
      {
        color: 'black',
        label: 'Edit',
        underline: true,
        onClick: (rowData) => handleEditButtonClick(rowData),
      },
      {
        color: 'red',
        label: 'Delete',
        underline: true,

        onClick: (rowData) => handleDeleteButtonClick(rowData),
      },
    ],
    headerStyle: {
      backgroundColor: '#00426F',
      borderBottom: '1px solid #C0C0C0',
      color: '#FFFFFF',
      fontWeight: 500,
      borderTopRightRadius: '10px',
    },
  }

  const handleButtonClick = () => {
    setModalVisible(true)
    setSelectedCustomer('')
  }

  const handleModalClose = () => {
    setModalVisible(false)
    setEditMode(false)
    setSelectedCustomer('')
  }

  const handleDeleteButtonClick = async (rowData: any) => {
    setIsLoading(true)
    try {
      const response = await deleteUser({
        userId: rowData.id,
        customerAdminId: rowData.customerAdminId,
      }).unwrap()
      const { status } = response as DeleteUserResponse
      if (status === 200) {
        setIsLoading(false)
        toast.current?.show({
          severity: 'success',
          summary: 'Success',
          detail: 'User Deleted Successfully ',
          life: 3000,
        })
        getCustomerAdminsUsers()
      }
    } catch (error) {
      const { message } = error as ErrorResponse

      setIsLoading(false)
      console.error('Error occurred while fetching customer data:', error)
    }
  }

  const getCustomerAdminsUsers = async () => {
    setIsLoading(true)
    try {
      let params: Params = {}
      if (searchInput) {
        params.searchText = searchInput
      }
      if (pageNumber) {
        params.pageNumber = pageNumber
      }
      if (pageSize) {
        params.pageSize = pageSize
      }
      const response = await getUser(params).unwrap()
      const { status, content ,totalSize} = response as GetUserResponse
      if (status === 200 && Array.isArray(content)) {
        setIsLoading(false)
        setgetCustomerOwnerUserData(content)
        setTotalRecords(totalSize)
      }
    } catch (error) {
      const { message } = error as ErrorResponse
      setIsLoading(false)
      console.error('Error occurred while fetching customer data:', error)
    }
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      getCustomerAdminsUsers()
    }, 600)
    return () => clearTimeout(timeoutId)
  }, [searchInput, pageNumber, pageSize])

  return (
    <div className={modalVisible ? 'backdrop-blur-lg' : ''}>
      <Header header="MOORMANAGE/Permission" />

      <div className="flex mr-12 justify-end">
        <Toast ref={toast} />
        <div className="mt-5 mr-5 relative">
          <InputText
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value)
              setPageNumber(0)
              setPageNumber1(0)
            }}
            placeholder="Search by name, ID, Role, phone no..."
            style={{
              width: '378px',
              height: '44px',
              padding: '0 4rem 0 3rem',
              border: '1px solid #C5D9E0',
              fontSize: '16px',
              color: '#00426F',
              borderRadius: '4px',
              minHeight: '44px',
              fontWeight: 500,
            }}
          />
          <img
            src="/assets/images/Search.svg"
            alt="Search Icon"
            className="p-clickable"
            style={{
              position: 'absolute',
              left: '10px',
              right: '-10px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '18px',
              height: '18px',
            }}
          />
        </div>

        <div className="mt-[20px]">
          <CustomModal
            buttonText={'ADD NEW'}
            onClick={handleButtonClick}
            icon={
              <img src="/assets/images/Plus.png" alt="icon" className="w-3.8 h-3.8 ml-4 mb-0.5" />
            }
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
            visible={modalVisible}
            onHide={handleModalClose}
            dialogStyle={{
              width: '840px',
              minWidth: '840px',
              height: editMode ? '500px' : '600px',
              minHeight: editMode ? '500px' : '600px',
              borderRadius: '1rem',
              maxHeight: '60% !important',
            }}
            headerText={<h1 className="text-xl font-bold text-#000000 ml-4">New User</h1>}>
            <AddNewCustomer
              customerAdminId={customerAdminId}
              editMode={editMode}
              getUser={getCustomerAdminsUsers}
              closeModal={handleModalClose}
              setIsVisible={setModalVisible}
              setModalVisible={setModalVisible}
              customerData={selectedCustomer}
              permission={true}
              passWordDisplay={editMode}
              toastRef={toast}
              setSelectedCustomerUser={() => { }}
              setSelectedCustomer={() => { }}
            />
          </CustomModal>
        </div>
      </div>

      <div
        className={`flex gap-10 ml-6 mt-8 ${isLoading ? 'blur-screen' : ''}`}
        style={{
          paddingRight: '40px',
          paddingLeft: '25px',
        }}>
        <div
          className="bg-[#FFFFFF] border-[1px] border-gray-300  rounded-lg"
          style={{
            flexGrow: 1,
            borderRadius: '10px',
            // height: '550px',
            minHeight: 'calc(40vw - 550px)',
            // overflow: 'auto',
          }}>
          <div
            data-testid="customer-admin-data"
            className="flex flex-col  "
            style={{ height: '550px' }}
          >
            <div className="flex-grow overflow-auto">
              <DataTableComponent
                tableStyle={{
                  fontSize: '12px',
                  color: '#000000',
                  fontWeight: 600,
                  backgroundColor: '#D9D9D9',
                  borderRadius: '0 0 10px 10px',
                  overflow: 'auto',
                }}
                scrollable={true}
                data={getCustomerOwnerUserData}
                columns={tableColumnsPermission}
                actionButtons={ActionButtonColumn}
                style={{ borderBottom: '1px solid #D5E1EA', fontWeight: '500' }}
                emptyMessage={
                  <div className="text-center mt-14">
                    <img
                      src="/assets/images/empty.png"
                      alt="Empty Data"
                      className="w-20 mx-auto mb-4"
                    />
                    <p className="text-gray-500">No data available</p>
                    {isLoading && (
                      <ProgressSpinner
                        style={{
                          position: 'absolute',
                          top: '80%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          width: '50px',
                          height: '50px',
                        }}
                        strokeWidth="4"
                      />
                    )}
                  </div>
                } />
            </div>
            <div className="mt-auto">
              <Paginator
                first={pageNumber1}
                rows={pageSize}
                totalRecords={totalRecords}
                rowsPerPageOptions={[5, 10, 20, 30]}
                onPageChange={onPageChange}
                style={{
                  position: 'sticky',
                  bottom: 0,
                  zIndex: 1,
                  backgroundColor: 'white',
                  borderTop: '1px solid #D5E1EA',
                  padding: '0.5rem',
                }}
              />
            </div>
          </div>



        </div>
      </div>
    </div>
  )
}

export default Permission
