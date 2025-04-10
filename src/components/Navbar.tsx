"use client";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import React from "react";
import Container from "./Container";
import { useShoppingCardContext } from "../context/shoppingCardContext";
import Cookie from "js-cookie";
export default function Navbar() {
  const pathName = usePathname();
  // console.log(pathName);

  const { cardTotalQty } = useShoppingCardContext();

  const navLink = [
    {
      href: "/",
      title: "خانه ",
    },
    {
      href: "/store",
      title: "فروشگاه",
    },
    {
      href: "/dashboard",
      title: "پنل ادمین",
    },
    {
      href: "/login",
      title: "ورود",
    },
  ];

  return (
    <nav className="shadow p-4">
      <Container className="flex justify-between">
        <div>
          {Cookie.get("token")
            ? navLink.map((link) => (
                <Link
                  key={link.href}
                  className={`mr-4 ${
                    pathName === link.href ? "text-blue-500" : ""
                  }`}
                  href={link.href}
                >
                  {link.title}
                </Link>
              ))
            : navLink
                .filter((link) => link.href !== "/dashboard")
                .map((link) => (
                  <Link
                    key={link.href}
                    className={`mr-4 ${
                      pathName === link.href ? "text-blue-500" : ""
                    }`}
                    href={link.href}
                  >
                    {link.title}
                  </Link>
                ))}
        </div>
        <div>
          {Cookie.get("token") && (
            <button
              className="ml-4 bg-red-500 text-white px-1 py-1 rounded-md "
              onClick={() => {
                Cookie.remove("token");
                redirect("/");
              }}
            >
              خروج
            </button>
          )}
          <Link href="/card">سبد خرید</Link>
          <span className="mr-1 px-2 py-1 bg-red-500 text-white rounded-full">
            {cardTotalQty}
          </span>
        </div>
      </Container>
    </nav>
  );
}
