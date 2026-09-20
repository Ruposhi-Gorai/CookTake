"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = ["Home", "Ready to cook items", "About", "Contact"];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("Home");

  return (
    <header className="fixed top-4 left-1/2 z-50 w-[95%] max-w-7xl -translate-x-1/2">
      <nav className="rounded-2xl border border-[#e9dfd0] bg-[#fffdf8]/95 px-6 shadow-[0_8px_30px_rgb(0,77,28,0.14)] backdrop-blur-xl">
        <div className="relative flex h-24 items-center">

          {/* Logo */}
          <Link href="/" className="text-2xl font-black tracking-tight">
            <Image
              src="/assets/brandicon.png"
              alt="CookReady"
              width={1672}
              height={941}
              sizes="(max-width: 768px) 114px, 142px"
              className="h-16 w-auto object-contain md:h-20"
            />
          </Link>

          {/* Center Nav */}
          <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-3 lg:flex">
            <div className="flex items-center rounded-full bg-[#004d1c]/10 p-1">
              {links.map((item) => (
                <button
                  key={item}
                  onClick={() => setActive(item)}
                  className={`relative rounded-full px-5 py-2 text-sm font-medium transition-all ${
                    active === item
                      ? "bg-[#004d1c] text-white shadow"
                      : "text-[#004d1c]/75 hover:text-[#004d1c]"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
            <button className="rounded-full bg-[#ff5a00] px-5 py-2 text-sm font-semibold text-white transition hover:scale-105 hover:bg-[#e95000]">
              Login
            </button>
          </div>

          {/* Mobile menu control */}
          <div className="ml-auto flex items-center">

            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden"
            >
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="border-t border-[#e9dfd0] py-4 lg:hidden">
            {links.map((item) => (
              <Link
                key={item}
                href="/"
                className="block rounded-lg px-3 py-3 text-[#004d1c]/80 hover:bg-[#004d1c]/10 hover:text-[#004d1c]"
              >
                {item}
              </Link>
            ))}

            <button className="mt-3 w-full rounded-xl bg-[#ff5a00] py-3 text-white hover:bg-[#e95000]">
              Login
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}
