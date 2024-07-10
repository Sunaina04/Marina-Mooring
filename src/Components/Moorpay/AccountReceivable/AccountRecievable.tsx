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
import PaymentModal from './PaymentModal'
import ContactModal from './ContactModal'

const AccountRecievable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [accountRecievableData, setAccountRecievableData] = useState<MoorPayProps[]>([])
  const [pageNumber1, setPageNumber1] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [isLoading, setIsLoading] = useState(false)
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)

  const onPageChange = (event: any) => {
    // setPageNumber(event.page)
    setPageNumber1(event.first)
    setPageSize(event.rows)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setIsPaymentModalOpen(false)
    setIsContactModalOpen(false)
  }

  const handlePaymentSave = (paymentDetails: any) => {
    console.log(paymentDetails) // Handle payment processing and sync to QuickBooks
    setIsPaymentModalOpen(false)
  }

  const handleSendEmail = (emailDetails: any) => {
    console.log(emailDetails) // Handle email sending
    setIsContactModalOpen(false)
  }

  const handleActionClick = (action: string) => {
    if (action === 'Payments') {
      setIsPaymentModalOpen(true)
    } else if (action === 'Contact') {
      setIsContactModalOpen(true)
    } else if (action === 'View') {
      // Handle view action
    }
  }

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
        onClick: () => handleActionClick('Payments'),
      },
      {
        color: 'black',
        label: 'Contact',
        filled: true,
        onClick: () => handleActionClick('Contact'),
      },
      {
        color: 'black',
        label: 'View',
        filled: true,
        onClick: () => handleActionClick('View'),
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
      status: 'Pending',
    },
    {
      workOrderNumber: 'WO12346',
      customerName: 'Jane Smith',
      invoiceDate: '2023-07-09',
      invoiceAmount: '$750.00',
      contactTime: '2023-07-08 02:30 PM',
      status: 'Completed',
    },
    {
      workOrderNumber: 'WO12347',
      customerName: 'Michael Johnson',
      invoiceDate: '2023-07-08',
      invoiceAmount: '$300.00',
      contactTime: '2023-07-07 11:15 AM',
      status: 'In Progress',
    },
    {
      workOrderNumber: 'WO12346',
      customerName: 'Jane Smith',
      invoiceDate: '2023-07-09',
      invoiceAmount: '$750.00',
      contactTime: '2023-07-08 02:30 PM',
      status: 'Completed',
    },
    {
      workOrderNumber: 'WO12347',
      customerName: 'Michael Johnson',
      invoiceDate: '2023-07-08',
      invoiceAmount: '$300.00',
      contactTime: '2023-07-07 11:15 AM',
      status: 'In Progress',
    },
    {
      workOrderNumber: 'WO12347',
      customerName: 'Michael Johnson',
      invoiceDate: '2023-07-08',
      invoiceAmount: '$300.00',
      contactTime: '2023-07-07 11:15 AM',
      status: 'In Progress',
    },
    {
      workOrderNumber: 'WO12347',
      customerName: 'Michael Johnson',
      invoiceDate: '2023-07-08',
      invoiceAmount: '$300.00',
      contactTime: '2023-07-07 11:15 AM',
      status: 'In Progress',
    },
    {
      workOrderNumber: 'WO12347',
      customerName: 'Michael Johnson',
      invoiceDate: '2023-07-08',
      invoiceAmount: '$300.00',
      contactTime: '2023-07-07 11:15 AM',
      status: 'In Progress',
    },
    {
      workOrderNumber: 'WO12347',
      customerName: 'Michael Johnson',
      invoiceDate: '2023-07-08',
      invoiceAmount: '$300.00',
      contactTime: '2023-07-07 11:15 AM',
      status: 'In Progress',
    },
    {
      workOrderNumber: 'WO12347',
      customerName: 'Michael Johnson',
      invoiceDate: '2023-07-08',
      invoiceAmount: '$300.00',
      contactTime: '2023-07-07 11:15 AM',
      status: 'In Progress',
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
        <div className="h-[293px] overflow-auto">
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
                <img
                  src="/assets/images/empty.png"
                  alt="Empty Data"
                  className="w-20 mx-auto mb-2"
                />
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
        <div className="h-[293px] overflow-auto">
          <DataTableComponent
            tableStyle={{
              fontSize: '12px',
              color: '#000000',
              fontWeight: 700,
            }}
            data={outstandingData}
            columns={outstandingInvoiceTableColumn}
            actionButtons={ActionButtonColumnInvoice}
            style={{ borderBottom: '1px solid #D5E1EA', fontWeight: '400' }}
            emptyMessage={
              <div className="text-center mt-10">
                <img
                  src="/assets/images/empty.png"
                  alt="Empty Data"
                  className="w-20 mx-auto mb-2"
                />
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

      <CustomModal
        visible={isPaymentModalOpen}
        onHide={handleModalClose}
        headerText="Payment"
        dialogStyle={{ width: '600px', height: 'auto' }}>
        <PaymentModal onHide={handleModalClose} onSavePayment={handlePaymentSave} />
      </CustomModal>

      <CustomModal
        visible={isContactModalOpen}
        onHide={handleModalClose}
        headerText="Contact Customer"
        dialogStyle={{ width: '600px', height: 'auto' }}>
        <ContactModal onHide={handleModalClose} onSendEmail={handleSendEmail} />
      </CustomModal>
    </>
  )
}

export default AccountRecievable
