import { useState } from 'react'
import { useLoginMutation } from '../../Services/Authentication/AuthApi'
import { ErrorResponse, LoginResponse, ResetPasswordResponse } from '../../Type/ApiTypes'
import { useDispatch, useSelector } from 'react-redux'
import { setToken, setUserData } from '../../Store/Slice/userSlice'
import { Link, useNavigate } from 'react-router-dom'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import './Login.module.css'

export default function LoginForm() {
  const dispatch = useDispatch()
  const [loginPayload, setLoginPayload] = useState({
    username: '',
    password: '',
  })
  const { username, password } = loginPayload
  const navigate = useNavigate()
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setLoginPayload((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  /* ***************************************************
   * NOTE: API Hooks
   ****************************************************/
  const [login] = useLoginMutation()

  const signInHandler = async () => {
    if (!username.trim()) {
      setErrors((prev) => ({
        ...prev,
        email: 'Email cannot be empty',
      }))
      return
    }
    if (!password.trim()) {
      setErrors((prev) => ({
        ...prev,
        password: 'Password cannot be empty',
      }))
      return
    }

    try {
      const response = await login(loginPayload).unwrap()
      const { status, user, token, message } = response as LoginResponse
      if (status === 200) {
        dispatch(setUserData({ ...user }))
        dispatch(setToken(token))
        setLoginPayload({
          username: '',
          password: '',
        })
        navigate('/dashboard')
      }
    } catch (error: any) {
      console.error('Error occurred during login:', error)
      if (error.data) {
        const { message: msg } = error.data as ErrorResponse
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
        <div
          className="bg-white rounded-xl p-8 top-227 left-420 gap-8 h-auto"
          style={{ width: '600px' }}>
          <div className="text-center mt-[1rem]">
            <img
              src="/assets/images/moorfindLogo.png"
              alt="Logo"
              className="mx-auto w-60 h-14 mb-5"
            />
          </div>
          <div className="flex flex-col justify-center text-center mt-[5rem]">
            <div className="text-red-500">{errors.email}</div>
            <div className="flex flex-col gap-5 items-center">
              <div className="p-input-icon-left">
                <InputText
                  placeholder="Enter Your Email"
                  name="username"
                  value={username}
                  onChange={handleChange}
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
                  onChange={handleChange}
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
              </div>

              <div className="flex justify-end mb-8 w-[500px] cursor-pointer underline">
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
                  fontWeight: '700',
                  justifyContent: 'center',
                }}
                onClick={signInHandler}>
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
