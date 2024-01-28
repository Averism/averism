const awsConfig = {
    Auth: {
      region: 'ap-southeast-1',
      userPoolId: 'ap-southeast-1_1w7XYu9hm',
      userPoolWebClientId: '73g7s1vkbgf7vgknimupgaghsn',
      oauth: {
        domain: 'averism.auth.ap-southeast-1.amazoncognito.com',
        scope: ['email', 'openid', 'aws.cognito.signin.user.admin', 'profile'],
        redirectSignIn: 'https://www.averism.com/', // Make sure these URLs are correct
        redirectSignOut: 'https://www.averism.com/logout/',
        responseType: 'token' // or 'code'
      }
    }
  };
  
  export default awsConfig;
  