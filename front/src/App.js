import logo from "./logo.svg";
import "./App.css";
import SocialButton from "./SocialButton";

function App() {
  const handleSocialLogin = (user) => {
    console.log('user data', user);
  };

  const handleSocialLoginFailure = (err) => {
    console.error(err);
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
        <SocialButton
          provider="google"
          appId="YOUR_GOOGLE_APP_ID"
          onLoginSuccess={handleSocialLogin}
          onLoginFailure={handleSocialLoginFailure}
        >
          Login with Google
        </SocialButton>
      </header>
    </div>
  );
}

export default App;
