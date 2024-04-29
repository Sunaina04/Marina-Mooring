import React, { useEffect, useState } from 'react'
import CustomModal from '../../CustomComponent/CustomModal'
import AddBoatyards from './AddBoatyards'
import { InputText } from 'primereact/inputtext'
import {
  BoatYard_Data,
  BoatYardPayload,
  BoatYardResponse,
} from '../../../Type/ApiTypes'
import BoatyardTable from './BoatyardTable'
import { useGetBoatyardsMutation } from '../../../Services/MoorManage/MoormanageApi'

const Boatyards = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [boatyardsData, setboatyardsData] = useState<BoatYardPayload[]>([])
  const [filteredboatyardsData, setFilteredboatyardsData] = useState<BoatYardPayload[]>([])
  const [getBaotyards] = useGetBoatyardsMutation()

  const moorings: BoatYard_Data[] = [
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
        <h1 className="mt-14 ml-28 opacity-30 text-2xl font-normal">Moormanage/Boatyards</h1>
        <div className="flex gap-4 items-center mr-12 mt-14">
          <div>
            <div className="p-input-icon-left">
              <i className="pi pi-search text-[#D2D2D2]" />
              <InputText placeholder="Search" className="h-[5vh] cursor-pointer font-bold" />
            </div>
          </div>

          <CustomModal onClick={handleButtonClick} visible={false} onHide={handleModalClose}>
            <AddBoatyards />
          </CustomModal>
        </div>
      </div>
      <div className="ml-10">
        <BoatyardTable moorings={moorings as BoatYard_Data[]} />
      </div>
    </>
  )
}

export default Boatyards
