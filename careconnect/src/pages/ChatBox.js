import "./ChatBox.css";
import React, { useRef, useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/analytics";
import { updateDoc, serverTimestamp, Timestamp } from "firebase/firestore";
import { useAuth } from "../AuthContext";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyCIRalKnTYNoWAgwkQ6n-w4CmLORYmhWBo",
  authDomain: "chatbox-fe36a.firebaseapp.com",
  projectId: "chatbox-fe36a",
  storageBucket: "chatbox-fe36a.appspot.com",
  messagingSenderId: "249794876908",
  appId: "1:249794876908:web:66888abecbaa140e3e5cc9",
  measurementId: "G-M0MNJMD9PD",
});

const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();

function ChatBox() {
  const [user] = useAuthState(auth);
  const { token, login, logout } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // Handle sending messages and updating state
  const handleSendMessage = () => {
    const message = {
      text: newMessage,
      sender: "User1",
      timestamp: new Date(),
    };
    setMessages([...messages, message]);
    setNewMessage("");
  };

  return (
    <div className="chat-box">
      <header>
        <h1>⚛️🔥💬</h1>
        <SignOut />
      </header>

      <section>{user ? <ChatRoom /> : <SignIn />}</section>
    </div>
  );

  //   return (
  //     <div className="chat-box">
  //       <div className="message-list">{/* Messages go here */}</div>
  //       <div className="message-input">
  //         <input type="text" placeholder="Type your message..." />
  //         <button>Send</button>
  //       </div>
  //     </div>
  //   );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <>
      <button className="sign-in" onClick={signInWithGoogle}>
        Sign in with Google
      </button>
      <p class="para">
        Do not violate the community guidelines or you will be banned for life!
      </p>
    </>
  );
}

function SignOut() {
  return (
    auth.currentUser && (
      <button className="sign-out" onClick={() => auth.signOut()}>
        Exit
      </button>
    )
  );
}

function ChatRoom() {
  const dummy = useRef();
  const messagesRef = firestore.collection("messages");
  const query = messagesRef.orderBy("createdAt").limit(25);

  const [messages] = useCollectionData(query, { idField: "id" });

  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await messagesRef
      .add({
        text: formValue,
        createdAt: serverTimestamp(),
        uid,
        photoURL,
      })
      .then((docRef) => {
        //alert("Data Successfully Submitted", docRef);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });

    setFormValue("");
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <main>
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}

        <span ref={dummy}></span>
      </main>

      <form className="form-chat-box" onSubmit={sendMessage}>
        <input class = "input"
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="say something nice"
        />

        <button type="submit" disabled={!formValue}>
          🕊️
        </button>
      </form>
    </>
  );
}

function ChatMessage(props) {
  const { token, login, logout } = useAuth();

  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

  return (
    <>
      <div className={`message ${messageClass}`}>
        <img
          src={
            photoURL || "https://api.adorable.io/avatars/23/abott@adorable.png"
          }
        />
        <p class="para">{text}</p>
      </div>
    </>
  );
}

export default ChatBox;
