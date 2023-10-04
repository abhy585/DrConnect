import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import './ChatBox.css'

export default function ChatBox({ socket, username, room }) {

    
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                time:
                    new Date(Date.now()).getHours() +
                    ":" +
                    new Date(Date.now()).getMinutes(),
            };

            await socket.emit("send_message", messageData);
            setMessageList((list) => [...list, messageData]);
            setCurrentMessage("");
        }
    };

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessageList((list) => [...list, data]);
        });
    }, [socket]);

    return (
        <div class="container">
            <div class="msg-header">
                <div class="container1">
                    <img src="user1.png" class="msgimg" />
                    <div class="active">
                        <p>User name</p>
                    </div>
                </div>
            </div>
            <div class="chat-page">
                <ScrollToBottom className="message-container">
                    {messageList.map
                        (
                            (messageContent) => {
                                return (
                                <div class="msg-inbox">
                                    <div class="chats">
                                        <div class="msg-page">
                                            <div class="received-chats">
                                                <div class="received-chats-img">
                                                    <img src="user2.png" />
                                                </div>
                                                <div class="received-msg">
                                                    <div class="received-msg-inbox">
                                                        <p>{messageContent.message}</p>
                                                        <span class="time">{messageContent.time}</span>
                                                        <span class="time">{messageContent.author}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="outgoing-chats">
                                                <div class="outgoing-chats-img"><img src="user1.png" /></div>
                                                <div class="outgoing-msg">
                                                    <div class="outgoing-chats-msg">
                                                        <p class="multi-msg">
                                                        </p>
                                                        <p class="multi-msg">
                                                        </p>
                                                        <span class="time">18:30 PM | July 24</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                )
                            }
                        )
                    }
                </ScrollToBottom>
            </div>
            <div class="msg-bottom">
                <div class="input-group">
                    <input
                        type="text"
                        value={currentMessage}
                        class="form-control"
                        placeholder="Write message..."
                        onChange={(event) => {
                            setCurrentMessage(event.target.value);
                        }}
                        onKeyPress={(event) => {
                            event.key === "Enter" && sendMessage();
                        }}
                    />
                    <button onClick={sendMessage}>&#9658;</button>
                </div>
            </div>
        </div>
    )
}