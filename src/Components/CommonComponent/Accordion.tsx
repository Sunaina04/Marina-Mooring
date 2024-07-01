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
import DatePickerComponent from './DatePickerComponent'

const Accordion = () => {
  const [accordion, setAccordion] = useState('faq1')
  const [workOrderData, setWorkOrderData] = useState('')

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
        style: { fontSize: '10px', width: '6vw', backgroundColor: '#FFFFFF', color: '#000000' },
      },
      {
        id: 'mooringNumber',
        label: 'Mooring Number',
        style: { fontSize: '10px', width: '6vw', backgroundColor: '#FFFFFF', color: '#000000' },
      },
      {
        id: 'customerName',
        label: 'Customer Name',
        style: { fontSize: '10px', width: '6vw', backgroundColor: '#FFFFFF', color: '#000000' },
      },
      {
        id: 'assignedTo',
        label: 'Assigned To',
        style: { fontSize: '10px', width: '6vw', backgroundColor: '#FFFFFF', color: '#000000' },
      },
      {
        id: 'date',
        label: 'Date',
        style: { fontSize: '10px', width: '5vw', backgroundColor: '#FFFFFF', color: 'black' },
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
    headerStyle: { backgroundColor: '#FFFFFF' },
  }

  return (
    <div className="flex  flex-col wrapper ">
      <div
        className=" px-5 relative mb-4 rounded-xl bg-white border-[1px] border-[#D5E1EA] mr-8"
        style={{ width: '492.03px', maxWidth: '492.03px' }}>
        <label
          htmlFor="faq1"
          className="cursor-pointer flex items-center justify-between h-14"
          onClick={() => handleToggle('faq1')}>
          <div className="flex items-center gap-4">
            <div>
              <img alt="icon" src="/assets/images/Calendar.svg" style={{ width: '23px' }} />
            </div>
            <div>
              <h1 className="text-[16px] font-[500] text-[#10293A] leading-[18.75px]">Calendar</h1>
            </div>
          </div>
          <div>
            <div className="">
              {accordion === 'faq1' ? (
                <FiMinus style={{ color: '#10293A' }} />
              ) : (
                <IoAddOutline style={{ color: '#10293A' }} />
              )}
            </div>
          </div>
        </label>
        <div
          className={`content mt-5 transition-all ease-in-out duration-500 ${accordion === 'faq1' ? '' : 'hidden'}`}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <DatePickerComponent />
          </div>
        </div>
      </div>
      <div
        className="tab px-5 relative mb-4 rounded-xl bg-[#FFFFFF] border-[1px] border-[#D5E1EA] mr-8"
        style={{ width: '492.03px', maxWidth: '492.03px' }}>
        <label
          htmlFor="faq2"
          className="cursor-pointer flex items-center justify-between h-14"
          onClick={() => handleToggle('faq2')}>
          <div className="flex items-center gap-4">
            <div>
              <img alt="icon" src="/assets/images/file.svg" style={{ width: '23px' }} />
            </div>
            <div style={{ flexShrink: 1 }}>
              <h1 className="text-[16px] font-[500] text-[#10293A] leading-[18.75px]">
                Open Work Orders
              </h1>
            </div>
          </div>

          <div>
            <div className="">
              {accordion === 'faq2' ? (
                <FiMinus style={{ color: '#10293A' }} />
              ) : (
                <IoAddOutline style={{ color: '#10293A' }} />
              )}
            </div>
          </div>
        </label>
        <label
          htmlFor="faq3"
          className={`content mt-5 transition-all ease-in-out duration-500 ${accordion === 'faq2' ? '' : 'hidden'}`}>
          <DataTableComponent
            // data={AccorditionDataTable}
            columns={columns}
            actionButtons={ActionButtonColumn}
            scrollable
            tableStyle={{ fontSize: '10px', width: '450px' }}
            emptyMessage={
              <div className="text-center mt-14">
                <img
                  src="/assets/images/empty.png"
                  alt="Empty Data"
                  className="w-20 mx-auto mb-4"
                />
                <p className="text-gray-500">No data available</p>
              </div>
            }
          />
        </label>
      </div>

      <div
        className="tab px-5 py-3 bg-white border-[1px] border-[#D5E1EA] relative mb-2 rounded-xl mr-8"
        style={{ width: '492.03px', maxWidth: '492.03px' }}>
        <label
          htmlFor="faq3"
          className="cursor-pointer flex items-center justify-between h-8"
          onClick={() => handleToggle('faq3')}>
          <div className="flex items-center gap-2">
            <img alt="icon" src="/assets/images/Group.svg" style={{ width: '25px' }} />
            <div className="ml-2 " style={{ flexShrink: 1 }}>
              <h1 className="text-[#10293A] font-[500] leading-[18.75px]">Total Moorings</h1>
            </div>
          </div>

          <div className="">
            {accordion === 'faq3' ? (
              <FiMinus style={{ color: '#10293A' }} />
            ) : (
              <IoAddOutline style={{ color: '#10293A' }} />
            )}
          </div>
        </label>
        <div
          className={`content mt-5 transition-all ease-in-out duration-500 ${accordion === 'faq3' ? '' : 'hidden'}`}>
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
