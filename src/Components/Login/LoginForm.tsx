import { useEffect, useState } from 'react'
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
import { Button } from 'primereact/button'
import './Login.module.css'

export default function LoginForm() {
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

    if ('') {
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
        <div className="bg-white rounded-xl p-8 w-600 absolute top-227 left-420 gap-8  h-auto">
          <div className="text-center mt-[1rem]">
            <img
              src="/assets/images/moorfindLogo.png"
              alt="Logo"
              className="mx-auto w-60 h-14 mb-5 "
            />
          </div>
          <div className="flex flex-col justify-center text-center  mt-[5rem]">
            <div className="text-red-500 ">{errors.email}</div>
            <div className="flex flex-col gap-5">
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
                  placeholder="Enter Your Email"
                  name="username"
                  value={username}
                  onChange={handleChange}
                />
                <span
                  className="w-5 h-5 absolute top-[2rem] transform -translate-y-1/2 left-4 text-[#00426f] text-lg font-[900]"
                  style={{
                    backgroundImage: `url('/assets/images/envelope.png')`,
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
                  placeholder="Enter Your Password"
                  name="password"
                  value={password}
                  onChange={handleChange}
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
            <>
              <div className="flex justify-end mt-8 cursor-pointer underline">
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
            </>
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
              onClick={signInHandler}>
              <p>Login</p>
            </Button>
            <div className="flex justify-center items-center mt-8">
              <div>
                <p className="text-sm w-[28vw] text-center mt-2 text-[#00426F]  leading-6 font-[400] font">
                  Just testing the waters? If you do not have an account
                  <a
                    href="https://www.moorfind.com/"
                    className="underline font-bolder font-[700] text-sm">
                    CLICK HERE
                  </a>
                  to let us <br /> know you would like to connect and see if MOORFIND can work for
                  you and your business.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
