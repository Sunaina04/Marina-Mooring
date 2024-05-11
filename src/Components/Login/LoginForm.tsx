import { useEffect, useState } from 'react';
import {
  useGetEmployeeMutation,
  useLoginMutation,
  useResetPasswordMutation,
} from '../../Services/Authentication/AuthApi';
import { ErrorResponse, LoginResponse, ResetPasswordResponse } from '../../Type/ApiTypes';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../../Store/Slice/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import './Login.module.css'

export default function LoginForm() {
  const dispatch = useDispatch();
  const [loginPayload, setLoginPayload] = useState({
    username: '',
    password: '',
  });
  const { username, password } = loginPayload;
  const userData = useSelector((state: any) => state.user?.userData);
  const token = useSelector((state: any) => state.user?.token);
  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setLoginPayload(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ***************************************************
   * NOTE: API Hooks
   ****************************************************/
  const [login] = useLoginMutation();
  const [getEmployee] = useGetEmployeeMutation();

  const signInHandler = async () => {
    if (!username.trim()) {
      setErrors(prev => ({
        ...prev,
        email: 'Email cannot be empty',
      }));
      return;
    }
    if (!password.trim()) {
      setErrors(prev => ({
        ...prev,
        password: 'Password cannot be empty',
      }));
      return;
    }

    try {
      const response = await login(loginPayload).unwrap();
      const { status, user, token, message } = response as LoginResponse;
      if (status === 200) {
        dispatch(setUserData({ ...user }));
        localStorage.setItem('token', token);
        setLoginPayload({
          username: '',
          password: '',
        });
        navigate('/dashboard');
      }
    } catch (error: any) {
      console.error('Error occurred during login:', error);
      if (error.data) {
        const { message: msg } = error.data as ErrorResponse;
      }
    }
  };

  const getEmployeeHandler = async () => {
    const response = await getEmployee({});
  };

  useEffect(() => {
    getEmployeeHandler();
  }, []);

  return (
    <>
      <div
        className="w-full h-screen flex justify-center items-center"
        style={{
          backgroundImage: "url('/assets/images/loginBackgroundImage.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
        }}>
        <div
          className="bg-white rounded-xl p-8 w-350 absolute top-227 left-420 gap-8 h-auto"
          style={{ width: '600px', height: '650px' }}>
          <div className="text-center mt-[1rem]">
            <img
              src="/assets/images/moorfindLogo.png"
              alt="Logo"
              className="mx-auto w-60 h-14 mb-5 "
            />
          </div>
          <div className="flex flex-col justify-center text-center mt-[5rem]">
            <div className="text-red-500">{errors.email}</div>
            <div className="flex flex-col gap-5 items-center">
              <div className="input-container relative">
                <InputText
                  style={{
                    width: '25vw',
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
                  className="input-icon w-5 h-10 absolute top-[50%] transform -translate-y-1/2 left-10 text-[#00426f] text-lg font-[900]"
                  style={{
                    backgroundImage: `url('/assets/images/envelope.png')`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'contain',
                  }}></span>
              </div>

              <div className="input-container relative">
                <InputText
                  style={{
                    width: '25vw',
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
                  className="input-icon w-5 h-10 absolute top-[50%] transform -translate-y-1/2 left-10 text-[#00426f] text-lg font-[900]"
                  style={{
                    backgroundImage: `url('/assets/images/key.png')`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'contain',
                  }}></span>
              </div>

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

              <Button
                style={{
                  width: '25vw',
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
            </div>
          </div>

          <div className="bottom-text absolute bottom-10 left-1/2 transform -translate-x-1/2">
            <p className="text-sm w-[28vw] text-center mt-8 text-[#00426F] leading-6 font-roboto font-[400]">
              Just testing the waters? If you do not have an account&nbsp;
              <a
                href="https://www.moorfind.com/"
                className="underline font-bolder font-[700] text-sm">
                CLICK HERE
              </a>
              &nbsp;to let us <br /> know If you would like to connect and see if MOORFIND can
              work for you and your business.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
