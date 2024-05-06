import React, { useEffect, useState } from 'react'
import CustomModal from '../../CustomComponent/CustomModal'
import AddBoatyards from './AddBoatyards'
import { InputText } from 'primereact/inputtext'
import { BoatYardData, BoatYardPayload, BoatYardResponse } from '../../../Type/ApiTypes'
import BoatyardTable from './BoatyardTable'
import { useGetBoatyardsMutation } from '../../../Services/MoorManage/MoormanageApi'
import { FaSearch } from 'react-icons/fa'
import CustomMap from '../../Map/CustomMap'

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
      <div className="ml-10">
        <CustomMap/>
      </div>
    </>
  )
}

export default Boatyards
