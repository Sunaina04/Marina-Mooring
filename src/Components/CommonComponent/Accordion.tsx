import React, { useMemo, useState } from 'react'
import { IoAddOutline } from 'react-icons/io5'
import { FiMinus } from 'react-icons/fi'
import { FaCalendar } from 'react-icons/fa'
import { BsFileCheckFill } from 'react-icons/bs'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import StatCard from '../StatCard/StatCard'
import DataTableComponent from './Table/DataTableComponent'
import { ActionButtonColumnProps, TableColumnProps } from '../../Type/Components/TableTypes'
import { AccorditionDataTable } from '../Utils/CustomData'

const Accordion = () => {
  const [accordion, setAccordion] = useState('faq1')
 
  const statCardsData = [
    [
      { title: 'Total Customers', percentage: 17, count: 42324 },
      { title: 'Total Customers', percentage: 17, count: 43324 },
      { title: 'Total Customers', percentage: 17, count: 44324 },
      { title: 'Total Customers', percentage: 17, count: 58765 },
      { title: 'Total Customers', percentage: 17, count: 42324 },
      { title: 'Total Customers', percentage: 17, count: 46789 },
    ],
  ]

  const handleToggle = (id: string) => {
    setAccordion((prevState) => (prevState === id ? '' : id))
  }

  const columns: TableColumnProps[] = useMemo(
    () => [
      {
        id: 'orderNo',
        label: 'Order No.',
        style: { fontSize: '10px', width: '12vw', backgroundColor: '#F2F2F2', color: '#000000' },
      },
      {
        id: 'mooringId',
        label: 'Mooring ID',
        style: { fontSize: '10px', width: '12vw', backgroundColor: '#F2F2F2', color: '#000000' },
      },
      {
        id: 'customerName',
        label: 'Customer Name',
        style: { fontSize: '10px', width: '18vw', backgroundColor: '#F2F2F2', color: '#000000' },
      },
      {
        id: 'assignedTo',
        label: 'Assigned To',
        style: { fontSize: '10px', width: '12vw', backgroundColor: '#F2F2F2', color: '#000000' },
      },
      {
        id: 'date',
        label: 'Date',
        style: { fontSize: '10px', width: '20vw', backgroundColor: '#F2F2F2', color: 'black' },
      },
    ],
    [],
  )

  const ActionButtonColumn: ActionButtonColumnProps = {
    header: '',
    buttons: [
      {
        underline: true,
        label: 'view',
        filled: true,
      },
    ],
    headerStyle: { backgroundColor: '#F2F2F2' },
  }

  return (
    <div className="wrapper">
      <div className="tab px-4 py-2 bg-[#F8F8F8] border-[1px] border-[#D1D1D1] relative mb-8 rounded-md w-[30vw]">
        <label
          htmlFor="faq1"
          className="flex items-center cursor-pointer  after:absolute after:right-5 after:text-2xl after:text-gray-400 hover:after:text-gray-950 peer-checked:after:transform peer-checked:after:rotate-45 h-10"
          onClick={() => handleToggle('faq1')}>
          <div className="flex mt-3 gap-2 p-1">
            <div className="mt-[rem]">
              <FaCalendar style={{ fontSize: '1rem' }} />
            </div>
            <div>
              <h1 className="w-[139px] text-[#10293A] font-[700] leading-[18.75px]">Calendar</h1>
            </div>

            <div className="ml-[18rem] ">
              {accordion === 'faq1' ? <FiMinus /> : <IoAddOutline />}
            </div>
          </div>
        </label>
        <div
          className={`content mt-5 transition-all ease-in-out duration-500 overflow-hidden ${
            accordion === 'faq1' ? '' : 'hidden'
          }`}>
          helllooo
        </div>
      </div>

      <div className="tab px-5 relative mb-4 rounded-md  bg-white border-[1px] border-[#D1D1D1]   w-[30vw]">
        <label
          htmlFor="faq2"
          className=" cursor-pointer   flex text-center after:absolute peer-checked:after:transform peer-checked:after:rotate-45 h-14"
          onClick={() => handleToggle('faq2')}>
          <div className="flex mt-3 gap-2 p-1">
            <div className="mt-1">
              <BsFileCheckFill style={{ fontSize: '1rem' }} />
            </div>
            <div>
              <h1 className="w-[139px] text-[16px] font-[700]  text-[#10293A] leading-[18.75px]">Open Work Orders</h1>
            </div>
            <div className="ml-[17.60rem] mt-1">
              {accordion === 'faq2' ? <FiMinus /> : <IoAddOutline />}
            </div>
          </div>
        </label>
        <label
          htmlFor="faq3"
          className={`content mt-5 transition-all ease-in-out duration-500 overflow-hidden ${
            accordion === 'faq2' ? '' : 'hidden'
          }`}>
          <DataTableComponent
            data={AccorditionDataTable}
            columns={columns}
            actionButtons={ActionButtonColumn}
            scrollable
          />
        </label>
      </div>

      <div className="tab px-5 py-2 bg-white border-[1px] border-[#D1D1D1] relative mb-2 rounded-md w-[30vw]">
        <label
          htmlFor="faq3"
          className="cursor-pointer  after:absolute after:right-5 after:text-2xl after:text-gray-400 hover:after:text-gray-950 peer-checked:after:transform peer-checked:after:rotate-45 h-8"
          onClick={() => handleToggle('faq3')}>
          <div className="flex mt-1 gap-2 p-1">
            
              <img alt="icon" src="/assets/images/ship.png" style={{ width: '23px' }} />
            
            <div>
              <h1 className="w-40   text-[#10293A]  font-[700] leading-[18.75px] ml-[]">Total Moorings</h1>
            </div>
        
            <div className="ml-[16rem]">
              {accordion === 'faq3' ? <FiMinus /> : <IoAddOutline />}
            </div>
          </div>
        </label>
        <div
          className={`content mt-5 transition-all ease-in-out duration-500 overflow-hidden ${
            accordion === 'faq3' ? '' : 'hidden'
          }`}>
          <div>
            {statCardsData.map((items) => (
              <StatCard key={items[0].title} items={items} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Accordion
