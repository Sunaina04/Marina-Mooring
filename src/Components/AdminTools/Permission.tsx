import { useEffect, useMemo, useState } from 'react'
import CustomModal from '../CustomComponent/CustomModal'
import { PermissionData } from '../../Type/ComponentBasedType'
import DataTableComponent from '../CommonComponent/Table/DataTableComponent'
import Header from '../Layout/LayoutComponents/Header'
import AddNewCustomer from './AddNewCustomer'
import { InputText } from 'primereact/inputtext'
import { ActionButtonColumnProps } from '../../Type/Components/TableTypes'
import { useSelector } from 'react-redux'
import { useGetUsersMutation } from '../../Services/Authentication/AuthApi'
import { CustomerPayload, GetUserResponse } from '../../Type/ApiTypes'

const Permission = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const userData = useSelector((state: any) => state.user?.userData)
  const customerAdminId = userData?.id
  const [getUser] = useGetUsersMutation()
  const [getCustomerOwnerUserData, setgetCustomerOwnerUserData] = useState<CustomerPayload[]>([])

  const tableColumnsPermission = useMemo(
    () => [
      {
        id: 'id',
        label: 'ID',
        style: {
          borderBottom: '1px solid #C0C0C0',
          backgroundColor: '#00426F',
          color: '#FFFFFF',
          fontWeight: 400,
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
          fontWeight: 400,
        },
      },

      {
        id: 'email',
        label: 'Email',
        style: {
          borderBottom: '1px solid #C0C0C0',
          backgroundColor: '#00426F',
          color: '#FFFFFF',
          fontWeight: 400,
        },
      },

      {
        id: 'phoneNumber',
        label: 'Phone',
        style: {
          borderBottom: '1px solid #C0C0C0',
          backgroundColor: '#00426F',
          color: '#FFFFFF',
          fontWeight: 400,
        },
      },

      {
        id: 'role',
        label: 'Role',
        style: {
          borderBottom: '1px solid #C0C0C0',
          backgroundColor: '#00426F',
          color: '#FFFFFF',
          fontWeight: 400,
        },
      },
    ],
    [],
  )

  const ActionButtonColumn: ActionButtonColumnProps = {
    header: 'Action',
    buttons: [
      {
        color: 'black',
        label: 'Edit',
        underline: true,
        fontWeight: 400,
      },
      {
        color: 'red',
        label: 'Delete',
        underline: true,
        fontWeight: 400,
      },
    ],
    headerStyle: {
      backgroundColor: '#00426F',
      borderBottom: '1px solid #C0C0C0',
      color: '#FFFFFF',
      fontWeight: 400,
      borderTopRightRadius: '10px',
    },
  }

  const handleButtonClick = () => {
    setModalVisible(true)
  }

  const handleModalClose = () => {
    setModalVisible(false)
  }

  const getCustomerAdminsUsers = async () => {
    try {
      const response = await getUser({ customerAdminId: customerAdminId }).unwrap()
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
  }, [])

  return (
    <>
      <Header header="MOORMANAGE/Permission" />

      <div className="flex mr-12 justify-end">
        <div className="mt-14 mr-5 relative">
          <InputText
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
              fontWeight: 400,
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
            label={'ADD NEW'}
            style={{
              width: '121px',
              height: '44px',
              minHeight: '44px',
              backgroundColor: '#0098FF',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 700,
              color: 'white',
              borderRadius: '0.50rem',
            }}
            onClick={handleButtonClick}
            visible={modalVisible}
            onHide={handleModalClose}
            header={<h1 className="text-xl font-bold text-#000000 ml-4">New User</h1>}>
            <AddNewCustomer
              customerAdminId={customerAdminId}
              editMode={editMode}
              getUser={getCustomerAdminsUsers}
              closeModal={handleModalClose}
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
