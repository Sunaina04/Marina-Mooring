import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CustomModal from '../../CustomComponent/CustomModal'
import AddVendor from './AddVendor'
import { InputText } from 'primereact/inputtext'
import {
  useDeleteVendorMutation,
  useGetVendorsMutation,
} from '../../../Services/MoorManage/MoormanageApi'
import { VendorPayload, VendorResponse } from '../../../Type/ApiTypes'
import DataTableSearchFieldComponent from '../../CommonComponent/Table/DataTableComponent'
import { boatData, vendorDataa } from '../../Utils/CustomData'
import { ActionButtonColumnProps } from '../../../Type/Components/TableTypes'
import Header from '../../Layout/LayoutComponents/Header'
import { IoSearchSharp } from 'react-icons/io5'
import { Params } from 'react-router-dom'

const Vendors = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [vendorData, setVendorData] = useState<VendorPayload[]>([])
  const [filteredboatyardsData, setFilteredboatyardsData] = useState<VendorPayload[]>([])
  const [selectedCustomer, setSelectedCustomer] = useState<any>(undefined)
  const [editMode, setEditMode] = useState(false)
  const [searchText, setSearchText] = useState('')

  const [getVendors] = useGetVendorsMutation()
  const [deleteVendor] = useDeleteVendorMutation()

  const handleButtonClick = () => {
    setModalVisible(true)
  }
  const navigate = useNavigate()

  const getVendorData = useCallback(async () => {
    //setIsLoading(true)
    try {
      let params: Params = {} as Params & { [key: string]: any }
      if (searchText) {
        ;(params as any).searchText = searchText
      }
      // if (selectedCustomerId) {
      //   params.customerOwnerId = selectedCustomerId
      // }
      await getVendors(params)
        .unwrap()
        .then(async (response) => {
          const { status, content } = response as VendorResponse
          if (status === 200 && Array.isArray(content)) {
            // setIsLoading(false)
            setVendorData(content)
            setFilteredboatyardsData(content)
          } else {
            //setIsLoading(false)
          }
        })
    } catch (error) {
      console.error('Error fetching getBoatyardsdata:', error)
    }
  }, [getVendors, searchText])

  // const getMooringsWithBoatyardData = async () => {
  //   //setIsLoading(true)
  //   try {
  //     await getVendors({ id: selectedBoatYard?.id })
  //       .unwrap()
  //       .then(async (response) => {
  //         const { status, content } = response as MooringWithBoatYardResponse
  //         if (status === 200 && Array.isArray(content) && content.length > 0) {
  //          // setIsLoading(false)
  //           setMooringWithBoatyardsData(content)
  //         } else {
  //           setIsLoading(false)
  //         }
  //       })
  //   } catch (error) {
  //     console.error('Error fetching getMooringsWithBoatyardData:', error)
  //   }
  // }

  const handleEdit = (rowData: any) => {
    setSelectedCustomer(rowData)
    setEditMode(true)
  }

  const handleDelete = async (rowData: any) => {
    try {
      const response = await deleteVendor({ id: rowData?.id })
      getVendorData()
    } catch (error) {
      console.error('Error deleting customer:', error)
    }
  }

  const handleModalClose = () => {
    setModalVisible(false)
    setEditMode(false)
  }

  useEffect(() => {
    getVendorData()
  }, [])

  const VendorColumns = useMemo(
    () => [
      {
        id: 'id',
        label: 'ID',
        style: {
          width: '9vw',
          backgroundColor: '#00426F',
          color: '#FFFFFF',
          fontSize: '11.18px',
          fontWeight: '700',
          borderTopLeftRadius: '10px',
        },
      },
      {
        id: 'companyName',
        label: 'Company Name',
        style: { width: '16vw', backgroundColor: '#00426F', color: '#FFFFFF' },
      },
      {
        id: 'phoneNumber',
        label: 'Phone Number',
        style: { width: '15vw', backgroundColor: '#00426F', color: '#FFFFFF' },
      },
      {
        id: 'email',
        label: 'Email Address',
        style: { width: '16vw', backgroundColor: '#00426F', color: '#FFFFFF' },
      },
      {
        id: 'inventoryItems',
        label: 'Inventory Items',
        style: { width: '13vw', backgroundColor: '#00426F', color: '#FFFFFF' },
      },
    ],
    [],
  )

  const ActionButtonColumn: ActionButtonColumnProps = useMemo(
    () => ({
      header: 'Action',
      buttons: [
        {
          color: 'black',
          label: 'View Inventory',
          onClick: () => navigate('/moormanage/inventoryDetails'),
          underline: true,
          style: { margin: 0 },
        },
        {
          color: 'green',
          label: 'Edit',
          onClick: handleEdit,
          underline: true,
        },
        {
          color: 'red',
          label: 'Delete',
          underline: true,
        },
      ],
      headerStyle: {
        backgroundColor: '#00426F',
        color: '#FFFFFF',
        height: '3.50rem',
        borderTopRightRadius: '10px',
        borderBottom: '1px solid #C0C0C0',
      },
      style: { borderBottom: '1px solid #D5E1EA ', width: '14rem' },
    }),
    [],
  )
  return (
    <>
      <div className={modalVisible ? 'backdrop-blur-lg' : ''}>
        <Header header="MOORMANAGE/Vendor" />
        <div className="flex justify-end">
          <div className="flex gap-4 mr-12 mt-14">
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
                <AddVendor
                  vendors={selectedCustomer}
                  editMode={editMode}
                  closeModal={handleModalClose}
                  getVendor={getVendorData}
                />
              }
              headerText={
                <h1 style={{ fontWeight: '500', fontSize: '24px', color: '#000000' }}>
                  Add Company
                </h1>
              }
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
                width: '851px',
                minWidth: '800px',
                height: '630px',
                minHeight: '630px',
                borderRadius: '1rem',
                maxHeight: '95% !important',
              }}
            />
          </div>
        </div>

        <div
          style={{
            height: '657px',
            borderRadius: '10px',
            border: '1px solid #D5E1EA',
            opacity: '0px',
            backgroundColor: '#FFFFFF',
          }}
          className=" ml-[3rem] mr-[2.30rem] mt-8">
          <DataTableSearchFieldComponent
            tableStyle={{
              fontSize: '12px',
              color: '#000000',
              fontWeight: '400',
              padding: '2rem',
            }}
            data={vendorDataa}
            columns={VendorColumns}
            header={undefined}
            actionButtons={ActionButtonColumn}
            style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #D5E1EA ' }}
          />
        </div>
      </div>
    </>
  )
}

export default Vendors
