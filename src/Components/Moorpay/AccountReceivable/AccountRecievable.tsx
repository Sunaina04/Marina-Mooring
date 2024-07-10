import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
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
import { InputText } from 'primereact/inputtext'
import {useSelector } from 'react-redux'
import { useGetWorkOrdersMutation } from '../../../Services/MoorServe/MoorserveApi'
import { ErrorResponse, WorkOrderPayload, WorkOrderResponse } from '../../../Type/ApiTypes'
import { selectCustomerId } from '../../../Store/Slice/userSlice'
import { Toast } from 'primereact/toast'
import { Params } from '../../../Type/CommonType'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'

const AccountRecievable = () => {
  const selectedCustomerId = useSelector(selectCustomerId)
  // const [isModalOpen, setIsModalOpen] = useState(false)
  // const [accountRecievableData, setAccountRecievableData] = useState<MoorPayProps[]>([])
  const [pageNumber, setPageNumber] = useState(0)
  const [pageNumber1, setPageNumber1] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [pageNumberTwo, setPageNumberTwo] = useState(0)
  const [pageNumber2, setPageNumber2] = useState(0)
  const [pageSizeTwo, setPageSizeTwo] = useState(10)
  const [totalRecords, setTotalRecords] = useState<number>()
  const [isLoading, setIsLoading] = useState(false)
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [searchApproval, setSearchApproval] = useState('')
  const [searchInvoice, setSearchInvoice] = useState('')
  const [workOrderData, setWorkOrderData] = useState<WorkOrderPayload[]>([])
  const [getWorkOrder] = useGetWorkOrdersMutation()
  const toast = useRef<Toast>(null)

  // const handleButtonClick = () => {
  //   // setIsModalOpen(true)
  // }

  const handleSearchApproval = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchApproval(e.target.value)
  }
  const handleSearchInvoice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInvoice(e.target.value)
  }

  const onPageChange = (event: any) => {
    setPageNumber(event.page)
    setPageNumber1(event.first)
    setPageSize(event.rows)
  }

  const handleModalClose = () => {
    // setIsModalOpen(false)
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
  const onPageChangeTwo = (event: any) => {
    setPageNumberTwo(event.page)
    setPageNumber2(event.first)
    setPageSizeTwo(event.rows)
  }

  // const handleModalClose = () => {
  //   setIsModalOpen(false)
  // }

  const getWorkOrderData = useCallback(async () => {
    setIsLoading(true)
    try {
      const params: Params = {}
      if (searchApproval) {
        params.searchApproval = searchApproval
      }
      if (pageNumber) {
        params.pageNumber = pageNumber
      }
      if (pageSize) {
        params.pageSize = pageSize
      }
      const response = await getWorkOrder(params).unwrap()
      const { status, content, message, totalSize } = response as WorkOrderResponse
      if (status === 200 && Array.isArray(content)) {
        setWorkOrderData(content)
        setIsLoading(false)
        setTotalRecords(totalSize)
      } else {
        setIsLoading(false)
        toast?.current?.show({
          severity: 'error',
          summary: 'Error',
          detail: message,
          life: 3000,
        })
      }
    } catch (error) {
      const { message: msg } = error as ErrorResponse
      setIsLoading(false)
      console.error('Error occurred while fetching customer data:', msg)
    }
  }, [searchApproval, selectedCustomerId, pageNumber, pageSize])

  // bottom table

  const getOutStandingInvoice = useCallback(async () => {
    setIsLoading(true)
    try {
      const params: Params = {}
      if (searchInvoice) {
        params.searchInvoice = searchInvoice
      }
      if (pageNumberTwo) {
        params.pageNumberTwo = pageNumberTwo
      }
      if (pageSizeTwo) {
        params.pageSizeTwo = pageSizeTwo
      }
      const response = await getWorkOrder(params).unwrap()
      const { status, content, message, totalSize } = response as WorkOrderResponse
      if (status === 200 && Array.isArray(content)) {
        setWorkOrderData(content)
        setIsLoading(false)
        setTotalRecords(totalSize)
      } else {
        setIsLoading(false)
        toast?.current?.show({
          severity: 'error',
          summary: 'Error',
          detail: message,
          life: 3000,
        })
      }
    } catch (error) {
      const { message: msg } = error as ErrorResponse
      setIsLoading(false)
      console.error('Error occurred while fetching customer data:', msg)
    }
  }, [searchApproval, selectedCustomerId, pageNumber, pageSize])



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
  const firstLastName = (data: any) => {
    return data.customerResponseDto.firstName + ' ' + data.customerResponseDto.lastName
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
        body: firstLastName,
        style: columnStyle,
      },
      {
        id: 'completedDate',
        label: 'Completed Date',
        style: columnStyle,
      },
      {
        id: 'workOrderStatusDto.status',
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
       width:'12.7vw'
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
        body: firstLastName,
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
        id: 'workOrderStatusDto.status',
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
      // borderBottom: '1px solid #C0C0C0',
    },
    style: { borderBottom: '1px solid #D5E1EA', fontWeight: '400' },
  }

  // const outstandingData = [
  //   {
  //     workOrderNumber: 'WO12345',
  //     customerName: 'John Doe',
  //     invoiceDate: '2023-07-10',
  //     invoiceAmount: '$500.00',
  //     contactTime: '2023-07-09 10:00 AM',
  //     status: 'Pending',
  //   },
  //   {
  //     workOrderNumber: 'WO12346',
  //     customerName: 'Jane Smith',
  //     invoiceDate: '2023-07-09',
  //     invoiceAmount: '$750.00',
  //     contactTime: '2023-07-08 02:30 PM',
  //     status: 'Completed',
  //   },
  //   {
  //     workOrderNumber: 'WO12347',
  //     customerName: 'Michael Johnson',
  //     invoiceDate: '2023-07-08',
  //     invoiceAmount: '$300.00',
  //     contactTime: '2023-07-07 11:15 AM',
  //     status: 'In Progress',
  //   },
  //   {
  //     workOrderNumber: 'WO12346',
  //     customerName: 'Jane Smith',
  //     invoiceDate: '2023-07-09',
  //     invoiceAmount: '$750.00',
  //     contactTime: '2023-07-08 02:30 PM',
  //     status: 'Completed',
  //   },
  //   {
  //     workOrderNumber: 'WO12347',
  //     customerName: 'Michael Johnson',
  //     invoiceDate: '2023-07-08',
  //     invoiceAmount: '$300.00',
  //     contactTime: '2023-07-07 11:15 AM',
  //     status: 'In Progress',
  //   },
  //   {
  //     workOrderNumber: 'WO12347',
  //     customerName: 'Michael Johnson',
  //     invoiceDate: '2023-07-08',
  //     invoiceAmount: '$300.00',
  //     contactTime: '2023-07-07 11:15 AM',
  //     status: 'In Progress',
  //   },
  //   {
  //     workOrderNumber: 'WO12347',
  //     customerName: 'Michael Johnson',
  //     invoiceDate: '2023-07-08',
  //     invoiceAmount: '$300.00',
  //     contactTime: '2023-07-07 11:15 AM',
  //     status: 'In Progress',
  //   },
  //   {
  //     workOrderNumber: 'WO12347',
  //     customerName: 'Michael Johnson',
  //     invoiceDate: '2023-07-08',
  //     invoiceAmount: '$300.00',
  //     contactTime: '2023-07-07 11:15 AM',
  //     status: 'In Progress',
  //   },
  //   {
  //     workOrderNumber: 'WO12347',
  //     customerName: 'Michael Johnson',
  //     invoiceDate: '2023-07-08',
  //     invoiceAmount: '$300.00',
  //     contactTime: '2023-07-07 11:15 AM',
  //     status: 'In Progress',
  //   },
  //   {
  //     workOrderNumber: 'WO12347',
  //     customerName: 'Michael Johnson',
  //     invoiceDate: '2023-07-08',
  //     invoiceAmount: '$300.00',
  //     contactTime: '2023-07-07 11:15 AM',
  //     status: 'In Progress',
  //   },
  // ]

  // const pendingApproval = [
  //   {
  //     workOrderNumber: 'WO12345',
  //     customerName: 'John Doe',
  //     completedDate: '2023-07-10',
  //     status: 'Pending',
  //   },
  //   {
  //     workOrderNumber: 'WO12346',
  //     customerName: 'Jane Smith',
  //     completedDate: '2023-07-09',
  //     status: 'Completed',
  //   },
  //   {
  //     workOrderNumber: 'WO12347',
  //     customerName: 'Michael Johnson',
  //     completedDate: '2023-07-08',
  //     status: 'In Progress',
  //   },
  //   {
  //     workOrderNumber: 'WO12347',
  //     customerName: 'Michael Johnson',
  //     completedDate: '2023-07-08',
  //     status: 'In Progress',
  //   },
  //   {
  //     workOrderNumber: 'WO12347',
  //     customerName: 'Michael Johnson',
  //     completedDate: '2023-07-08',
  //     status: 'In Progress',
  //   },
  //   {
  //     workOrderNumber: 'WO12347',
  //     customerName: 'Michael Johnson',
  //     completedDate: '2023-07-08',
  //     status: 'In Progress',
  //   },
  //   {
  //     workOrderNumber: 'WO12347',
  //     customerName: 'Michael Johnson',
  //     completedDate: '2023-07-08',
  //     status: 'In Progress',
  //   },
  //   {
  //     workOrderNumber: 'WO12347',
  //     customerName: 'Michael Johnson',
  //     completedDate: '2023-07-08',
  //     status: 'In Progress',
  //   },
  //   {
  //     workOrderNumber: 'WO12347',
  //     customerName: 'Michael Johnson',
  //     completedDate: '2023-07-08',
  //     status: 'In Progress',
  //   },
  // ]

  useEffect(() => {
    getWorkOrderData()
    getOutStandingInvoice()
  }, [pageNumber,pageSize,pageNumberTwo, pageSizeTwo, selectedCustomerId])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchApproval) {
        getWorkOrderData()
      }
    }, 600)
    return () => clearTimeout(timeoutId)
  }, [searchApproval])
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchInvoice) {
        getOutStandingInvoice()
      }
    }, 600)
    return () => clearTimeout(timeoutId)
  }, [searchInvoice])

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

          <div className="relative inline-block">
            <div className="relative">
              <img
                src="/assets/images/Search.png"
                alt="search icon"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
                data-testid="search-icon"
              />
              <InputText
                value={searchApproval}
                onChange={handleSearchApproval}
                placeholder="Search"
                id="placeholderText"
                className="pl-10 w-[237px] bg-[#00426F] h-[35px] rounded-lg border text-[white] border-[#D5E1EA] placeholder:text-[#FFFFFF]  focus:outline-none"
              />
            </div>
          </div>
        </div>
        <div className="h-[293px] overflow-auto">
          <DataTableComponent
            tableStyle={{
              fontSize: '12px',
              color: '#000000',
              fontWeight: 700,
            }}
            data={workOrderData}
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
            totalRecords={totalRecords}
            rowsPerPageOptions={[5, 10, 20, 30]}
            onPageChange={onPageChange}
            style={{
              position: 'sticky',
              bottom: 0,
              zIndex: 1,
              backgroundColor: 'white',
              borderTop: '1px solid #D5E1EA',
              padding: '0.5rem',
              borderBottomRightRadius: '10px',
              borderBottomLeftRadius: '10px',
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

          <div className="relative inline-block">
            <div className="relative">
              <img
                src="/assets/images/Search.png"
                alt="search icon"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
                data-testid="search-icon"
              />
              <InputText
                value={searchInvoice}
                onChange={handleSearchInvoice}
                placeholder="Search"
                id="placeholderText"
                className="pl-10 w-[237px] bg-[#00426F] h-[35px] rounded-lg border text-[white] border-[#D5E1EA] placeholder:text-[#FFFFFF]  focus:outline-none"
              />
            </div>
          </div>
        </div>
        <div className="h-[293px] overflow-auto">
          <DataTableComponent
            tableStyle={{
              fontSize: '12px',
              color: '#000000',
              fontWeight: 700,
            }}
            data={workOrderData}
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
            first={pageNumber2}
            rows={pageSizeTwo}
            totalRecords={totalRecords}
            rowsPerPageOptions={[5, 10, 20, 30]}
            onPageChange={onPageChangeTwo}
            style={{
              position: 'sticky',
              bottom: 0,
              zIndex: 1,
              backgroundColor: 'white',
              borderTop: '1px solid #D5E1EA',
              padding: '0.5rem',
              borderBottomRightRadius: '10px',
              borderBottomLeftRadius: '10px',
            }}
          />
        </div>
      </div>


      <Dialog
        position="center"
        style={{
          width: '800px',
          minWidth: '800px',
          height: '580px',
          minHeight: '580px',
          borderRadius: '1rem',
          fontWeight: '400',
          cursor: 'alias',
        }}
        draggable={false}
        // visible={imageVisible}
        // onHide={() => setImageVisible(false)}
        headerStyle={{ cursor: 'alias' }}
        // header={'Customers Images'}
        visible={isPaymentModalOpen}
        onHide={handleModalClose}
        header="Payment"
      >
        <PaymentModal onHide={handleModalClose} onSavePayment={handlePaymentSave} />

        <div className={`flex gap-4 ml-4 bottom-5 absolute left-6 ${isLoading ? 'blurred' : ''}`}>
          <Button
            label={'Close'}
            onClick={() => setIsPaymentModalOpen(false)}
            style={{
              width: '89px',
              height: '42px',
              backgroundColor: '#0098FF',
              cursor: 'pointer',
              fontWeight: 'bolder',
              fontSize: '1rem',
              boxShadow: 'none',
              color: 'white',
              borderRadius: '0.5rem',
            }}
          />
        </div>
      </Dialog>



      <Dialog
        position="center"
        style={{
          width: '800px',
          minWidth: '800px',
          height: '580px',
          minHeight: '580px',
          borderRadius: '1rem',
          fontWeight: '400',
          cursor: 'alias',
        }}
        draggable={false}
        headerStyle={{ cursor: 'alias' }}
        visible={isContactModalOpen}
        onHide={handleModalClose}
        header="Contact Customer"
      >
        <ContactModal onHide={handleModalClose} onSendEmail={handleSendEmail} />
        <div className={`flex gap-4 ml-4 bottom-5 absolute left-6 ${isLoading ? 'blurred' : ''}`}>
          <Button
            label={'Close'}
            onClick={() => setIsContactModalOpen(false)}
            style={{
              width: '89px',
              height: '42px',
              backgroundColor: '#0098FF',
              cursor: 'pointer',
              fontWeight: 'bolder',
              fontSize: '1rem',
              boxShadow: 'none',
              color: 'white',
              borderRadius: '0.5rem',
            }}
          />
        </div>
      </Dialog>


    </>
  )
}

export default AccountRecievable
