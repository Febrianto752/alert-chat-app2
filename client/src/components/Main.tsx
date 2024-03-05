"use client"
import { useEffect, useState } from "react";
// import { io } from "socket.io-client";
// const socket = io('ws://localhost:3000')
import socket from "@/socket";
import JoinButton from "./JoinButton";
import SendButton from "./SendButton";

export default function MainComponent() {
    const [rooms, setRooms] = useState<string[]>([]);
    const [message1, setMessage1] = useState<string>("")
    const [message2, setMessage2] = useState<string>("")
    const [messagesRoom1, setMessagesRoom1] = useState<string[]>([])
    const [messagesRoom2, setMessagesRoom2] = useState<string[]>([])

    useEffect(() => {
        initialSocket();
    }, [socket])

    const initialSocket = async () => {
        if (!socket) return;

        // client-side
        // socket.on("receiveJoinRoom", (data: string) => {
        //     // console.log("receive join room")
        //     console.log(data); // x8WIv7-mJelg7on_ALbx
        // });

        // socket.on("disconnect", () => {
        //     console.log(socket.id); // undefined
        // });

        socket.on("receiveMessage", (data: { room: string, message: string }) => {
            const sound = new Audio('/alert.wav');
            sound.play();

            if (data.room == "room1") {
                setMessagesRoom1(prev => [...prev, data.message])
            } else {
                setMessagesRoom2(prev => [...prev, data.message])
            }
        });
    }

    const joinRoom1 = () => {
        socket.emit("joinRoom", "room1")

        setRooms(prev => [...prev, "room1"]);
    }

    const joinRoom2 = () => {
        socket.emit("joinRoom", "room2")

        setRooms(prev => [...prev, "room2"]);
    }

    const handleSendMessageRoom1 = () => {
        socket.emit("sendMessage", "room1", message1)
        setMessage1("")
    }

    const handleSendMessageRoom2 = () => {
        socket.emit("sendMessage", "room2", message2)
        setMessage2("")
    }

    return (
        <main className="px-3 min-h-screen">
            <h1 className="text-center font-bold">Alert Chat App</h1>

            <h2 className="font-bold mb-3">Room 1</h2>

            {!rooms.find(room => room == "room1") && <JoinButton joinRoom={joinRoom1} />}
            {rooms.find(room => room == "room1") &&
                <div>
                    <div className="mb-5">
                        <label htmlFor="messageRoom1" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Message</label>
                        <input value={message1} type="text" id="messageRoom1" className="w-1/2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Message..." onChange={(e) => {
                            setMessage1(e.target.value)
                        }} />
                    </div>
                    <SendButton handleSendMessage={handleSendMessageRoom1} />

                    {messagesRoom1.map((message, index) => {
                        return (
                            <div key={index} className="my-3 px-6 py-2 rounded-md w-fit bg-white shadow-md">
                                <p >{message}</p>

                            </div>
                        )
                    })}
                </div>}


            <hr />
            <h2 className="mt-12 font-bold mb-3">Room 2</h2>
            {/* {!rooms.find(room => room == "room2") && <button className="bg-blue-500 px-8 py-2 rounded-md" onClick={joinRoom2}>Join</button>} */}

            {!rooms.find(room => room == "room2") && <JoinButton joinRoom={joinRoom2} />}
            {rooms.find(room => room == "room2") &&
                <div>
                    <div className="mb-5">
                        <label htmlFor="messageRoom2" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Message</label>
                        <input value={message2} type="text" id="messageRoom2" className="w-1/2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Message..." onChange={(e) => {
                            setMessage2(e.target.value)
                        }} />
                    </div>
                    <SendButton handleSendMessage={handleSendMessageRoom2} />

                    {messagesRoom2.map((message, index) => {
                        return (
                            <div key={index} className="my-3 px-6 py-2 rounded-md w-fit bg-white shadow-md">
                                <p >{message}</p>

                            </div>
                        )
                    })}
                </div>}


        </main>
    );
}