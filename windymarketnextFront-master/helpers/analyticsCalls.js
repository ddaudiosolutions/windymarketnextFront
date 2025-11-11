import ReactGA from 'react-ga4';

export const trackLoginButton = () => {
  ReactGA.event('login_button',{
    category: 'User',
    action: 'Click on Login button',
    label: 'Login_Button'
  });
};

export const trackSendMail = () => {
  ReactGA.event('sendMail_button',{
    category: 'User',
    action: 'Send mail between users',    
  });
};