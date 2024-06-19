import React from 'react'
import { TimeLineProps } from '../../Type/Components/MapTypes'

const Timeline: React.FC<TimeLineProps> = ({ gpsValue, mooringId, viewEditClick }) => {
  const viewEdit = () => {}
  return (
    <>
      <div>
        <div className="bg-black rounded-lg flex">
          <div>
            <p className="text-lg font-bold text-white">B45</p>
            <p className="text-lg text-white">Suncatcher</p>
            <p className="text-xs text-white mt-2">GPS Cordinates:</p>
            <p className="text-xs text-white">{gpsValue}</p>
          </div>
          <div className="text-xs text-white">
            <p className="bg-gray-300 text-black cursor-pointer" onClick={viewEdit}>
              View/edit
            </p>
            <p className="mt-1">ID:{mooringId}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Timeline
