import React, { useState } from "react";
import MainContext from "./MainContext";

const baseUrl = 'http://localhost:5000';
// const baseUrl = 'https://school-backend-siwz.onrender.com'

const MainState = (props) => {
  const [user, setUser] = useState({});
  const [student, setStudent] = useState({});
  const login = async ({ email, password }) => {
    const resp = await fetch(`${baseUrl}/user/login`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });
    const data = await resp.json();
    // setUser(data);
    return data;
  };

  const StudentLogin = async ({ email, password }) => {
    const resp = await fetch(`${baseUrl}/student/login`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });
    const data = await resp.json();
    // setUser(data);
    return data;
  };

  const register = async ({ name, phone, email, password }) => {
    const resp = await fetch(`${baseUrl}/user/signin`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ name, phone, email, password })
    });
    const data = await resp.json();
    return data;
  };

  const sendOtp = async ({ email }) => {
    const resp = await fetch(`${baseUrl}/user/sendOtp`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'token': localStorage.getItem('b2b_token')
      },
      body: JSON.stringify({ email })
    });
    const data = await resp.json();
    // console.log(data);
    return data;
  };

  const submitOtp = async ({ otp, otp1 }) => {
    const resp = await fetch(`${baseUrl}/user/submitOtp`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'token': localStorage.getItem('b2b_token')
      },
      body: JSON.stringify({ otp, otp1 })
    });
    const data = await resp.json();
    return data;
  };

  const changePassword = async ({ email, password }) => {
    const resp = await fetch(`${baseUrl}/user/changePassword`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'token': localStorage.getItem('b2b_token')
      },
      body: JSON.stringify({ email, password })
    });
    const data = await resp.json();
    return data;
  };

  const resetPassword = async ({ userId, password }) => {
    const resp = await fetch(`${baseUrl}/user/resetPassword/${userId}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        'token': localStorage.getItem('b2b_token')
      },
      body: JSON.stringify({ password })
    });
    const data = await resp.json();
    return data;
  };

  const getUsers = async (id, query, page, perPage) => {
    const resp = await fetch(`${baseUrl}/user/getUsers?id=${id}&query=${query}&page=${page}&perPage=${perPage}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'token': localStorage.getItem('b2b_token')
      }
    });
    const data = await resp.json();
    return data;
  };

  const getProjects1 = async (id, query, page, perPage) => {
    const resp = await fetch(`${baseUrl}/project/getProjects1?id=${id}&query=${query}&page=${page}&perPage=${perPage}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'token': localStorage.getItem('b2b_token')
      }
    });
    const data = await resp.json();
    return data;
  };

  const postSubscription = async ({ subscription_type, subsciption_price, desc1, desc2, desc3, desc4 }) => {

    const token = localStorage.getItem('b2b_token');

    const data = {
      subscription_type, subsciption_price, desc1, desc2, desc3, desc4
    };


    try {
      const resp = await fetch(`${baseUrl}/subscribe/postSubscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });

      if (!resp.ok) {
        throw new Error('Network response was not ok');
      }

      return await resp.json();
    } catch (error) {
      console.error('There was an error!', error);
      throw error;
    }
  };

  const getSubscription = async () => {
    const resp = await fetch(`${baseUrl}/subscribe/getsubscribe`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'token': localStorage.getItem('b2b_token')
      }
    });
    const data = await resp.json();
    return data;
  };

  const updateSubscription = async ({ id, subscription_type, subsciption_price, desc1, desc2, desc3, desc4 }) => {

    const token = localStorage.getItem('b2b_token');

    const data = {
      subscription_type, subsciption_price, desc1, desc2, desc3, desc4
    };


    try {
      const resp = await fetch(`${baseUrl}/subscribe/updateSubscribe/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });

      if (!resp.ok) {
        throw new Error('Network response was not ok');
      }

      return await resp.json();
    } catch (error) {
      console.error('There was an error!', error);
      throw error;
    }

  }

  const deleteSubscription = async (id) => {
    const resp = await fetch(`${baseUrl}/subscribe/deleteSubscribe/${id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'token': localStorage.getItem('dolibo_token')
      }
    });
    const data = await resp.json();
    return data;
  };
  return (
    <MainContext.Provider value={{ login, register, user, setUser, StudentLogin, student, setStudent, sendOtp, submitOtp, changePassword, resetPassword, getUsers, getProjects1, postSubscription, getSubscription, updateSubscription, deleteSubscription }}>
      {props.children}
    </MainContext.Provider>
  );
};

export default MainState;
