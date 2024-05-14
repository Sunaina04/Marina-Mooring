import { useCallback, useEffect, useMemo, useState } from 'react'
import CustomModal from '../CustomComponent/CustomModal'
import DataTableComponent from '../CommonComponent/Table/DataTableComponent'
import { properties } from '../Utils/MeassageProperties'
import { Dropdown } from 'primereact/dropdown'
import AddNewCustomer from './AddNewCustomer'
import { ActionButtonColumnProps } from '../../Type/Components/TableTypes'
import { CustomerPayload, GetUserResponse } from '../../Type/ApiTypes'
import Header from '../Layout/LayoutComponents/Header'
import useMetaData from '../CommonComponent/MetaDataComponent'
import { Role } from '../../Type/CommonType'
import { CustomersHeader, TechniciansHeader } from '../Utils/DataTableHeader'
import './CustomerOwner.module.css'
import { useGetUsersMutation } from '../../Services/AdminTools/AdminToolsApi'

const CustomerOwner = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState<any>()
  const [editMode, setEditMode] = useState(false)
  const [isRowClick, setIsRowClick] = useState(false)
  const [selectedRow, setSelectedRow] = useState<string | null>(null)
  const { getMetaData } = useMetaData()
  const [rolesData, setRolesData] = useState<Role[]>()
  const [selectRole, setSelectRole] = useState()
  const [customerAdminId, setCustomerAdminId] = useState('')
  const [getUser] = useGetUsersMutation()
  const [getCustomerOwnerData, setgetCustomerOwnerData] = useState<CustomerPayload[]>([])
  const [getCustomerOwnerUserData, setgetCustomerOwnerUserData] = useState<CustomerPayload[]>([])

  const handleButtonClick = () => {
    setModalVisible(true)
  }

  const handleModalClose = () => {
    setModalVisible(false)
  }

  const ActionButtonColumn: ActionButtonColumnProps = {
    header: 'Action',
    buttons: [
      {
        color: 'black',
        label: 'Edit',
        underline: true,
        fontWeight: 400,
      },
    ],
    headerStyle: {
      backgroundColor: '#FFFFFF',
      borderBottom: '1px solid #C0C0C0',
      color: '#000000',
      fontWeight: 400,
    },
  }

  const tableColumns = useMemo(
    () => [
      {
        id: 'id',
        label: 'ID',
        style: {
          borderBottom: '1px solid #C0C0C0',
          backgroundColor: '#FFFFFF',
          color: '#000000',
          fontWeight: 500,
        },
      },
      {
        id: 'name',
        label: 'Name',
        style: {
          borderBottom: '1px solid #C0C0C0',
          backgroundColor: '#FFFFFF',
          color: '#000000',
          fontWeight: 500,
        },
      },
      {
        id: 'phoneNumber',
        label: 'Phone',
        style: {
          borderBottom: '1px solid #C0C0C0',
          backgroundColor: '#FFFFFF',
          color: '#000000',
          fontWeight: 500,
        },
      },
    ],
    [],
  )

  const tableColumnsTechnicians = useMemo(
    () => [
      {
        id: 'id',
        label: 'ID',
        style: {
          borderBottom: '1px solid #C0C0C0',
          backgroundColor: '#FFFFFF',
          color: '#000000',
          fontWeight: 400,
        },
      },
      {
        id: 'name',
        label: 'Name',
        style: {
          borderBottom: '1px solid #C0C0C0',
          backgroundColor: '#FFFFFF',
          color: '#000000',
          fontWeight: 400,
        },
      },
      {
        id: 'email',
        label: 'Email',
        style: {
          borderBottom: '1px solid #C0C0C0',
          backgroundColor: '#FFFFFF',
          color: '#000000',
          fontWeight: 400,
        },
      },
      {
        id: 'phoneNumber',
        label: 'Phone',
        style: {
          borderBottom: '1px solid #C0C0C0',
          backgroundColor: '#FFFFFF',
          color: '#000000',
          fontWeight: 400,
        },
      },
      {
        id: 'role',
        label: 'Role',
        style: {
          borderBottom: '1px solid #C0C0C0',
          backgroundColor: '#FFFFFF',
          color: '#000000',
          fontWeight: 400,
        },
      },
    ],
    [],
  )

  const fetchDataAndUpdate = useCallback(async () => {
    const { rolesData } = await getMetaData()
    if (rolesData !== null) {
      setRolesData(rolesData)
    }
  }, [])

  const getUserHandler = async () => {
    try {
      const response = await getUser({}).unwrap()
      const { status, content } = response as GetUserResponse
      if (status === 200 && Array.isArray(content?.content)) {
        setgetCustomerOwnerData(content?.content)
      }
    } catch (error) {
      console.error('Error occurred while fetching customer data:', error)
    }
  }

  const getCustomerAdminsUsers = async (row: any) => {
    try {
      const response = await getUser({ customerAdminId: row?.id }).unwrap()
      const { status, content } = response as GetUserResponse
      if (status === 200 && Array.isArray(content?.content)) {
        setgetCustomerOwnerUserData(content?.content)
        setIsRowClick(true)
        setSelectedRow(row?.id)
        setCustomerAdminId(row?.id)
      }
    } catch (error) {
      console.error('Error occurred while fetching customer data:', error)
    }
  }

  useEffect(() => {
    getUserHandler()
    fetchDataAndUpdate()
  }, [fetchDataAndUpdate])

  return (
    <>
      <Header header="MOORMANAGE/Permission" />

      <div className="flex mr-12 justify-end">
        <div className="mt-14 mr-5 relative">
          <Dropdown
            value={selectRole}
            onChange={(e) => setSelectRole(e.value)}
            options={rolesData}
            optionLabel="name"
            editable
            placeholder="Select Role"
            style={{
              width: '12vw',
              height: '44px',
              minHeight: '44px',
              paddingLeft: '2rem',
              border: '1px solid #D5E1EA',
              borderRadius: '6px',
            }}
          />
          <img
            src="/assets/images/filter.svg"
            alt="filter Icon"
            className="absolute top-1/2 left-2 transform -translate-y-1/2 h-5 w-5"
            style={{ pointerEvents: 'none' }}
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
            header={<h1 className="text-xl font-extrabold text-black ml-4">New User</h1>}>
            <AddNewCustomer
              customerAdminId={customerAdminId ? customerAdminId : ''}
              customerData={selectedCustomer}
              editMode={editMode}
              getUser={getUserHandler}
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
        <div className="bg-[FFFFFF] rounded-md border-[1px] mb-10">
          <div className="text-sm font-bold rounded-t-md bg-[#00426F]">
            <h1 className="p-4 text-white">{properties.CustomersOwner}</h1>
          </div>
          <div data-testid="customer-admin-data">
            <DataTableComponent
              data={getCustomerOwnerData}
              tableStyle={{
                fontSize: '12px',
                color: '#000000',
                fontWeight: 600,
                backgroundColor: '#D9D9D9',
                cursor: 'pointer',
              }}
              scrollable={true}
              columns={tableColumns}
              header={CustomersHeader}
              onRowClick={(e) => {
                getCustomerAdminsUsers(e.data)
              }}
              rowStyle={(rowData) => ({
                backgroundColor: selectedRow === rowData.id ? 'black' : 'red',
              })}
            />
          </div>
        </div>

        {isRowClick && (
          <div
            className="bg-[F2F2F2] rounded-lg border-[1px] mb-10"
            style={{
              flexGrow: 1,
            }}>
            <div className="text-sm font-bold rounded-t-md bg-[#00426F]">
              <h1 className="p-4 text-white">{properties.CustomerOwnerUsers}</h1>
            </div>
            <div data-testid="customer-admin-users-table">
              <DataTableComponent
                tableStyle={{
                  fontSize: '12px',
                  color: '#000000',
                  fontWeight: 600,
                  backgroundColor: '#D9D9D9',
                }}
                scrollable={true}
                data={getCustomerOwnerUserData}
                columns={tableColumnsTechnicians}
                header={TechniciansHeader}
                actionButtons={ActionButtonColumn}
              />
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default CustomerOwner
