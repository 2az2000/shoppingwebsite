import React, { Children } from "react";
import Navbar from "./Navbar";

interface ILayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: ILayoutProps) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}
