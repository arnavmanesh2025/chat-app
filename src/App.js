import React, { useState, useRef } from "react";
import "./App.css";
import { Auth } from "./components/Auth";
import { Chat } from "./components/Chat";
import Cookies from "universal-cookie";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";

const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null);
  const roomInputRef = useRef(null);

  const signUserOut = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
    setRoom(null);
  };

  if (!isAuth) {
    return (
      <div className="App">
        <Auth setIsAuth={setIsAuth} />
      </div>
    );
  }

return (
  <div className="App">
    {!room ? (
      <>
        <div className="room">
          <label>Enter Room name</label>
          <input ref={roomInputRef} placeholder="e.g. general" />
          <button onClick={() => setRoom(roomInputRef.current.value.trim())}>
            Enter Chat
          </button>
          
        <div className="sign-out">
          <button onClick={signUserOut}>Sign Out</button>
        </div>
        </div>
      </>
    ) : (
      <Chat room={room} setRoom={setRoom} signUserOut={signUserOut} />
    )}
  </div>
);

}

export default App;
