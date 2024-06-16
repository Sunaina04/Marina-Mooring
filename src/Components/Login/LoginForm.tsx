import { useState, useRef } from 'react'
import { useLoginMutation } from '../../Services/Authentication/AuthApi'
import { ErrorResponse, LoginResponse, ResetPasswordResponse } from '../../Type/ApiTypes'
import { useDispatch, useSelector } from 'react-redux'
import { setCustomerId, setCustomerName, setToken, setUserData } from '../../Store/Slice/userSlice'
import { Link, useNavigate } from 'react-router-dom'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import './Login.css'
import { ProgressSpinner } from 'primereact/progressspinner'
import { Toast } from 'primereact/toast'

export default function LoginForm() {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const [login] = useLoginMutation()
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  })
  const [isLoading, setIsLoading] = useState(false)

  const toast = useRef<Toast>(null)

  const handleChange = (e: any) => {
    const { name, value } = e.target

    if (name === 'username') {
      setUsername(value)
    } else if (name === 'password') {
      setPassword(value)
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name === 'username' ? 'email' : 'password']: '',
    }))
  }
  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      signInHandler()
    }
  }

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword)
  }

  const signInHandler = async () => {
    setErrors({ email: '', password: '' })

    // if (username.trim().length === 0 && password.trim().length === 0) {
    //   toast.current?.show({
    //     severity: 'error',
    //     summary: 'Error',
    //     detail: 'Both fields are required',
    //     life: 3000,
    //   });
    //   return;
    // }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (username.trim().length === 0) {
      setErrors((prev) => ({
        ...prev,
        email: 'Email cannot be empty',
      }))
      // toast.current?.show({
      //   severity: 'error',
      //   summary: 'Error',
      //   detail: 'Email cannot be empty',
      //   life: 3000,
      // })
      return
    }
    if (!emailRegex.test(username.trim())) {
      setErrors((prev) => ({
        ...prev,
        email: 'Invalid email format',
      }))
      // toast.current?.show({
      //   severity: 'error',
      //   summary: 'Error',
      //   detail: 'Invalid email format',
      //   life: 3000,
      // })
      return
    }
    if (password.trim().length === 0) {
      setErrors((prev) => ({
        ...prev,
        password: 'Password cannot be empty',
      }))
      // toast.current?.show({
      //   severity: 'error',
      //   summary: 'Error',
      //   detail: 'Password cannot be empty',
      //   life: 3000,
      // })
      return
    }
    setIsLoading(true)

    const loginPayload = {
      password: btoa(password),
      username,
    }

    try {
      const response = await login(loginPayload).unwrap()
      const { status, user, token, message, refreshToken } = response as LoginResponse
      if (status === 200) {
        sessionStorage.setItem('token', token)
        sessionStorage.setItem('refreshToken', refreshToken)
        dispatch(setUserData({ ...user }))
        dispatch(setToken(token))
        dispatch(setCustomerId(''))
        dispatch(setCustomerName(''))
        setUsername('')
        setPassword('')
        setIsLoading(false)
        navigate('/dashboard')
      }
    } catch (error: any) {
      console.error('Error occurred during login:', error)
      if (error.data) {
        const { message: msg } = error.data as ErrorResponse
        setErrors((prev) => ({
          ...prev,
          email: msg,
        }))
        setIsLoading(false)
      }
    }
  }

  return (
    <>
      <Toast ref={toast} />
      <div
        className="w-full h-screen flex justify-center items-center"
        id="header"
        style={{
          backgroundImage: "url('/assets/images/loginBackgroundImage.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}>
        <div
          className={`bg-white rounded-xl p-8 top-227 left-420 gap-8 h-auto ${isLoading ? 'blur-screen' : ''}`}
          style={{ width: '600px' }}>
          <div className="text-center mt-[1rem]">
            <img
              src="/assets/images/moorfindLogo.png"
              alt="Logo"
              className="mx-auto w-60 h-14 mb-5"
              id="logo"
            />
          </div>
          <div className="flex flex-col justify-center text-center mt-[5rem]">
            <div className="text-red-500 mb-2 text-sm">{errors.email && <p>{errors.email}</p>}</div>
            <div className="flex flex-col items-center">
              <div className="p-input-icon-left" id="input-field">
                <InputText
                  placeholder="Enter Your Email"
                  name="username"
                  value={username}
                  onChange={handleChange}
                  onKeyUp={handleKeyUp}
                  id="input-field"
                  style={{
                    width: '500px',
                    height: '60px',
                    padding: '0 4rem 0 3rem',
                    border: '1px solid #C5D9E0',
                    fontSize: '16px',
                    color: '#00426F',
                    borderRadius: '10px',
                    minHeight: '6vh',
                  }}
                />
                <img
                  src="/assets/images/envelope.png"
                  alt="Envelope Icon"
                  className="p-clickable"
                  style={{
                    position: 'absolute',
                    left: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '20px',
                    height: '15px',
                  }}
                />
              </div>
              <div className="text-red-500 mb-5 mt-3 text-sm">{<p>{errors.password}</p>}</div>
              <div className="p-input-icon-left">
                <InputText
                  style={{
                    width: '500px',
                    height: '60px',
                    padding: '0 4rem 0 3rem',
                    border: '1px solid #C5D9E0',
                    fontSize: '16px',
                    color: '#00426F',
                    borderRadius: '10px',
                  }}
                  placeholder="Enter Your Password"
                  name="password"
                  value={password}
                  type={showPassword ? 'text' : 'password'}
                  onChange={handleChange}
                  onKeyUp={handleKeyUp}
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
                  src={showPassword ? '/assets/images/eye.png' : '/assets/images/eye-slash.png'}
                  alt="Toggle Password Visibility"
                  onClick={toggleShowPassword}
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
              <div className="flex justify-end mb-8 mt-5 w-[500px] cursor-pointer underline">
                <span
                  className="font-normal"
                  style={{
                    fontSize: '16px',
                    fontWeight: 400,
                    lineHeight: '18.75px',
                    textAlign: 'right',
                    color: '#00426F',
                  }}>
                  <Link to={'/forgotPassword'}>Forgot password?</Link>
                </span>
              </div>

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
                  // filter: isLoading ? 'blur(1px)' : 'none',
                }}
                onClick={signInHandler}
                disabled={isLoading}>
                <p>Login</p>
              </Button>
            </div>
          </div>
          <div
            style={{ width: '500px', fontSize: '14px', textAlign: 'center', lineHeight: '22px' }}>
            <p className="text-center mt-8 text-[#00426F] leading-6 font-[400]">
              Just testing the waters? If you do not have an account&nbsp;
              <a
                href="https://www.moorfind.com/"
                className="underline font-bolder font-[700] text-sm">
                CLICK HERE
              </a>
              &nbsp;to let us <br /> know If you would like to connect and see if MOORFIND can work
              for you and your business.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
