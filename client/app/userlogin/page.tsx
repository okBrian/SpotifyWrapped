"use client"
import { Button, Input, Link } from "@nextui-org/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';
import { EyeSlashFilledIcon } from "../register/EyeSlashFilledIcon";
import { EyeFilledIcon } from "../register/EyeFilledIcon";


export default function Login() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const onSubmit = async () => {
    setLoading(true);
    const res = await fetch("http://localhost:8000/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    setLoading(false);
    if (res.status === 200) {
      localStorage.setItem("loggedIn", JSON.stringify(true));
      const { token } = await res.json();
      localStorage.setItem("token", token); // Save the token in local storage
      router.push("/");
    } else if (res.status === 401) {
      toast.error("Username or Password Incorrect")
    }
  }

  return (
    <div className="flex w-full h-full justify-center items-center">
      <div className="w-96 bg-white drop-shadow-lg dark:bg-slate-600 p-6 flex flex-col gap-6 items-center rounded-xl">
        <p className="text-xl font-bold">
          Login
        </p>
        <Input
          type="username"
          label="Username"
          placeholder="Enter your username"
          isRequired
          value={username}
          onValueChange={setUsername}
          classNames={{
            "label": "font-bold uppercase",
            "base": "drop-shadow-md",
          }}
        />
        <Input
          label="Password"
          placeholder="Enter your password"
          isRequired
          value={password}
          onValueChange={setPassword}
          classNames={{
            "label": "font-bold uppercase",
            "base": "drop-shadow-md",
          }}
          endContent={
            <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
              {isVisible ? (
                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          type={isVisible ? "text" : "password"}
        />
        <div className="flex w-full h-full justify-end items-center gap-6">
          <Link
            href="/register"
            underline="hover"
          >
            <p className="italic hover:cursor-pointer">
              Create an account
            </p>
          </Link>
          <Button
            color="primary"
            isLoading={loading}
            onPress={onSubmit}
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  )
}
