import { SetStateAction, useCallback, useEffect, useMemo, useState } from 'react'
import CustomModal from '../CustomComponent/CustomModal'
import DataTableComponent from '../CommonComponent/Table/DataTableComponent'
import { properties } from '../Utils/MeassageProperties'
import { Dropdown } from 'primereact/dropdown'
import AddNewCustomer from './AddNewCustomer'
import { ActionButtonColumnProps } from '../../Type/Components/TableTypes'
import { AddUserPayload, CustomerPayload, GetUserResponse } from '../../Type/ApiTypes'
import Header from '../Layout/LayoutComponents/Header'
import useMetaData from '../CommonComponent/MetaDataComponent'
import { Role } from '../../Type/CommonType'
import { CustomersHeader, TechniciansHeader } from '../Utils/DataTableHeader'
import './CustomerOwner.module.css'
import { useGetUsersMutation } from '../../Services/AdminTools/AdminToolsApi'
import { Button } from 'primereact/button'

const CustomerOwner = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState<any>()
  const [editMode, setEditMode] = useState(false)
  const [isRowClick, setIsRowClick] = useState(false)
  const [selectedRow, setSelectedRow] = useState<any>()
  const { getMetaData } = useMetaData()
  const [rolesData, setRolesData] = useState<Role[]>()
  const [selectRole, setSelectRole] = useState()
  const [customerAdminId, setCustomerAdminId] = useState('')
  const [getUser] = useGetUsersMutation()
  const [getCustomerOwnerData, setgetCustomerOwnerData] = useState<CustomerPayload[]>([])
  const [getCustomerOwnerUserData, setgetCustomerOwnerUserData] = useState<CustomerPayload[]>([])

  const handleModalClose = () => {
    setModalVisible(false)
  }

  const handleEditButtonClick = (rowData: any) => {
    console.log('rowData', rowData)
    setSelectedCustomer(rowData)
    setModalVisible(true)
  }

  const ActionButtonColumn: ActionButtonColumnProps = {
    header: 'Action',
    buttons: [
      {
        color: 'black',
        label: 'Edit',
        underline: true,
        fontWeight: 400,
        onClick: (rowData) => handleEditButtonClick(rowData),
      },
    ],
    headerStyle: {
      backgroundColor: '#FFFFFF',
      borderBottom: '1px solid #C0C0C0',
      color: '#000000',
      fontWeight: 400,
    },
    style: { borderBottom: '1px solid #D5E1EA' },
    // onRowClick: (rowData) => handleEditButtonClick(rowData),
  }

  const columnStyle = {
    borderBottom: '1px solid #C0C0C0',
    backgroundColor: '#FFFFFF',
    color: '#000000',
    fontWeight: 500,
  }

  const customerOwnerTableColumn = useMemo(
    () => [
      {
        id: 'id',
        label: 'ID',
        style: columnStyle,
      },
      {
        id: 'name',
        label: 'Name',
        style: columnStyle,
      },
      {
        id: 'phoneNumber',
        label: 'Phone',
        style: columnStyle,
      },
    ],
    [],
  )

  const customerOwnerUserTableColumn = useMemo(
    () => [
      { id: 'id', label: 'ID', style: columnStyle },
      { id: 'name', label: 'Name', style: columnStyle },
      { id: 'email', label: 'Email', style: columnStyle },
      { id: 'phoneNumber', label: 'Phone', style: columnStyle },
      { id: 'role', label: 'Role', style: columnStyle },
      // {
      //   id: 'action',
      //   label: 'Action',
      //   style: columnStyle,
      //   render: (rowData: {
      //     id: string
      //     name: string
      //     email: string
      //     phoneNumber: string
      //     role: string
      //   }) => (
      //     <Button color="primary" size="small" onClick={() => handleEditButtonClick(rowData)}>
      //       Edit
      //     </Button>
      //   ),
      // },
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
            buttonText={'ADD NEW'}
            onHide={handleModalClose}
            children={
              <AddNewCustomer
                customerAdminId={customerAdminId ? customerAdminId : ''}
                customerData={selectedCustomer}
                editMode={editMode}
                getUser={getUserHandler}
                closeModal={() => {}}
                setModalVisible={setModalVisible}
                setIsVisible={() => {}}
              />
            }
            headerText={<h1 className="text-xl font-extrabold text-black-600 ">New User</h1>}
            visible={modalVisible}
            onClick={() => {
              setModalVisible(true)
            }}
          />
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
                fontWeight: 500,
                backgroundColor: '#D9D9D9',
                cursor: 'pointer',
              }}
              scrollable={true}
              columns={customerOwnerTableColumn}
              header={CustomersHeader}
              onRowClick={(e) => {
                getCustomerAdminsUsers(e.data)
              }}
              style={{ borderBottom: '1px solid #D5E1EA', fontWeight: '400' }}
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
                  fontWeight: 400,
                  backgroundColor: '#D9D9D9',
                }}
                scrollable={true}
                data={getCustomerOwnerUserData}
                columns={customerOwnerUserTableColumn }
                header={TechniciansHeader}
                actionButtons={ActionButtonColumn}
                style={{ borderBottom: '1px solid #D5E1EA', fontWeight: '400' }}
              />
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default CustomerOwner
