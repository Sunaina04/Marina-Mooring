import { useEffect, useMemo, useState } from 'react'
import CustomModal, { style } from '../../CustomComponent/CustomModal'
import AddBoatyards from './AddBoatyards'
import { InputText } from 'primereact/inputtext'
import { BoatYardData, BoatYardPayload, BoatYardResponse } from '../../../Type/ApiTypes'
import { useGetBoatyardsMutation } from '../../../Services/MoorManage/MoormanageApi'
import DataTableWithToogle from '../../CommonComponent/Table/DataTableWithToogle'
import DataTableSearchFieldComponent from '../../CommonComponent/Table/DataTableSearchFieldComponent'
import { ActionButtonColumnProps } from '../../../Type/Component/Table'
import { IoSearch } from 'react-icons/io5'
import { TableColumns } from '../../../Type/CommonType'
import { boatyardMooring, customerAdminUser } from '../../Utils/CustomData'

const Boatyards = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [boatyardsData, setboatyardsData] = useState<BoatYardPayload[]>([])
  const [filteredboatyardsData, setFilteredboatyardsData] = useState<BoatYardPayload[]>([])
  const [getBaotyards] = useGetBoatyardsMutation()

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

  const tableColumnsTechnicians: TableColumns = useMemo<TableColumns>(
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
    await getBaotyards({})
      .unwrap()
      .then(async (response) => {
        const { status, content } = response as BoatYardResponse
        if (status === 200 && Array.isArray(content)) {
          setboatyardsData(content)
          setFilteredboatyardsData(content)
        }
      })
  }

  useEffect(() => {
    getBaotyardsData()
  }, [])

  return (
    <>
      <div className="flex justify-between items-center ml-12">
        <h1 className="mt-14 ml-28 opacity-30 text-2xl font-normal">Moormanage/Boatyards</h1>
        <div className="flex gap-4 items-center mr-12 mt-14">
          <div>
            <div className="p-input-icon-left ">
              <IoSearch style={{ marginLeft: '1rem', color: '#A4A4A4' }} />
              <InputText
                placeholder="Search"
                className="h-[5vh] w-[14vw] cursor-pointer text-[0.65rem]
              text-[#A4A4A4]  border-1 border-[1px]
               border-[#9F9F9F] pl-10"
              />
            </div>
          </div>
          <CustomModal onClick={handleButtonClick} visible={false} onHide={handleModalClose}>
            <AddBoatyards />
          </CustomModal>
        </div>
      </div>
      <div className="ml-8 flex gap-4">
        <div
          data-testid="customer-admin-users-table"
          className="bg-[F2F2F2] overflow-x-hidden overflow-y-scroll  rounded-md border-[1px]  border-gray-300 w-[40vw] h-[55vh] mb-60">
          <div className="text-sm font-extrabold rounded-sm w-full  bg-[#D9D9D9]">
            <h1 className="p-4">Customers</h1>
          </div>

          <div className="flex items-center justify-center mt-2 bg-[#F2F2F2]">
            <div className="p-input-icon-left ">
              <IoSearch style={{ marginLeft: '1rem', color: '#A4A4A4' }} />
              <InputText
                placeholder="Search by name, ID,address..."
                className="h-[5vh] w-[80vh] cursor-pointer text-[0.65rem]
               text-[#A4A4A4]  border-1 border-[1px]
               border-[#9F9F9F] rounded-md pl-10"
              />
            </div>
          </div>
          <DataTableWithToogle />
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
          <DataTableSearchFieldComponent
            tableStyle={{
              fontSize: '12px',
              color: '#000000',
              fontWeight: 600,
            }}
            data={boatyardMooring}
            columns={tableColumnsTechnicians}
            actionButtons={ActionButtonColumn}
            header={''}
          />
        </div>
      </div>
    </>
  )
}

export default Boatyards
