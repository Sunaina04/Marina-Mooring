import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { useResetPasswordMutation } from '../../Services/Authentication/AuthApi'
import { ResetPasswordResponse } from '../../Type/ApiTypes'
import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ProgressSpinner } from 'primereact/progressspinner'

const ResetPassword = () => {
  const urlParams = new URLSearchParams(window.location.search)
  const [searchParams] = useSearchParams()
  const tokenFromUrl = searchParams.get('token')
  const [resetPassword] = useResetPasswordMutation()
  const [message, setMessage] = useState<string>('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState({
    newPassword: false,
    confirmPassword: false,
  })
  const navigateToLoginPage = useNavigate()
  const [passwordCriteria, setPasswordCriteria] = useState({
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
    length: false,
  })
  const [isTyping, setIsTyping] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target
    if (name === 'newPassword') {
      setPassword(value)
      // Check password criteria
      setPasswordCriteria({
        uppercase: /[A-Z]/.test(value),
        lowercase: /[a-z]/.test(value),
        number: /\d/.test(value),
        specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(value),
        length: value.length >= 9,
      })

      // Check if all criteria are met
      const allCriteriaMet = Object.values(passwordCriteria).every((criteria) => criteria)
      if (allCriteriaMet) {
        setIsTyping(false) // Hide validation message
      } else {
        setIsTyping(true) // Show validation message
      }
    } else if (name === 'confirmPassword') {
      setConfirmPassword(value)
    }
  }

  const toggleShowPassword = (field: 'newPassword' | 'confirmPassword') => {
    setShowPassword((prevShowPassword) => ({
      ...prevShowPassword,
      [field]: !prevShowPassword[field],
    }))
  }

  const handleResetPassword = async () => {
    if (!password || !confirmPassword) {
      setMessage('Both password fields are required.')
      return
    }

    if (password !== confirmPassword) {
      setMessage('Passwords do not match.')
      return
    }

    const resetPassPayload = {
      newPassword: btoa(password), // Encoding password using btoa
      confirmPassword: confirmPassword,
    }

    setIsLoading(true)
    try {
      const response = await resetPassword({
        token: tokenFromUrl,
        payload: resetPassPayload,
      }).unwrap()
      const { status, content, message } = response as ResetPasswordResponse
      if (status === 200) {
        setMessage('Password reset successfully.')
        navigateToLoginPage('/Login')
        setIsLoading(false)
      } else {
        setMessage(message || 'Password reset failed.')
      }
    } catch (error: any) {
      console.error('Error occurred during password reset:', error)
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
              <div className="relative">
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
                  value={password}
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
                  }}
                />
                <img
                  src={
                    showPassword.confirmPassword
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
                <div
                  style={{
                    width: '500px',
                    fontSize: '14px',
                    position: 'absolute',
                    top: '100%',
                    left: '0',
                    backgroundColor: '#fff',
                    padding: '10px',
                    borderRadius: '5px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    maxHeight: '200px',
                    overflowY: 'auto',
                    zIndex: '999',
                    display: isTyping ? 'block' : 'none',
                  }}
                  id="password-message">
                  <h3 className="font-medium text-sm text-[#000000] flex justify-center mr-3">
                    PASSWORD MUST CONTAIN:
                  </h3>
                  <div className="flex items-center gap-6 p-1 mt-2">
                    {passwordCriteria.uppercase ? (
                      <img src={'/assets/images/check-mark.png'} alt="icon" className="w-4" />
                    ) : (
                      <img src={'/assets/images/close.png'} alt="icon" className="w-3 " />
                    )}
                    <p
                      className={`password-message-item ${
                        passwordCriteria.uppercase ? 'text-green-500' : 'text-red-500'
                      }`}>
                      At least <span className="font-[500]"> one uppercase letter</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-6 p-1">
                    {passwordCriteria.lowercase ? (
                      <img src={'/assets/images/check-mark.png'} alt="icon" className="w-4" />
                    ) : (
                      <img src={'/assets/images/close.png'} alt="icon" className="w-3 " />
                    )}

                    <p
                      className={`password-message-item ${
                        passwordCriteria.lowercase ? 'text-green-500' : 'text-red-500'
                      }`}>
                      At least <span className="font-[500]">one lowercase letter</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-6 p-1">
                    {passwordCriteria.number ? (
                      <img src={'/assets/images/check-mark.png'} alt="icon" className="w-4" />
                    ) : (
                      <img src={'/assets/images/close.png'} alt="icon" className="w-3 " />
                    )}
                    <p
                      className={`password-message-item ${
                        passwordCriteria.number ? 'text-green-500' : 'text-red-500'
                      }`}>
                      At least<span className="font-[500]">one number</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-6 p-1">
                    {passwordCriteria.specialChar ? (
                      <img src={'/assets/images/check-mark.png'} alt="icon" className="w-4" />
                    ) : (
                      <img src={'/assets/images/close.png'} alt="icon" className="w-3 " />
                    )}
                    <p
                      className={`password-message-item ${
                        passwordCriteria.specialChar ? 'text-green-500' : 'text-red-500'
                      }`}>
                      At least<span className="font-[500]">one special character</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-6 p-1">
                    {passwordCriteria.length ? (
                      <img src={'/assets/images/check-mark.png'} alt="icon" className="w-4" />
                    ) : (
                      <img src={'/assets/images/close.png'} alt="icon" className="w-3 " />
                    )}
                    <p
                      className={`password-message-item ${
                        passwordCriteria.length ? 'text-green-500' : 'text-red-500'
                      }`}>
                      At least <span className="font-[500]">10 characters</span>
                    </p>
                  </div>
                </div>
              </div>
              {isLoading && (
                <ProgressSpinner
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '50px',
                    height: '50px',
                  }}
                  strokeWidth="4"
                />
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
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  type={showPassword.confirmPassword ? 'text' : 'password'}
                  onChange={handleChange}
                  value={confirmPassword}
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
