import logo from './logo.svg';
import './App.css';

function App() {

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.hash.substring(1));
    const idToken = urlParams.get('id_token');
    const accessToken = urlParams.get('access_token');
    const refreshToken = urlParams.get('refresh_token');

    if (idToken) {
      localStorage.setItem('user', JSON.stringify({ idToken, accessToken, refreshToken }));
      // Redirect to home page or other page after successful login
    }
  }, []);

  const handleLogin = () => {
    window.location.href = 'https://averism.auth.ap-southeast-1.amazoncognito.com/login?response_type=token&client_id=73g7s1vkbgf7vgknimupgaghsn&redirect_uri=https://www.averism.com';
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <div>
        <button onClick={handleLogin}>Login with AWS Cognito</button>
        {/* Rest of your component */}
      </div>
    </div>
  );
}

export default App;
