import React, { useEffect, useState } from 'react'
import {
  useGetEmployeeMutation,
  useLoginMutation,
  useResetPasswordMutation,
} from '../../Services/Authentication/AuthApi'
import { ErrorResponse, LoginResponse, ResetPasswordResponse } from '../../Type/ApiTypes'
import { useDispatch, useSelector } from 'react-redux'
import { setUserData } from '../../Store/Slice/userSlice'
import { Link, useNavigate } from 'react-router-dom'
import { InputText } from 'primereact/inputtext'
import { LoginFormProps } from '../../Type/ComponentBasedType'
import { Button } from 'primereact/button'

export default function LoginForm({
  Label,
  typeEmail,
  typePass,
  showSinUp,
  admin,
}: LoginFormProps) {
  const dispatch = useDispatch()
  const [loginPayload, setLoginPayload] = useState({
    username: '',
    password: '',
  })
  const { username, password } = loginPayload
  const userData = useSelector((state: any) => state.user?.userData)
  const token = useSelector((state: any) => state.user?.token)
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
  const [getEmployee] = useGetEmployeeMutation()
  const [resetPassword] = useResetPasswordMutation()

  const signInHandler = async () => {
    if (loginPayload.username.length === 0) {
      setErrors((prev) => ({
        ...prev,
        email: 'Email cannot be empty',
      }))
    }

    if (loginPayload.password.length === 0) {
      setErrors((prev) => ({
        ...prev,
        password: 'Password cannot be empty',
      }))
    }

    if (admin) {
      // try {
      //   const response = await login(loginPayload).unwrap();
      //   const { status, user, token, message } = response as LoginResponse;
      //   if (status === 200) {
      //     console.log("data", user, response);
      //     dispatch(setUserData({ ...user }));
      //     localStorage.setItem("token", token);
      //     setLoginPayload({
      //       username: "",
      //       password: "",
      //     });

      navigate('/admin/login/permission')
      //   }
      // } catch (error: any) {
      //   console.error("Error occurred during login:", error);
      //   if (error.data) {
      //     const { message: msg } = error.data as ErrorResponse;
      //   }
      // }
    } else {
      try {
        const response = await login(loginPayload).unwrap()
        const { status, user, token, message } = response as LoginResponse
        if (status === 200) {
          dispatch(setUserData({ ...user }))
          localStorage.setItem('token', token)
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
  }

  const ResetPasswordHandler = async () => {
    const resetPassPayload = {
      newPassword: '',
      confirmPassword: '',
    }
    try {
      const response = await resetPassword({
        payload: resetPassPayload,
        token: token,
      }).unwrap()
      const { status, content, message } = response as ResetPasswordResponse
      if (status === 200) {
        navigate('/dashboard')
      }
    } catch (error: any) {
      console.error('Error occurred during password reset:', error)
      if (error.data) {
        const { message: msg } = error.data as ErrorResponse
      }
    }
  }

  const getEmployeeHandler = async () => {
    const response = await getEmployee({})
  }

  useEffect(() => {
    getEmployeeHandler()
  }, [])

  return (
    <>
      <div
        className="w-full h-screen flex justify-center items-center"
        style={{
          backgroundImage: "url('/assets/images/loginBackgroundImage.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}>
        <div className="bg-white rounded-lg p-8 w-600 h-700 absolute top-227 left-420 gap-8">
          <div className="text-center mb-3">
            <img
              src="/assets/images/moorfindLogo.png"
              alt="Logo"
              className="mx-auto w-15 h-12 mb-5"
            />
            <div className="text-red-500">{errors.email}</div>
            <div className="p-input-icon-left relative">
              <InputText
                style={{
                  width: '30vw',
                  height: '6vh',
                  padding: '0 4rem 0 3rem',
                  border: '1px solid #C5D9E0',
                  fontSize: '16px',
                  color: '#00426F',
                  borderRadius: '10px',
                }}
                type={
                  showSinUp
                    ? typeEmail === 'password'
                      ? 'password'
                      : 'text'
                    : typeEmail === 'email'
                      ? 'email'
                      : 'text'
                }
                placeholder={showSinUp ? 'New password' : 'Enter Your email'}
                name="username"
                value={username}
                onChange={handleChange}
              />
              <span
                className="w-5 h-5 absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400"
                style={{
                  backgroundImage: `url(${
                    showSinUp ? '/assets/images/key.png' : '/assets/images/envelope.png'
                  })`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'contain',
                }}></span>
            </div>
          </div>
          <div className="mb-3">
            <div className="p-input-icon-left relative">
              <InputText
                style={{
                  width: '30vw',
                  height: '6vh',
                  padding: '0 4rem 0 3rem',
                  border: '1px solid #C5D9E0',
                  fontSize: '16px',
                  color: '#00426F',
                  borderRadius: '10px',
                }}
                type={
                  showSinUp
                    ? typePass === 'password'
                      ? 'password'
                      : 'text'
                    : typePass === 'password'
                      ? 'password'
                      : 'text'
                }
                placeholder={showSinUp ? 'Confirm password' : 'Password'}
                name="password"
                value={password}
                onChange={handleChange}
              />
              <span
                className="w-5 h-5 absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400"
                style={{
                  backgroundImage: `url(${
                    admin ? '/assets/images/key.png' : '/assets/images/key.png'
                  })`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'contain',
                }}></span>
            </div>

            {!showSinUp && !admin && (
              <>
                <div className="flex justify-end mt-8 cursor-pointer ">
                  <Link to={'/forgotPassword'}>
                    <p
                      className="font-normal"
                      style={{
                        fontSize: '16px',
                        fontWeight: 400,
                        lineHeight: '18.75px',
                        textAlign: 'right',
                        color: '#00426F',
                      }}>
                      Forgot password?
                    </p>
                  </Link>
                </div>

                <div className="flex justify-end">
                  <span className="w-[7.40rem] h-[0.50px] bg-black text-black "></span>
                </div>
              </>
            )}
          </div>
          <div className="flex flex-col items-center">
            {admin && <span className="mb-8">For admin use only</span>}{' '}
            <Button
              className="w-30 h-10 bg-black text-white border border-black font-bold text-sm flex justify-center items-center"
              style={{ backgroundColor: '#0098FF', width: '30vw' }}
              onClick={showSinUp ? ResetPasswordHandler : signInHandler}>
              {Label}
            </Button>
            <div className="flex justify-center items-center mt-0">
              <div
                className="text-center mx-auto"
                style={{
                  width: '30vw',
                  fontSize: '14px',
                  lineHeight: '24px',
                  textAlign: 'center',
                  color: '#00426F',
                }}>
                <p className="text-xs font-bold">
                  Just testing the waters? If you do not have an account{' '}
                  <a href="https://www.moorfind.com/" className="underline font-bolder">
                    CLICK HERE
                  </a>{' '}
                  to let us know you would like to connect and see if MOORFIND can work for you and
                  your business.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
