import { useEffect, useState } from 'react'
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

  const header = (
    <div className="flex flex-wrap align-items-center justify-between gap-2 p-4">
      <span className="text-xl font-bold">Forms</span>
    </div>
  )

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
      <div className="bg-[#F2F2F2] rounded-md border-[1px] border-[#D1D1D1] p-2 mt-12 w-[61vw] ml-20">
        <DataTable value={formsData} header={header} tableStyle={{}}>
          <Column header="ID" field="id" style={{ width: '4vw' }}></Column>
          <Column field="submittedBy" header="Submitted by" style={{ width: '12vw' }}></Column>
          <Column field="formName" header="Form Name" style={{ width: '11vw' }}></Column>
          <Column field="submittedDate" header="Submitted Date" style={{ width: '12vw' }}></Column>
          <Column
            header="Action"
            style={{ width: '12vw' }}
            body={(rowData) => (
              <p
                onClick={() => handleDownload(rowData)}
                style={{
                  width: '5vw',
                  cursor: 'pointer',
                  fontWeight: 'bolder',
                  fontSize: '1vw',
                }}>
                DownLoad
              </p>
            )}></Column>
        </DataTable>
      </div>
    </>
  )
}

export default Forms
