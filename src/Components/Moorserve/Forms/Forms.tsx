import { useEffect, useMemo, useState } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import CustomModal from '../../CustomComponent/CustomModal'
import { FormsPayload, FormsResponse } from '../../../Type/ApiTypes'
import {
  useDownloadFormMutation,
  useGetFormsMutation,
} from '../../../Services/MoorServe/MoorserveApi'
import { Button } from 'primereact/button'
import useSubmit from '../../../Services/CustomHook/useSubmit'
import FormFields from '../../CustomComponent/FormFields'
import Header from '../../Layout/LayoutComponents/Header'
import AddCustomer from '../../Moormanage/Customer/AddCustomer'
import DataTableComponent from '../../CommonComponent/Table/DataTableComponent'
import { ActionButtonColumnProps } from '../../../Type/Components/TableTypes'
import { FormDataa } from '../../Utils/CustomData'

const Forms = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formsData, setFormsData] = useState<FormsPayload[]>([])
  const [customerName, setCustomerName] = useState('')
  const [customerID, setCustomerID] = useState('')
  const [formName, setFormName] = useState('')
  const [file, setFile] = useState<File | undefined>(undefined)
  const [getForms] = useGetFormsMutation()
  const [downloadForms] = useDownloadFormMutation()
  const { error, response, handleSubmit } = useSubmit()

  const handleButtonClick = () => {
    // setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  const handleDownload = async (rowData: any) => {
    try {
      const response = await downloadForms({
        filename: rowData.formName,
      }).unwrap()
    } catch (error) {
      console.error('Error fetching forms:', error)
    }
  }

  const getFormsData = async () => {
    try {
      const response = await getForms({}).unwrap()
      const { status, content } = response as FormsResponse
      if (status === 200 && Array.isArray(content)) {
        setFormsData(content)
      }
    } catch (error) {
      console.error('Error fetching forms:', error)
    }
  }

  const handleSave = async () => {
    const formData = new FormData()
    if (file) {
      const blob = new Blob([file], { type: 'application/octet-stream' })
      const fileBlob = new File([blob], 'filename.txt')
      formData.append('file', fileBlob)
    }
    formData.append('customerName', customerName)
    formData.append('customerId', customerID)
    handleSubmit(formData)
    if (response?.status === 200) {
      setIsModalOpen(false)
    }
  }

  useEffect(() => {
    getFormsData()
  }, [])

  const columnStyle = {
    backgroundColor: '#FFFFFF',
    color: '#000000',
    fontWeight: '500',
    fontSize: '12px',
  }

  const FormsColumns = useMemo(
    () => [
      {
        id: 'id',
        label: 'ID',
        style: columnStyle,
      },
      {
        id: 'submittedBy',
        label: 'Submitted by',
        style: columnStyle,
      },
      {
        id: 'formName',
        label: 'Form Name',
        style: columnStyle,
      },
      {
        id: 'submittedDate',
        label: 'Submitted Date',
        style: columnStyle,
      },
    ],
    [],
  )
  const ActionButtonColumn: ActionButtonColumnProps = {
    header: 'Action',
    buttons: [
      {
        color: 'black',
        label: 'Download',
        underline: true,
      },
    ],
    headerStyle: {
      backgroundColor: '#FFFFFF',
      color: '#000000',
      fontWeight: '500',
      fontSize: '12px',
    },
    style: { borderBottom: '1px solid #D5E1EA', backgroundColor: '#FFFFFF', fontWeight: '400' },
  }

  return (
    <>
      <Header header="MOORSERVE/Forms" />

      <div className="flex justify-end">
        <div className=" mr-16 mt-14">
          <CustomModal
            buttonText={'Upload New'}
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
              fontSize: '14px',
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
        className="bg-[F2F2F2]  ml-12  mt-6 mr-14">
        <div className="flex flex-wrap align-items-center justify-between  bg-[#00426F] p-2   rounded-tl-[5px] rounded-tr-[5px]">
          <span
            style={{
              fontSize: '18px',
              fontWeight: '700',
              lineHeight: '21.09px',
              letterSpacing: '0.4837472140789032px',
              color: '#FFFFFF',
              padding: '8px',
            }}>
            Forms
          </span>

          <div className="relative inline-block">
            <div className="relative">
              <img
                src="/assets/images/Search.png"
                alt="search icon"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
                data-testid="search-icon"
              />
              <input
                placeholder="Search"
                className="pl-10 w-[237px] 
                  bg-[#00426F]
              
                  h-[35px] rounded-lg border text-white border-[#D5E1EA] focus:outline-none"
              />
            </div>
          </div>
        </div>
        <DataTableComponent
          tableStyle={{
            fontSize: '12px',
            color: '#000000',
            fontWeight: 600,
          }}
          data={undefined}
          columns={FormsColumns}
          actionButtons={ActionButtonColumn}
          style={{ borderBottom: '1px solid #D5E1EA', fontWeight: '200' }}
        />
      </div>
    </>
  )
}

export default Forms
