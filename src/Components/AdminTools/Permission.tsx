import { useEffect, useMemo, useState } from 'react'
import CustomModal from '../CustomComponent/CustomModal'
import DataTableComponent from '../CommonComponent/Table/DataTableComponent'
import Header from '../Layout/LayoutComponents/Header'
import { InputText } from 'primereact/inputtext'
import { ActionButtonColumnProps } from '../../Type/Components/TableTypes'
import { useSelector } from 'react-redux'
import { CustomerPayload, DeleteUserResponse, GetUserResponse } from '../../Type/ApiTypes'
import { useDeleteUserMutation, useGetUsersMutation } from '../../Services/AdminTools/AdminToolsApi'
import AddNewCustomer from './AddNewCustomer'

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
        id: 'role',
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
      fontSize: '14px',
      fontWeight: 600,
    },
    buttons: [
      {
        color: 'black',
        label: 'Edit',
        underline: true,
        fontWeight: 600,
        onClick: (rowData) => handleEditButtonClick(rowData),
      },
      {
        color: 'red',
        label: 'Delete',
        underline: true,
        fontWeight: 500,
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
  }

  const handleModalClose = () => {
    setModalVisible(false)
  }

  const handleDeleteButtonClick = async (rowData: any) => {
    try {
      const response = await deleteUser({
        userId: rowData.id,
        customerAdminId: rowData.customerAdminId,
      }).unwrap()
      const { status } = response as DeleteUserResponse
      if (status === 200) {
        getCustomerAdminsUsers()
      }
    } catch (error) {
      console.error('Error occurred while fetching customer data:', error)
    }
  }

  const getCustomerAdminsUsers = async () => {
    try {
      const response = await getUser({
        searchText: searchInput,
        customerAdminId: customerAdminId,
      }).unwrap()
      const { status, content } = response as GetUserResponse
      if (status === 200 && Array.isArray(content?.content)) {
        setgetCustomerOwnerUserData(content?.content)
      }
    } catch (error) {
      console.error('Error occurred while fetching customer data:', error)
    }
  }

  useEffect(() => {
    getCustomerAdminsUsers()
  }, [searchInput])

  return (
    <>
      <Header header="MOORMANAGE/Permission" />

      <div className="flex mr-12 justify-end">
        <div className="mt-14 mr-5 relative">
          <InputText
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value)
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

        <div className="mt-14">
          <CustomModal
            buttonText={'ADD NEW'}
            onClick={handleButtonClick}
            visible={modalVisible}
            onHide={handleModalClose}
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
            />
          </CustomModal>
        </div>
      </div>

      <div
        className="flex gap-10 ml-8 mt-10"
        style={{
          paddingRight: '40px',
          paddingLeft: '25px',
        }}>
        <div
          className="bg-[F2F2F2] border-[1px] border-gray-300 mb-10 rounded-lg"
          style={{
            flexGrow: 1,
            borderRadius: '10px',
          }}>
          <div data-testid="permission-users-table">
            <DataTableComponent
              tableStyle={{
                fontSize: '12px',
                color: '#000000',
                fontWeight: 600,
                backgroundColor: '#D9D9D9',
                borderRadius: '0 0 10px 10px',
              }}
              scrollable={true}
              onRowClick={(rowData: any) => {
                // setSelectedCustomer(rowData.data)
              }}
              data={getCustomerOwnerUserData}
              columns={tableColumnsPermission}
              actionButtons={ActionButtonColumn}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Permission
