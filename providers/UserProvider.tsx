"use client";

interface UserProviderProps {
  children: React.ReactNode;
}

import { MyUserContextProvider } from "@/hooks/useUser";
import React from "react";

const UserProvider = ({ children }: UserProviderProps) => {
  return <MyUserContextProvider>{children}</MyUserContextProvider>;
};

export default UserProvider;
