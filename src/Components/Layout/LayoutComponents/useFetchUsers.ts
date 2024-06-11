import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useGetUsersMutation } from '../../../Services/AdminTools/AdminToolsApi';
import { CustomerPayload, ErrorResponse, GetUserResponse } from '../../../Type/ApiTypes';
import { setCustomerId, setCustomerName } from '../../../Store/Slice/userSlice';

export const useFetchUsers = (role: number) => {
  const dispatch = useDispatch();
  const [getCustomerOwner, setgetCustomerOwner] = useState<CustomerPayload[]>([]);
  const [getUser] = useGetUsersMutation();

  const getUserData = useCallback(async () => {
    dispatch(setCustomerId(''));
    dispatch(setCustomerName(''));
    try {
      const response = await getUser({}).unwrap();
      const { status, message, content } = response as GetUserResponse;
      if (status === 200 && Array.isArray(content)) {
        if (content.length > 0) {
          setgetCustomerOwner(content);
        } else {
          setgetCustomerOwner([]);
        }
      }
    } catch (error) {
      const { message } = error as ErrorResponse;
      console.error('Error occurred while fetching customer data:', message);
    }
  }, [getUser, role, dispatch]);

  useEffect(() => {
    if (role === 1) {
        getUserData();
    }
  }, [role, getUserData]);

  return { getCustomerOwner, getUserData };
};
