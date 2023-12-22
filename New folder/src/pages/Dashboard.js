import React, { useState, useEffect } from 'react';
import HomeFrame from '../components/HomeFrame';
import Review from './Review';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';

const Dashboard = () => {
  const storedUserEmail = sessionStorage.getItem('userEmail');
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data when the component mounts
    const fetchUserData = async () => {
      try {
        // Make a GET request to your user details endpoint
        const response = await axios.get(`http://localhost:8080/user/getUserData?email=${storedUserEmail}`);
        setUserData(response.data); // Assuming the response contains user data
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };

    if (storedUserEmail) {
      fetchUserData();
    }
  }, [storedUserEmail]);

  const handleNewRequestClick = () => {
    navigate('/new-request');
  };

  const handleMyRequestClick = () => {
    navigate('/my-request');
  };
  return (
    <div>
        <HomeFrame/>
        <div className='mt-16 ml-64'>
            <div className='ml-11'>
            <header
  style={{  backgroundImage: "url('/11.png')",backgroundPosition: "left"}}
  className="h-52 bg-cover bg-center bg-no-repeat"
>
  <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 ">
    <div className="mt-4 sm:flex sm:items-center sm:justify-between flex items-center justify-center">
      <div className="text-center sm:text-left ">
        <h1 style={{ textShadow:  '1px 1px 2px rgba(0, 0, 0.5, 0.5)' }} className=" text-slate-50 text-2xl font-extrabold sm:text-5xl ">Welcome Back, {userData?.fname}!</h1>

        <p className="mt-1.5 text-lg font-medium text-gray-700 text-center">Start your day with seamless management of repair tasks! 🎉</p>
      </div>

      <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
        <button
          className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-gray-200 bg-white px-5 py-3 text-gray-500 transition hover:text-gray-700 focus:outline-none focus:ring"
          type="button"
          onClick={handleMyRequestClick}
        >
          <span className="text-sm font-medium"> My Requests </span>

        </button>

        <button
          className="block rounded-lg bg-red-500 px-5 py-3 text-sm font-medium text-white transition hover:bg-red-700 focus:outline-none focus:ring"
          type="button"
          onClick={handleNewRequestClick}
        >
          New Request
        </button>
      </div>
    </div>
  </div>
</header>           
                <Review/>
            </div>
        </div>
    </div>
  );
};

export default Dashboard;
