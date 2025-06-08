import React, { useContext, useEffect, useState, useRef } from "react";
import styles from "./StudentChat.module.css";
import axios from "axios";
import * as signalR from "@microsoft/signalr";
import { authContext } from "../../../Context/AuthContextProvider";
import { baseUrl } from "../../../Env/Env";

export default function StudentChat() {
  const [chatGroups, setChatGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [selectedCourseId, setSelectedCourseId] = useState(null); // Selected course for chat
  const [messages, setMessages] = useState([]); // Chat messages
  const [input, setInput] = useState(""); // Input message
  const { accessToken, decodedToken } = useContext(authContext);
  const id = decodedToken?.userId;
  const userName = decodedToken?.email; // Assuming email as userName
  const hubConnection = useRef(null);
  const typingTimeoutRef = useRef(null);

  console.log("Decoded Token:", decodedToken);
  console.log("User ID:", id);
  console.log("Access Token:", accessToken);

  // Fetch chat groups based on user ID
  const fetchChatGroups = async () => {
    if (!id) {
      console.error("No userId found in decodedToken or decodedToken is null");
      alert("User ID is missing. Please log in again.");
      setIsLoading(false);
      return;
    }
    try {
      const response = await axios.get(`${baseUrl}/Chat/groups/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const data = response.data;
      setChatGroups(data);
      if (data.length > 0) setSelectedCourseId(data[0].courseId); // Set first courseId as default
    } catch (error) {
      console.error("Error fetching chat groups:", error.message);
      const errorMessage = error.response?.data?.message || error.message;
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch initial messages for the selected course
  const fetchMessages = async (courseId) => {
    try {
      const response = await fetch(`${baseUrl}chat/${courseId}/messages`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  // Setup SignalR connection
  useEffect(() => {
    if (!selectedCourseId || !userName) return;

    const connection = new signalR.HubConnectionBuilder()
      .withUrl(`${baseUrl}chatHub`, {
        accessTokenFactory: () => accessToken,
      })
      .withAutomaticReconnect()
      .build();

    hubConnection.current = connection;

    connection
      .start()
      .then(() => console.log("Connected to chat hub"))
      .catch(console.error);

    connection.on("ReceiveMessage", (newMessage) => {
      if (newMessage.courseId === selectedCourseId) {
        setMessages((prev) => [...prev, newMessage]);
      }
    });

    connection.on("UserTyping", (typingUser) => {
      if (typingUser === userName) return;
      setTypingUsers((prev) => new Set(prev).add(typingUser));
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = setTimeout(() => {
        setTypingUsers((prev) => {
          const updated = new Set(prev);
          updated.delete(typingUser);
          return updated;
        });
      }, 3000);
    });

    fetchMessages(selectedCourseId);

    return () => {
      connection.stop();
      setTypingUsers(new Set());
    };
  }, [selectedCourseId, accessToken, userName]);

  // Send message
  const sendMessage = async () => {
    if (!input.trim() || !hubConnection.current) return;
    try {
      await hubConnection.current.invoke(
        "SendMessageToGroup",
        selectedCourseId,
        input
      );
      setInput("");
    } catch (err) {
      console.error("Send message failed", err);
    }
  };

  // Send typing notification
  const sendTypingNotification = () => {
    if (!hubConnection.current) return;
    hubConnection.current
      .invoke("SendTypingNotification", selectedCourseId, userName)
      .catch(console.error);
  };

  // Handle input change with typing notification
  const handleInputChange = (e) => {
    setInput(e.target.value);
    sendTypingNotification();
  };

  return (
    <div className={styles.content}>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className={styles.container}>
          {/* Sidebar */}
          <div className={styles.sidebar}>
            <div className={styles.sidebarHeader}>
              <h2 className={styles.headerTitle}>Chats</h2>
              <input
                type="text"
                placeholder="Search..."
                className={styles.searchInput}
              />
            </div>
            <div className={styles.chatList}>
              {chatGroups.map((group, index) => (
                <div
                  key={index}
                  className={styles.chatItem}
                  onClick={() => setSelectedCourseId(group.courseId)}
                >
                  <div className={styles.chatAvatar}>
                    <img src={null} alt="" className={styles.chatAvatarImage} />
                  </div>
                  <div className={styles.chatDetails}>
                    <div className={styles.chatNameTime}>
                      <p className={styles.chatName}>
                        {group.name || "Unknown"}
                      </p>
                      <span className={styles.chatTime}>
                        {group.lastMessageTime || "N/A"}
                      </span>
                    </div>
                    <p className={styles.chatPreview}>
                      {group.lastMessage || "No messages yet..."}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className={styles.chatArea}>
            <div className={styles.chatHeader}>
              <div className={styles.chatHeaderContent}>
                <div className={styles.chatAvatar}>
                  <img src={null} alt="" className={styles.chatAvatarImage} />
                </div>
                <div className={styles.chatHeaderDetails}>
                  <h2 className={styles.headerTitle}>
                    {chatGroups.find((g) => g.courseId === selectedCourseId)
                      ?.name || "Software Engineering"}
                  </h2>
                  <p className={styles.chatPreview}>
                    {typingUsers.size > 0
                      ? `${Array.from(typingUsers).join(", ")} typing...`
                      : "Mahmoud Ismail typing..."}
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.messageArea}>
              {messages.map((msg) => (
                <div
                  key={`${msg.SendAt}-${msg.SenderId}`}
                  className={styles.messageReceived}
                >
                  <p>
                    <span className={styles.name}>{msg.SenderName}</span> <br />
                    {msg.Message}
                  </p>
                  <span className={styles.messageTime}>
                    {new Date(msg.SendAt).toLocaleTimeString()}
                  </span>
                </div>
              ))}
            </div>
            <div className={styles.inputArea}>
              <div className={styles.inputContainer}>
                <input
                  type="text"
                  value={input}
                  onChange={handleInputChange}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Type a message..."
                  className={styles.messageInput}
                />
                <button className={styles.sendButton} onClick={sendMessage}>
                  <i className="fa-solid fa-paper-plane"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
