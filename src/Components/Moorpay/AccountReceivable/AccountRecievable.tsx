import { useMemo, useState } from 'react'
import CustomModal from '../../CustomComponent/CustomModal'
import { MoorPayProps } from '../../../Type/ComponentBasedType'
import DataTableSearchFieldComponent from '../../CommonComponent/Table/DataTableComponent'
import AddCustomer from '../../Moormanage/Customer/AddCustomer'
import { ActionButtonColumnProps } from '../../../Type/Components/TableTypes'
import Header from '../../Layout/LayoutComponents/Header'
import DataTableComponent from '../../CommonComponent/Table/DataTableComponent'

const AccountRecievable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [accountRecievableData, setAccountRecievableData] = useState<MoorPayProps[]>([])

  const handleButtonClick = () => {
    // setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  const header = (
    <div className="flex flex-wrap align-items-center ">
      <h1 className="text-xl font-bold text-white">Account Receivable</h1>
    </div>
  )

  const columnStyle = {
    borderBottom: '1px solid #C0C0C0',
    backgroundColor: '#FFFFFF',
    color: '#000000',
    fontWeight: 'bold',
  }

  const accountRecievableTableColumn = useMemo(
    () => [
      {
        id: 'invoice',
        label: 'Invoice',
        style: columnStyle,
      },
      {
        id: 'mooringId',
        label: 'Mooring Number',
        style: columnStyle,
      },
      {
        id: 'customerName',
        label: 'Customer Name',
        style: columnStyle,
      },
      {
        id: 'technicianName',
        label: 'Technician Name',
        style: columnStyle,
      },
      {
        id: 'services',
        label: 'Services',
        style: columnStyle,
      },
      {
        id: 'time',
        label: 'Time',
        style: columnStyle,
      },
      {
        id: 'amount',
        label: 'Amount',
        style: columnStyle,
      },
    ],
    [],
  )

  const ActionButtonColumn: ActionButtonColumnProps = {
    header: 'Action',
    buttons: [
      {
        color: 'green',
        label: 'Approve',
        filled: true,
      },
      {
        color: 'red',
        label: 'Deny',
        filled: true,
      },
    ],
    headerStyle: {
      backgroundColor: '#FFFFFF',
      height: '3.50rem',
      fontWeight: 'bold',
      color: 'black',
      borderBottom: '1px solid #C0C0C0',
    },
    style: { borderBottom: '1px solid #D5E1EA' },
  }

  return (
    <>
      <Header header="MOORPAY/Account Receivable" />

      <div className="flex justify-end mr-16">
        <div className="flex gap-4 ml-[18rem] text-[gray] font-extrabold mt-14">
          <div style={{ marginTop: '0.8rem' }}>
            <img src="/assets/images/downloadIcon.png" alt="" className="w-5 " />
          </div>

          <div style={{ marginTop: '0.6rem', color: '#00426F', marginRight: '1.5rem' }}>
            <h1>Download Excel</h1>
          </div>
        </div>
        <div className="mt-14 ">
          <CustomModal
            buttonText={'ADD NEW'}
            children={
              <AddCustomer
                customer={undefined}
                editMode={false}
                closeModal={() => {}}
                getCustomer={() => {}}
              />
            }
            headerText={<h1 className="text-xl font-extrabold text-black ml-4">New User</h1>}
            visible={isModalOpen}
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
              width: '800px',
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
          height: '648px',
          gap: '0px',
          borderRadius: '10px',
          border: '1px solid #D5E1EA',
          opacity: '0px',
          backgroundColor: '#FFFFFF',
        }}
        className="bg-[F2F2F2]  ml-12  mt-10 mr-14">
        <div className="flex flex-wrap align-items-center justify-between  bg-[#00426F] p-2   rounded-tl-[10px] rounded-tr-[10px]">
          <span
            style={{
              fontSize: '18px',
              fontWeight: '700',
              lineHeight: '21.09px',
              letterSpacing: '0.4837472140789032px',
              color: '#FFFFFF',
              padding: '8px',
            }}>
            Account Receivable
          </span>
        </div>

        <div className="text-center mt-40">
          <img src="/assets/images/empty.png" alt="Empty Data" className="w-32 mx-auto mb-4" />
          <p className="text-gray-500">No data available</p>
        </div>
        <DataTableComponent
          tableStyle={{
            fontSize: '12px',
            color: '#000000',
            fontWeight: 600,
          }}
          data={undefined}
          columns={accountRecievableTableColumn}
          actionButtons={ActionButtonColumn}
          style={{ borderBottom: '1px solid #D5E1EA', fontWeight: '500' }}
        />
      </div>
    </>
  )
}

export default AccountRecievable
