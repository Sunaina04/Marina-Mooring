import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { useResetPasswordMutation } from '../../Services/Authentication/AuthApi'
import { ResetPasswordResponse } from '../../Type/ApiTypes'
import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

const ResetPassword = () => {
  const urlParams = new URLSearchParams(window.location.search)
  const [searchParams] = useSearchParams()
  const tokenFromUrl = searchParams.get('token')
  // const tokenFromUrl = urlParams.get('token')
  const [resetPassword] = useResetPasswordMutation()
  const [message, setMessage] = useState<string>('')
  const [passwords, setPasswords] = useState({
    newPassword: '',
    confirmPassword: '',
  })
  const [showPassword, setShowPassword] = useState({
    newPassword: false,
    confirmPassword: false,
  })
  const navigateToLoginPage = useNavigate()

  console.log('I AM HERE, Token from URL:', tokenFromUrl)

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target
    setPasswords((prevPasswords) => ({
      ...prevPasswords,
      [name]: value,
    }))
    console.log('Updated passwords state:', { [name]: value })
  }

  const toggleShowPassword = (field: 'newPassword' | 'confirmPassword') => {
    setShowPassword((prevShowPassword) => ({
      ...prevShowPassword,
      [field]: !prevShowPassword[field],
    }))
  }

  const handleResetPassword = async () => {
    if (!passwords.newPassword || !passwords.confirmPassword) {
      setMessage('Both password fields are required.')
      return
    }

    if (passwords.newPassword !== passwords.confirmPassword) {
      setMessage('Passwords do not match.')
      return
    }

    const resetPassPayload = {
      newPassword: passwords.newPassword,
      confirmPassword: passwords.confirmPassword,
    }

    try {
      console.log('Sending reset password request with token:', tokenFromUrl)
      const response = await resetPassword({
        token: tokenFromUrl,
        payload: resetPassPayload,
      }).unwrap()
      console.log('Response from server:', response)
      const { status, content, message } = response as ResetPasswordResponse
      if (status === 200) {
        setMessage('Password reset successfully.')
        navigateToLoginPage('/Login')
      } else {
        setMessage(message || 'Password reset failed.')
      }
    } catch (error: any) {
      console.error('Error occurred during password reset:', error)
      if (error.data) {
        console.log(error.data)
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
        <div className="bg-white rounded-xl p-8 w-600 absolute top-227 left-420 gap-8 h-auto">
          <div className="text-center mt-[1rem]">
            <img
              src="/assets/images/moorfindLogo.png"
              alt="Logo"
              className="mx-auto w-60 h-14 mb-5 "
            />
          </div>
          <div className="flex flex-col justify-center text-center">
            <div className="flex flex-col gap-5 mt-20">
              {message && (
                <div className="mb-4 flex justify-center">
                  <span className="mb-8 text-red-500 text-sm break-words max-w-md overflow-wrap-normal">
                    {message}
                  </span>
                </div>
              )}
              <div className="p-input-icon-left relative flex justify-center">
                <InputText
                  style={{
                    padding: '0 4rem 0 3rem',
                    border: '1px solid #C5D9E0',
                    fontSize: '16px',
                    color: '#00426F',
                    borderRadius: '10px',
                    width: '500px',
                    height: '60px',
                  }}
                  placeholder="New Password"
                  name="newPassword"
                  type={showPassword.newPassword ? 'text' : 'password'}
                  onChange={handleChange}
                  value={passwords.newPassword}
                />
                <img
                  src="/assets/images/key.png"
                  alt="Key Icon"
                  className="p-clickable"
                  style={{
                    position: 'absolute',
                    left: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '20px',
                    height: '20px',
                    color: '#000000',
                  }}
                />

                {/* Password Visibility */}
                <img
                  src={
                    showPassword.newPassword
                      ? '/assets/images/eye.png'
                      : '/assets/images/eye-slash.png'
                  }
                  alt="Toggle Password Visibility"
                  onClick={() => toggleShowPassword('newPassword')}
                  className="p-clickable"
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '20px',
                    height: '20px',
                    cursor: 'pointer',
                  }}
                />
              </div>

              <div className="p-input-icon-left relative flex justify-center">
                <InputText
                  style={{
                    padding: '0 4rem 0 3rem',
                    border: '1px solid #C5D9E0',
                    fontSize: '16px',
                    color: '#00426F',
                    borderRadius: '10px',
                    width: '500px',
                    height: '60px',
                  }}
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  type={showPassword.confirmPassword ? 'text' : 'password'}
                  onChange={handleChange}
                  value={passwords.confirmPassword}
                />
                <img
                  src="/assets/images/key.png"
                  alt="Key Icon"
                  className="p-clickable"
                  style={{
                    position: 'absolute',
                    left: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '20px',
                    height: '20px',
                    color: '#000000',
                  }}
                />

                {/* Password Visibility */}
                <img
                  src={
                    showPassword.confirmPassword
                      ? '/assets/images/eye.png'
                      : '/assets/images/eye-slash.png'
                  }
                  alt="Toggle Password Visibility"
                  onClick={() => toggleShowPassword('confirmPassword')}
                  className="p-clickable"
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '20px',
                    height: '20px',
                    cursor: 'pointer',
                  }}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center mt-8">
            <Button
              style={{
                width: '500px',
                height: '60px',
                minHeight: '60px',
                padding: '0 4rem 0 3rem',
                border: '1px solid #C5D9E0',
                fontSize: '22px',
                lineHeight: '25.78px',
                color: '#FFFFFF',
                borderRadius: '10px',
                backgroundColor: '#0098FF',
                textAlign: 'center',
                display: 'flex',
                fontWeight: '500',
                justifyContent: 'center',
              }}
              onClick={handleResetPassword}>
              <p>Confirm</p>
            </Button>
            <Button
              style={{
                width: '500px',
                height: '60px',
                top: '20px',
                padding: '0 4rem 0 3rem',
                fontSize: '22px',
                lineHeight: '25.78px',
                color: '#00426F',
                borderRadius: '10px',
                backgroundColor: '#F2F2F2',
                textAlign: 'center',
                display: 'flex',
                fontWeight: '500',
                justifyContent: 'center',
                marginBottom: '30px',
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
