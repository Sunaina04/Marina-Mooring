import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { useResetPasswordMutation } from '../../Services/Authentication/AuthApi'
import { ResetPasswordResponse } from '../../Type/ApiTypes'
import { useState } from 'react'
import { token } from '../../Store/Slice/userSlice'
import { useNavigate } from 'react-router-dom'

const ResetPassword = () => {
  const [resetPassword] = useResetPasswordMutation()
  const [passwords, setPasswords] = useState({
    newPassword: '',
    confirmPassword: '',
  })
  const navigateToLoginPage = useNavigate()

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target
    setPasswords((prevPasswords) => ({
      ...prevPasswords,
      [name]: value,
    }))
  }

  const handleResetPassword = async () => {
    const resetPassPayload = {
      newPassword: passwords.newPassword,
      confirmPassword: passwords.confirmPassword,
    }
    try {
      const response = await resetPassword({
        payload: resetPassPayload,
        token: token,
      }).unwrap()
      const { status, content, message } = response as ResetPasswordResponse
    } catch (error: any) {
      console.error('Error occurred during password reset:', error)
      if (error.data) {
        console.log(error)
      }
    }
  }
  
  return (
    <>
      <div
        className="w-full h-screen flex justify-center items-center"
        style={{
          backgroundImage: "url('/assets/images/loginBackgroundImage.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}>
        <div className="bg-white rounded-xl p-8 w-600 absolute top-227 left-420 gap-8  h-[70vh]">
          <div className="text-center mt-[1rem]">
            <img
              src="/assets/images/moorfindLogo.png"
              alt="Logo"
              className="mx-auto w-60 h-14 mb-5 "
            />
          </div>
          <div className="flex flex-col justify-center text-center">
            <div className="text-red-500 ">{ }</div>
            <div className="flex flex-col gap-5 mt-20">
              <div className="p-input-icon-left relative flex justify-center ">
                <InputText
                  style={{
                    width: '28vw',
                    height: '7vh',
                    padding: '0 4rem 0 3rem',
                    border: '1px solid #C5D9E0',
                    fontSize: '16px',
                    color: '#00426F',
                    borderRadius: '10px',
                  }}
                  placeholder="New Password"
                  name="newPassword"
                  onChange={handleChange}
                  value={passwords.newPassword}
                />
                <span
                  className="w-5 h-5 absolute top-[2rem] transform -translate-y-1/2 left-4 text-[#00426f] text-lg font-[900]"
                  style={{
                    backgroundImage: `url('/assets/images/key.png')`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'contain',
                  }}></span>
              </div>

              <div className="p-input-icon-left relative">
                <InputText
                  style={{
                    width: '28vw',
                    height: '7vh',
                    padding: '0 4rem 0 3rem',
                    border: '1px solid #C5D9E0',
                    fontSize: '16px',
                    color: '#00426F',
                    borderRadius: '10px',
                  }}
                  placeholder={'Confirm Password'}
                  name="confirmPassword"
                  onChange={handleChange}
                  value={passwords.confirmPassword}
                />
                <span
                  className="w-5 h-5 absolute top-[2rem] transform -translate-y-1/2 left-4 text-[#00426f] text-lg font-[900]"
                  style={{
                    backgroundImage: `url('/assets/images/key.png')`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'contain',
                  }}></span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center mt-8">
            <Button
              style={{
                width: '28vw',
                height: '7vh',
                padding: '0 4rem 0 3rem',
                border: '1px solid #C5D9E0',
                fontSize: '22px',
                lineHeight: '25.78px',
                color: '#FFFFFF',
                borderRadius: '10px',
                backgroundColor: '#0098FF',
                textAlign: 'center',
                display: 'flex',
                fontWeight: '700',
                justifyContent: 'center',
              }}
              onClick={handleResetPassword}>
              <p>Confirm</p>
            </Button>
            <Button
              style={{
                width: '28vw',
                height: '7vh',
                padding: '0 4rem 0 3rem',
                fontSize: '22px',
                lineHeight: '25.78px',
                color: '#00426F',
                borderRadius: '10px',
                backgroundColor: '#F2F2F2 ',
                textAlign: 'center',
                display: 'flex',
                fontWeight: '700',
                justifyContent: 'center',
                marginTop: '1rem',
              }}
              onClick={() => navigateToLoginPage('/Login')}>
              <p>Back</p>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ResetPassword
