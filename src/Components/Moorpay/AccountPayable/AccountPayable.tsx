import { useMemo, useState } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import CustomModal from '../../CustomComponent/CustomModal'
import { MoorPayProps } from '../../../Type/ComponentBasedType'
import DataTableSearchFieldComponent from '../../CommonComponent/Table/DataTableComponent'
import { ActionButtonColumnProps } from '../../../Type/Components/TableTypes'
import Header from '../../Layout/LayoutComponents/Header'
import AddCustomer from '../../Moormanage/Customer/AddCustomer'
import DataTableComponent from '../../CommonComponent/Table/DataTableComponent'


const AccountPayable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [accountPayableData, setAccountPayableData] = useState<MoorPayProps[]>([])

  const handleButtonClick = () => {
    //setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  const columnStyle = {
    borderBottom: '1px solid #C0C0C0',
    backgroundColor: '#FFFFFF',
    color: '#000000',
    fontWeight: 'bold',
  }

  const accountPayableTableColumns= useMemo(
    () => [
    
          {
            id: 'invoice',
            label: 'Invoice',
            style: columnStyle,
          },
          {
            id: 'mooringId',
            label: 'Mooring ID',
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
        label: 'Paid',
        filled: true,
        fontWeight:400,
        style:{
          width:'46px',
          height:'17px'
        }
        
       
      },
    ],
    headerStyle: {
      backgroundColor: '#FFFFFF',
      height: '3.50rem',
      fontWeight: '700',
      color: 'black',
      borderBottom:'1px solid #C0C0C0'
    },
    style: { borderBottom: '1px solid #D5E1EA ',fontWeight:'500' },
  }

  return (
    <>
      <Header header="MOORPAY/Account Payable" />
     
        <div className="flex justify-end mr-16">
        <div className="flex gap-4 ml-[18rem] text-[gray] font-extrabold mt-14">
          <div  style={{ marginTop: '0.8rem' }}>
            <img
              src="/assets/images/downloadIcon.png"
              alt=""
              className="w-5 "
            />
          
          </div>
          <div  style={{ marginTop: '0.6rem', color: '#00426F',marginRight:'1.5rem' }}>
            <h1>Download Excel</h1>
          </div>
        </div>

        <div className="mt-14">
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
            Account Payable
          </span>
        </div>
        <DataTableComponent
          tableStyle={{
            fontSize: '12px',
            color: '#000000',
            fontWeight: 700,
          }}
          data={undefined}
          columns={accountPayableTableColumns}
          actionButtons={ActionButtonColumn}
          style={{ borderBottom: '1px solid #D5E1EA', fontWeight: '500' }}
        />
      </div>
    </>
  )
}

export default AccountPayable
