import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { auth, db } from "../firebase-config";
import "../styles/Chat.css"; 

export const Chat = ({ room, setRoom }) => {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const messagesRef = collection(db, "messages");

  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where("room", "==", room),
      orderBy("createdAt")
    );
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      const loadedMessages = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMessages(loadedMessages);
    });

    return () => unsubscribe();
  }, [room]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = newMessage.trim();
    if (!trimmed) return;

await addDoc(messagesRef, {
  text: trimmed,
  createdAt: serverTimestamp(),
  room,
  user: {
    displayName: auth.currentUser.displayName,
    photoURL: auth.currentUser.photoURL,
  },
});


    setNewMessage("");
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>
          Welcome to : <strong>{room}</strong>
        </h2>
        <button className="exit-button" onClick={() => setRoom(null)}>
          Exit Room
        </button>
      </div>

      <div className="chat-body">
        <div className="messages">
            <p className="top-text">This is the beginning of this chat.</p>
<ul className="messages-list">
  {messages
    ?.sort((a, b) =>
      a?.createdAt?.seconds <= b?.createdAt?.seconds ? -1 : 1
    )
    ?.map((message) => {
      const time = message.createdAt
        ? new Date(message.createdAt.seconds * 1000).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })
        : "";

      return (
        <li className="message" key={message.id}>
          {message.user?.photoURL && (
            <img src={message.user.photoURL} alt="avatar" className="avatar" />
          )}
          <div className="message-content">
            <div className="message-header">
              <span className="user">{message.user?.displayName}</span>
              <span className="time">{time}</span>
            </div>
            <div className="text">{message.text}</div>
          </div>
        </li>
      );
    })}
</ul>

        </div>

        <form onSubmit={handleSubmit} className="new-message-form">
          <input
            type="text"
            className="new-message-input"
            placeholder="Type your message here..."
            onChange={(e) => setNewMessage(e.target.value)}
            value={newMessage}
          />
          <button
            type="submit"
            className="send-button"
            disabled={!newMessage.trim()}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};
