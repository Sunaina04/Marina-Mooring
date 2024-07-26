import { Button } from 'primereact/button'
import { Password } from 'primereact/password'
import { ProgressSpinner } from 'primereact/progressspinner'
import React, { useState } from 'react'

function ResetPassword() {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <>
      <div
        className={`bg-white rounded-xl p-8  left-420 gap-6 h-auto ${isLoading ? 'blur-screen' : ''}`}
        style={{ width: '600px' }}>
        <div className="text-center text-xl font-bold tracking-wide">
          {/* <img
            src="/assets/images/moorfindLogo.png"
            alt="Logo"
            className="mx-auto w-60 h-14 mb-5"
            id="logo"
          /> */}
          {/* <h1>Reset Password</h1> */}
        </div>
        <div className="flex flex-col justify-center text-center min-[320px]:w[270px]">
          <div className="text-red-500  text-sm"></div>
          <div className="flex flex-col items-center">
            <div className="text-red-500 mb-5  text-sm"></div>
            <div className="p-input-icon-left">
              <div
                className="card flex justify-content-center"
                style={{ position: 'relative', width: '100%' }}>
                <Password
                  type={'text'}
                  name="password"
                  // value={password}
                  // onChange={handleChange}
                  // onKeyUp={handleKeyUp}
                  feedback={false}
                  toggleMask
                  disabled={isLoading}
                  placeholder={isLoading ? 'Loading...' : 'New Password'}
                  style={{
                    padding: '0 2rem 0 3rem',
                    border: '1px solid #C5D9E0',
                    fontSize: '18px',
                    color: '#00426F',
                    borderRadius: '10px',
                    width: '500px',
                    height: '60px',
                  }}
                />
                <img
                  src="/assets/images/key.png"
                  alt="Key Icon"
                  className="p-clickable"
                  style={{
                    position: 'absolute',
                    left: '13px',
                    top: '55%',
                    transform: 'translateY(-50%)',
                    width: '22px',
                    height: '20px',
                    pointerEvents: 'none',
                  }}
                />
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

            <div className="p-input-icon-left">
              <div
                className="card flex justify-content-center"
                style={{ position: 'relative', width: '100%' }}>
                <Password
                  type={'text'}
                  name="password"
                  // value={password}
                  // onChange={handleChange}
                  // onKeyUp={handleKeyUp}
                  feedback={false}
                  toggleMask
                  disabled={isLoading}
                  placeholder={isLoading ? 'Loading...' : 'Confirm Password'}
                  style={{
                    padding: '0 2rem 0 3rem',
                    border: '1px solid #C5D9E0',
                    fontSize: '18px',
                    color: '#00426F',
                    borderRadius: '10px',
                    width: '500px',
                    height: '60px',
                    marginTop:'2rem'
                  }}
                />
                <img
                  src="/assets/images/key.png"
                  alt="Key Icon"
                  className="p-clickable"
                  style={{
                    position: 'absolute',
                    left: '13px',
                    top: '70%',
                    transform: 'translateY(-50%)',
                    width: '22px',
                    height: '20px',
                    pointerEvents: 'none',
                  }}
                />
              </div>
            </div>
            <div className="flex justify-end mb-8 mt-5 w-[500px] cursor-pointer underline">
              <span
                className="font-normal"
                style={{
                  fontSize: '16px',
                  fontWeight: 400,
                  lineHeight: '18.75px',
                  textAlign: 'right',
                  color: '#00426F',
                }}></span>
            </div>

            {/* <Button
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
              // onClick={signInHandler}
              disabled={isLoading}>
              <p>Submit</p>
            </Button>
            <Button
              style={{
                width: '500px',
                height: '60px',
                padding: '0 4rem 0 3rem',
                fontSize: '22px',
                lineHeight: '25.78px',
                color: '#00426F',
                borderRadius: '10px',
                backgroundColor: '#F2F2F2 ',
                textAlign: 'center',
                display: 'flex',
                fontWeight: '500',
                justifyContent: 'center',
              }}
              // onClick={signInHandler}
               className="mt-5"
              disabled={isLoading}>
              <p>Back</p>
            </Button> */}
             <div
          className="flex gap-6 bottom-2 absolute left-7"
          style={{
            width: '100%',
            height: '80px',
            backgroundColor: 'white',
            padding: '0 12px',
            bottom: '0px',
          }}>
          <Button
           // onClick={saveForm}
            label={'Save'}
            style={{
              width: '100px',
              height: '42px',
              border: 'none',
              backgroundColor: '#007bff',
              color: 'white',
              borderRadius: '0.50rem',
              marginTop: '10px',
            }}
          />
          <Button
            // onClick={() => {
            //   closeModal()
            // }}
            label={'Back'}
            text={true}
            style={{
              backgroundColor: 'white',
              color: '#000000',
              border: 'none',
              width: '89px',
              height: '42px',
              marginTop: '10px',
            }}
          />
        </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ResetPassword
