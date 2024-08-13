import { Button } from 'primereact/button'
import React, { useRef, useState } from 'react'
import { AiOutlineDelete } from 'react-icons/ai'
import { FaFileUpload } from 'react-icons/fa'
import { Toast } from 'primereact/toast'
import { useUploadProfileImageMutation } from '../../../Services/Authentication/AuthApi'
import { ErrorResponse, UserProfile } from '../../../Type/ApiTypes'

const HeaderUploadImage: React.FC<any> = ({ isLoading, handleModalClose }) => {
  const [images, setImages] = useState<string[]>([])
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const toastRef = useRef<Toast>(null)
  const [uploadProfileImage]=useUploadProfileImageMutation()
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result as string
        setImages([base64String])
      }
      reader.readAsDataURL(file)
    }
  }

  const uploadIamge = async () => {
    // Validate form fields
    // const errors = validateFields();
    // if (Object.keys(errors).length > 0) {
    //   setFieldsError(errors);
    //   return;
    // }

    try {
      // Create the payload
      const payload = {
        id: 0,
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: "",
        roleId: 0,
        customerOwnerId: 0,
        companyName: "",
        stateId: 0,
        countryId: 0,
        address: "",
        zipCode: "",
        confirmPassword: "",
        encodedImage:images
      };
  
      // Upload profile image
      const response = await uploadProfileImage(payload).unwrap();
      const { status, message } = response as UserProfile;
  
      // Handle success response
      if (status === 200 || status === 201) {
        // toastRef.current?.show({
        //   severity: 'success',
        //   summary: 'Success',
        //   detail: message,
        //   life: 3000,
        // });
        handleModalClose()
        // getFormsData();
      } else {
        // toastRef.current?.show({
        //   severity: 'error',
        //   summary: 'Error',
        //   detail: message,
        //   life: 3000,
        // });
      }
    } catch (error) {
      const { message, data } = error as ErrorResponse;
      // toastRef.current?.show({
      //   severity: 'error',
      //   summary: 'Error',
      //   detail: message || data?.message,
      //   life: 3000,
      // });
    }
  };



  const handleRemoveImage = () => {
    setImages([])
  }

  return (
    <div>
      <Toast ref={toastRef} />
      <div className={`ml-4 ${isLoading ? 'blurred' : ''}`} style={{ marginBottom: '60px' }}>
        <div className="flex justify-center text-center">
          <div className="mt-">
            <input
              id="file-input"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{
                display: 'none',
              }}
            />
            <label
              htmlFor="file-input"
              style={{
                width: '300px',
                height: '40px',
                border: '2px solid #0098FF',
                borderRadius: '0.50rem',
                fontSize: '0.8rem',
                paddingLeft: '0.5rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}>
              <FaFileUpload
                style={{
                  fontSize: '29px',
                  color: '#0098FF',
                  marginLeft: '1rem',
                  marginTop: '3px',
                }}
              />
              <div className="border-r-2 border-sky-500 h-9 pl-3"></div>
              <span className="pl-10 mt-1">UPLOAD IMAGE</span>
            </label>
          </div>
        </div>

        <div style={{ marginTop: '40px' }}>
          {images.length > 0 && (
            <div className="mt-2">
              <div className="flex gap-16 justify-center text-center">
                {images.map((image, index) => (
                  <div
                    key={index}
                    style={{ position: 'relative', display: 'inline-block' }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}>
                    <AiOutlineDelete
                      onClick={handleRemoveImage}
                      style={{
                        position: 'absolute',
                        top: '165px',
                        right: '5px',
                        background: 'red',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        width: '28px',
                        height: '25px',
                        cursor: 'pointer',
                        opacity: hoveredIndex === index ? 1 : 0,
                        transition: 'opacity 0.3s',
                      }}
                    />
                    <img
                      src={image}
                      alt={`Uploaded ${index}`}
                      style={{
                        width: '300px',
                        height: '200px',
                        objectFit: 'cover',
                        borderRadius: '0.5rem',
                        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div
        className={`flex gap-4 ml-4 absolute bottom-0 left-0 right-0 ${isLoading ? 'blurred' : ''}`}
        style={{ padding: '16px', backgroundColor: 'white' }}>
        <Button
          label={'Save'}
          onClick={uploadIamge}
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
        <Button
          label={'Close'}
          onClick={() => handleModalClose()}
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
    </div>
  )
}

export default HeaderUploadImage
