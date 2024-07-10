import { useMemo, useState } from 'react'
import CustomModal from '../../CustomComponent/CustomModal'
import { MoorPayProps } from '../../../Type/ComponentBasedType'
import DataTableSearchFieldComponent from '../../CommonComponent/Table/DataTableComponent'
import AddCustomer from '../../Moormanage/Customer/AddCustomer'
import { ActionButtonColumnProps } from '../../../Type/Components/TableTypes'
import Header from '../../Layout/LayoutComponents/Header'
import DataTableComponent from '../../CommonComponent/Table/DataTableComponent'
import { Paginator } from 'primereact/paginator'
import { ProgressSpinner } from 'primereact/progressspinner'

const AccountRecievable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [accountRecievableData, setAccountRecievableData] = useState<MoorPayProps[]>([])
  const [pageNumber1, setPageNumber1] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [isLoading, setIsLoading] = useState(false)

  const handleButtonClick = () => {
    // setIsModalOpen(true)
  }

  const onPageChange = (event: any) => {
    // setPageNumber(event.page)
    setPageNumber1(event.first)
    setPageSize(event.rows)
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
    backgroundColor: '#FFFFFF',
    color: '#000000',
    fontWeight: '700',
    fontSize: '12px',
  }

  const accountRecievableTableColumn = useMemo(
    () => [
      {
        id: 'workOrderNumber',
        label: 'Work Order Number',
        style: columnStyle,
      },
      {
        id: 'customerName',
        label: 'Customer Name',
        style: columnStyle,
      },
      {
        id: 'completedDate',
        label: 'Completed Date',
        style: columnStyle,
      },
      {
        id: 'status',
        label: 'Status',
        style: columnStyle,
      },
    ],
    [],
  )

  const ActionButtonColumn: ActionButtonColumnProps = {
    header: 'Actions',
    buttons: [
      {
        
        label: 'Approve',
        filled: true,
        style: {
          width: '46px',
          height: '17px',
          fontWeight: 700,
        },
      },
      {
        
        label: 'Deny',
        filled: true,
      },
      {
        label: 'View',
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
    style: { borderBottom: '1px solid #D5E1EA', fontWeight: '400' },
  }

  const outstandingInvoiceTableColumn = useMemo(
    () => [
      {
        id: 'workOrderNumber',
        label: 'Work Order Number',
        style: columnStyle,
      },
      {
        id: 'customerName',
        label: 'Customer Name',
        style: columnStyle,
      },
      {
        id: 'invoiceDate',
        label: 'Invoice Date',
        style: columnStyle,
      },
      {
        id: 'invoiceAmount',
        label: 'Invoice Amount',
        style: columnStyle,
      },
      {
        id: 'contactTime',
        label: 'Last Contact Time',
        style: columnStyle,
      },
      {
        id: 'status',
        label: 'Status',
        style: columnStyle,
      },
    ],
    [],
  )

  const ActionButtonColumnInvoice: ActionButtonColumnProps = {
    header: 'Actions',
    buttons: [
      {
        color: 'black',
        label: 'Payments',
        filled: true,
        fontWeight: 400,
        style: {
          width: '46px',
          height: '17px',
        },
      },
      {
        color: 'black',
        label: 'Contact',
        filled: true,
      },
      {
        color: 'black',
        label: 'View',
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
    style: { borderBottom: '1px solid #D5E1EA', fontWeight: '400' },
  }

  const outstandingData = [
    { 
      workOrderNumber: 'WO12345', 
      customerName: 'John Doe', 
      invoiceDate: '2023-07-10', 
      invoiceAmount: '$500.00', 
      contactTime: '2023-07-09 10:00 AM', 
      status: 'Pending' 
    },
    { 
      workOrderNumber: 'WO12346', 
      customerName: 'Jane Smith', 
      invoiceDate: '2023-07-09', 
      invoiceAmount: '$750.00', 
      contactTime: '2023-07-08 02:30 PM', 
      status: 'Completed' 
    },
    { 
      workOrderNumber: 'WO12347', 
      customerName: 'Michael Johnson', 
      invoiceDate: '2023-07-08', 
      invoiceAmount: '$300.00', 
      contactTime: '2023-07-07 11:15 AM', 
      status: 'In Progress' 
    },
    { 
      workOrderNumber: 'WO12346', 
      customerName: 'Jane Smith', 
      invoiceDate: '2023-07-09', 
      invoiceAmount: '$750.00', 
      contactTime: '2023-07-08 02:30 PM', 
      status: 'Completed' 
    },
    { 
      workOrderNumber: 'WO12347', 
      customerName: 'Michael Johnson', 
      invoiceDate: '2023-07-08', 
      invoiceAmount: '$300.00', 
      contactTime: '2023-07-07 11:15 AM', 
      status: 'In Progress' 
    },
    { 
      workOrderNumber: 'WO12347', 
      customerName: 'Michael Johnson', 
      invoiceDate: '2023-07-08', 
      invoiceAmount: '$300.00', 
      contactTime: '2023-07-07 11:15 AM', 
      status: 'In Progress' 
    },
    { 
      workOrderNumber: 'WO12347', 
      customerName: 'Michael Johnson', 
      invoiceDate: '2023-07-08', 
      invoiceAmount: '$300.00', 
      contactTime: '2023-07-07 11:15 AM', 
      status: 'In Progress' 
    },
    { 
      workOrderNumber: 'WO12347', 
      customerName: 'Michael Johnson', 
      invoiceDate: '2023-07-08', 
      invoiceAmount: '$300.00', 
      contactTime: '2023-07-07 11:15 AM', 
      status: 'In Progress' 
    },
    { 
      workOrderNumber: 'WO12347', 
      customerName: 'Michael Johnson', 
      invoiceDate: '2023-07-08', 
      invoiceAmount: '$300.00', 
      contactTime: '2023-07-07 11:15 AM', 
      status: 'In Progress' 
    },
    { 
      workOrderNumber: 'WO12347', 
      customerName: 'Michael Johnson', 
      invoiceDate: '2023-07-08', 
      invoiceAmount: '$300.00', 
      contactTime: '2023-07-07 11:15 AM', 
      status: 'In Progress' 
    },
    
  ]

  const pendingApproval = [
    {
      workOrderNumber: 'WO12345',
      customerName: 'John Doe',
      completedDate: '2023-07-10',
      status: 'Pending',
    },
    {
      workOrderNumber: 'WO12346',
      customerName: 'Jane Smith',
      completedDate: '2023-07-09',
      status: 'Completed',
    },
    {
      workOrderNumber: 'WO12347',
      customerName: 'Michael Johnson',
      completedDate: '2023-07-08',
      status: 'In Progress',
    },
    {
      workOrderNumber: 'WO12347',
      customerName: 'Michael Johnson',
      completedDate: '2023-07-08',
      status: 'In Progress',
    },
    {
      workOrderNumber: 'WO12347',
      customerName: 'Michael Johnson',
      completedDate: '2023-07-08',
      status: 'In Progress',
    },
    {
      workOrderNumber: 'WO12347',
      customerName: 'Michael Johnson',
      completedDate: '2023-07-08',
      status: 'In Progress',
    },
    {
      workOrderNumber: 'WO12347',
      customerName: 'Michael Johnson',
      completedDate: '2023-07-08',
      status: 'In Progress',
    },
    {
      workOrderNumber: 'WO12347',
      customerName: 'Michael Johnson',
      completedDate: '2023-07-08',
      status: 'In Progress',
    },
    {
      workOrderNumber: 'WO12347',
      customerName: 'Michael Johnson',
      completedDate: '2023-07-08',
      status: 'In Progress',
    },
  ]

  return (
    <>
      <Header header="MOORPAY/Account Receivable" />

      {/* <div className="flex justify-end mr-16">
         <div className="flex gap-2 ml-[18rem] text-[gray] font-extrabold mt-10">
          <div style={{ marginTop: '0.1rem' }}>
            <img src="/assets/images/downloadIcon.png" alt="" className="w-5 " />
          </div>
          <div style={{ marginTop: '0 rem', color: '#00426F', marginRight: '1.5rem' }}>
            <h1>Download Excel</h1>
          </div>
        </div>
        <div className="mt-8 ">
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
      </div> */}

      <div
        style={{
          height: '400px',
          gap: '0px',
          borderRadius: '10px',
          border: '1px solid #D5E1EA',
          opacity: '0px',
          backgroundColor: '#FFFFFF',
        }}
        className="bg-[F2F2F2]  ml-12  mt-20 mr-14">
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
            Work Orders Pending Approval
          </span>
        </div>
        <div className='h-[293px] overflow-auto'>
        <DataTableComponent
          tableStyle={{
            fontSize: '12px',
            color: '#000000',
            fontWeight: 700,
          }}
          data={pendingApproval}
          columns={accountRecievableTableColumn}
          actionButtons={ActionButtonColumn}
          style={{ borderBottom: '1px solid #D5E1EA', fontWeight: '400' }}
          scrollable
          emptyMessage={
            <div className="text-center mt-10">
              <img src="/assets/images/empty.png" alt="Empty Data" className="w-20 mx-auto mb-2" />
              <p className="text-gray-500 text-lg">No data available</p>
            </div>
          }
        />
        </div>

        <div className="text-center">
          {isLoading && (
            <ProgressSpinner
              style={{
                position: 'absolute',
                top: '50%',
                left: '60%',
                transform: 'translate(-50%, -50%)',
                width: '50px',
                height: '50px',
              }}
              strokeWidth="4"
            />
          )}
        </div>

        <div className="">
          <Paginator
            first={pageNumber1}
            rows={pageSize}
            totalRecords={120}
            rowsPerPageOptions={[5, 10, 20, 30]}
            onPageChange={onPageChange}
            style={{
              position: 'sticky',
              bottom: 0,
              zIndex: 1,
              backgroundColor: 'white',
              borderTop: '1px solid #D5E1EA',
              padding: '0.5rem',
            }}
          />
        </div>
      </div>
      {/* second data table  */}
      <div
        style={{
          height: '400px',
          gap: '0px',
          borderRadius: '10px',
          border: '1px solid #D5E1EA',
          opacity: '0px',
          backgroundColor: '#FFFFFF',
        }}
        className="bg-[F2F2F2]  ml-12  mt-6 mr-14">
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
            Outstanding Invoices
          </span>
        </div>
        <div className='h-[293px] overflow-auto'>
        <DataTableComponent
          tableStyle={{
            fontSize: '12px',
            color: '#000000',
            fontWeight: 700,
          }}
          data={ outstandingData}
          columns={outstandingInvoiceTableColumn}
          actionButtons={ActionButtonColumnInvoice}
          style={{ borderBottom: '1px solid #D5E1EA', fontWeight: '400' }}
          emptyMessage={
            <div className="text-center mt-10">
              <img src="/assets/images/empty.png" alt="Empty Data" className="w-20 mx-auto mb-2" />
              <p className="text-gray-500 text-lg">No data available</p>
            </div>
          }
        />
        </div>

        <div className="text-center">
          {isLoading && (
            <ProgressSpinner
              style={{
                position: 'absolute',
                top: '50%',
                left: '60%',
                transform: 'translate(-50%, -50%)',
                width: '50px',
                height: '50px',
              }}
              strokeWidth="4"
            />
          )}
        </div>

        <div className="">
          <Paginator
            first={pageNumber1}
            rows={pageSize}
            totalRecords={120}
            rowsPerPageOptions={[5, 10, 20, 30]}
            onPageChange={onPageChange}
            style={{
              position: 'sticky',
              bottom: 0,
              zIndex: 1,
              backgroundColor: 'white',
              borderTop: '1px solid #D5E1EA',
              padding: '0.5rem',
            }}
          />
        </div>
      </div>
    </>
  )
}

export default AccountRecievable
