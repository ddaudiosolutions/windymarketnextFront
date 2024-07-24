import { useEffect } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { Button } from 'react-bootstrap';
// eslint-disable-next-line max-len
/* import web from '../../client_secret_65165896958-keasbil4r5ui0mlvafu64svvcm4sb6cv.apps.googleusercontent.com.json'; */

const GoogleAnalyticsApp = () => {
  const propertyId = '338632609';
  const startDate = '2024-03-10';
  const endDate = '2024-03-18';
  const googleLogin = useGoogleLogin({
    clientId: process.env.NEXT_NEXT_PUBLIC_APP_GOOGLE_CLIENT_ID,
    responseType: 'token',
    onSuccess: async (tokenResponse) => {
      const accessToken = tokenResponse?.access_token;
      if (accessToken) {
        fetchData(accessToken);
      }
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const fetchData = async (accessToken) => {
    try {
      const requestBody = {
        dateRanges: [{ startDate, endDate }],
      };

      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      };

      const apiResponse = await axios.post(
        `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}`,
        requestBody,
        { headers },
      );

      const responseData = apiResponse.data;
      console.log('responseData', responseData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (googleLogin.tokenResponse?.access_token) {
      fetchData(googleLogin.tokenResponse.access_token);
    }
  }, [googleLogin.tokenResponse]);

  return (
    <div className='App'>
      <h1>Google Analytics Report</h1>
      <Button onClick={googleLogin}>Check Analytics</Button>
    </div>
  );
};

export default GoogleAnalyticsApp;
