import React from 'react'
import { TimeLineProps } from '../../Type/Components/MapTypes'

const MooringMapModal: React.FC<TimeLineProps> = ({ gpsValue, mooringId, viewEditClick }) => {
  const viewEdit = () => {}
  return (
    <>
      <div
        // style={{border:"1px solid red"}}
        className="rounded-sm flex gap-20 ">
        <div>
          <div>
            <p
              // style={{ border: "1px solid red" }}
              className="text-sm m-0 font-bold text-white">
              B45
              <br />
              Suncatcher
            </p>
          </div>
          <div>
            <p className="text-xs text-white mt-2">
              GPS Cordinates:
              <br />
              {gpsValue}
            </p>
          </div>
        </div>
        <div
          // style={{border:"1px solid green"}}
          className=" ">
          <p
            // style={{border:"1px solid red"}}
            className=" text-black cursor-pointer mt-[5rem] p-1 border rounded-sm  bg-[#B1E0FF]"
            onClick={viewEdit}>
            View/edit
          </p>
          <p
            // style={{border:"1px solid red"}}

            className="text-xs   text-white">
            ID:{mooringId}
          </p>
        </div>
      </div>
    </>
  )
}

export default MooringMapModal
