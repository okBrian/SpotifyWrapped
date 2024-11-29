"use client"
import { Button, Input, Link } from "@nextui-org/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';
import {EyeFilledIcon} from "./EyeFilledIcon";
import {EyeSlashFilledIcon} from "./EyeSlashFilledIcon";

interface ErrorMessage {
  username: string,
  password: string,
}

export default function Login() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const [isVisibleConfirmPass, setIsVisibleConfirmPass] = useState(false);
  const toggleVisibilityConfirmPass = () => setIsVisibleConfirmPass(!isVisibleConfirmPass);

  const onSubmit = async () => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    setLoading(true);
    const res = await fetch("http://localhost:8000/register/", {
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
    if (res.status === 201) {
      localStorage.setItem("loggedIn", JSON.stringify(true));
      const { token } = await res.json();
      localStorage.setItem("token", token); // Save the token in local storage
      router.push("/");
    } else if (res.status === 400) {
      const data: ErrorMessage = await res.json();
      if (data.username) {
        if (data.username[0] === "This field may not be blank.") {
          toast.error("Username Field may not be blank!")
        } else {
          toast.error(data.username[0]);
        }
      } else if (data.password) {
        if (data.password[0] === "This field may not be blank.") {
          toast.error("Password Field may not be blank!")
        } else {
          toast.error(data.password[0]);
        }
      }
    }
  }

  return (
    <div className="flex w-full h-full justify-center items-center w-full grow min-h-0">
      <div className="w-96 drop-shadow-lg dark:bg-slate-600 p-6 flex flex-col gap-6 items-center rounded-xl">
        <p className="text-xl font-bold">
          Register
        </p>
        <Input
          label="Username"
          placeholder="Enter your username"
          isRequired
          value={username}
          onValueChange={setUsername}
          description="150 characters or fewer."
          classNames={{
            "label": "font-bold uppercase",
            "base": "drop-shadow-md",
            "description": "dark:text-slate-300 transition duration-250"
          }}
          radius="sm"
        />
        <Input
          label="Password"
          placeholder="Enter your password"
          isRequired
          value={password}
          onValueChange={setPassword}
          description="Your password must contain at least 8 characters."
          classNames={{
            "label": "font-bold uppercase",
            "base": "drop-shadow-md",
            "description": "dark:text-slate-300 transition duration-250"
          }}
          radius="sm"
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
        <Input
          label="Confirm Password"
          placeholder="Confirm your password"
          isRequired
          value={confirmPassword}
          onValueChange={setConfirmPassword}
          classNames={{
            "label": "font-bold uppercase",
            "base": "drop-shadow-md",
          }}
          radius="sm"
          endContent={
            <button className="focus:outline-none" type="button" onClick={toggleVisibilityConfirmPass} aria-label="toggle password visibility">
              {isVisibleConfirmPass ? (
                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          type={isVisibleConfirmPass ? "text" : "password"}
        />
        <div className="flex w-full h-full justify-end items-center gap-6">
          <Link
            href="/login"
            underline="hover"
          >
            <p className="italic hover:cursor-pointer">
              Log into an existing account
            </p>
          </Link>
          <Button
            color="primary"
            isLoading={loading}
            onPress={onSubmit}
          >
            Register
          </Button>
        </div>
      </div>
    </div>
  )
}
