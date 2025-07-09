import { auth, provider } from "../firebase-config";
import { signInWithPopup } from "firebase/auth";
import Cookies from "universal-cookie";
import "../styles/Auth.css";

const cookies = new Cookies();

export const Auth = ({ setIsAuth }) => {
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookies.set("auth-token", result.user.refreshToken);
      setIsAuth(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="auth-container">
      <div className="login-card">
<img src="/logo512.png" alt="QuickChat Logo" className="login-logo" />
        <h1>Quick Chat</h1>
        <p>The easiest way to chat with people all around the world.</p>
        <button onClick={signInWithGoogle} className="google-btn" >
          <img
            src="https://img.icons8.com/color/16/000000/google-logo.png"
            alt="G"
          />
          Sign in with Google
        </button>
      </div>
    </div>
  );
};
