import { useCallback, useEffect, useMemo, useState } from 'react'
import CustomModal from '../CustomComponent/CustomModal'
import './AddCustomer.module.css'
import DataTableComponent from '../CommonComponent/Table/DataTableComponent'
import { properties } from '../Utils/MeassageProperties'
import { Dropdown } from 'primereact/dropdown'
import AddNewCustomer from './AddNewCustomer'
import { ActionButtonColumnProps } from '../../Type/Components/TableTypes'
import { useGetCustomerMutation } from '../../Services/MoorManage/MoormanageApi'
import { CustomerPayload, CustomerResponse } from '../../Type/ApiTypes'
import Header from '../Layout/LayoutComponents/Header'
import './CustomerAdmin.module.css'
import useMetaData from '../CommonComponent/MetaDataComponent'
import { Role } from '../../Type/CommonType'
import { CustomersHeader, TechniciansHeader } from '../Utils/DataTableHeader'

const CustomerOwner = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState<any>()
  const [editMode, setEditMode] = useState(false)
  const { getMetaData } = useMetaData()
  const [rolesData, setRolesData] = useState<Role[]>()
  const [selectRole, setSelectRole] = useState()
  const [getCustomer] = useGetCustomerMutation()
  const [getCustomerOwnerData, setgetCustomerOwnerData] = useState<CustomerPayload[]>([])

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
      backgroundColor: '#F2F2F2',
      borderBottom: '1px solid #C0C0C0',
      color: '#000000',
      fontWeight: 400,
    },
  }

  const tableColumns = useMemo(
    () => [
      {
        id: 'customerId',
        label: 'ID',
        style: {
          // width: '4vw',
          borderBottom: '1px solid #C0C0C0',
          backgroundColor: '#F2F2F2',
          color: '#000000',
          fontWeight: 700,
        },
      },
      {
        id: 'customerName',
        label: 'Name',
        style: {
          // width: '6vw',
          borderBottom: '1px solid #C0C0C0',
          backgroundColor: '#F2F2F2',
          color: '#000000',
          fontWeight: 700,
        },
      },

      {
        id: 'phone',
        label: 'Phone',
        style: {
          // width: '6vw',
          borderBottom: '1px solid #C0C0C0',
          backgroundColor: '#F2F2F2',
          color: '#000000',
          fontWeight: 700,
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
          // width: '6vw',
          borderBottom: '1px solid #C0C0C0',
          backgroundColor: '#F2F2F2',
          color: '#000000',
          fontWeight: 400,
        },
      },
      {
        id: 'name',
        label: 'Name',
        style: {
          // width: '8vw',
          borderBottom: '1px solid #C0C0C0',
          backgroundColor: '#F2F2F2',
          color: '#000000',
          fontWeight: 400,
        },
      },

      {
        id: 'email',
        label: 'Email',
        style: {
          // width: '8vw',
          borderBottom: '1px solid #C0C0C0',
          backgroundColor: '#F2F2F2',
          color: '#000000',
          fontWeight: 400,
        },
      },

      {
        id: 'phone',
        label: 'Phone',
        style: {
          // width: '8vw',
          borderBottom: '1px solid #C0C0C0',
          backgroundColor: '#F2F2F2',
          color: '#000000',
          fontWeight: 400,
        },
      },

      {
        id: 'role',
        label: 'Role',
        style: {
          // width: '8vw',
          borderBottom: '1px solid #C0C0C0',
          backgroundColor: '#F2F2F2',
          color: '#000000',
          fontWeight: 400,
        },
      },
      // {
      //   id: 'action',
      //   label: 'Action',
      //   style: {
      //     width: '6vw',
      //     borderBottom: '1px solid #C0C0C0',
      //     backgroundColor: '#F2F2F2',
      //     color: '#000000',
      //   },
      // },
    ],
    [],
  )

  const getCustomerData = async () => {
    try {
      const response = await getCustomer({}).unwrap()
      console.log(' I AM CALLED', response)
      const { status, content } = response as CustomerResponse
      if (status === 200 && Array.isArray(content)) {
        setgetCustomerOwnerData(content)
      }
      console.log(getCustomerOwnerData)
    } catch (error) {
      console.error('Error occurred while fetching customer data:', error)
    }
  }

  const fetchDataAndUpdate = useCallback(async () => {
    const { rolesData } = await getMetaData()
    if (rolesData !== null) {
      setRolesData(rolesData)
    }
  }, [])

  useEffect(() => {
    getCustomerData()
    fetchDataAndUpdate()
  }, [fetchDataAndUpdate])

  return (
    <>
      <Header header="MOORMANAGE/Permission" />

      <div className="flex mr-20 justify-end">
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
              height: '5vh',
              paddingLeft: '2rem',
              paddingRight: '1rem',
              border: '1px solid #D5E1EA',
              borderRadius: '6px',
            }}
          />
          <img
            src="/assets/images/filter.svg"
            alt="Dropdown Icon"
            className="absolute top-1/2 left-2 transform -translate-y-1/2 h-5 w-5"
            style={{ pointerEvents: 'none' }}
          />
        </div>

        <div className="mt-14">
          <CustomModal
            label={'ADD NEW'}
            style={{
              width: '7vw',
              height: '5vh',
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
              customerData={selectedCustomer}
              editMode={editMode}
              getCustomer={getCustomerData}
              closeModal={handleModalClose}
            />
          </CustomModal>
        </div>
      </div>

      <div
        className="flex gap-10 ml-8 mt-10"
        style={{
          paddingRight: '70px',
        }}>
        <div className="bg-[F2F2F2] rounded-md border-[1px] border-gray-300 mb-10">
          <div className="text-sm font-extrabold rounded-t-md bg-[#00426F]">
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
              }}
              scrollable={true}
              columns={tableColumns}
              header={CustomersHeader}
            />
          </div>
        </div>

        <div
          className="bg-[F2F2F2] rounded-md border-[1px] border-gray-300 mb-10"
          style={{
            flexGrow: 1,
          }}>
          <div className="text-sm font-extrabold rounded-t-md  bg-[#00426F]">
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
              // data={customerAdminUser}
              columns={tableColumnsTechnicians}
              header={TechniciansHeader}
              actionButtons={ActionButtonColumn}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default CustomerOwner
