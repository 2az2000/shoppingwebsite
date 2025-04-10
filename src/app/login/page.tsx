"use client";
import React, { useState } from "react";
import Container from "../../components/Container";
import axios from "axios";
import Cookie from "js-cookie";
import { redirect } from "next/navigation";

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // const data = axios({
    //   url: "http://localhost:4000/login",
    //   method: "POST",
    //   data: {
    //     name: name,
    //     password: password,
    //   },
    // });
    const response = {
      token: "ojvmvknmsoivneosvdsfvklnvnekorenvoedvn",
      expiresIn: "1h",
    };
    Cookie.set("token", response.token, {
      expires: new Date(response.expiresIn),
    });
    redirect("/dashboard");
  };
  return (
    <Container className="flex justify-center items-center h-screen">
      <form className="flex flex-col gap-4 w-1/2 mx-auto">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <input
          type="text"
          placeholder="Email"
          className="border-2 border-gray-300 rounded-md p-2 "
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border-2 border-gray-300 rounded-md p-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md"
          onClick={handleLogin}
        >
          Login
        </button>
      </form>
    </Container>
  );
}
