"use client";

import React, { useContext, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import UserContext from "@/context/UserContext";
import Link from "next/link";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Signin from "./Signin";
import Logout from "./Logout";

const Header = () => {
  const { setTheme } = useTheme();
  const { user, setUser } = useContext(UserContext);
  const [openDialogue, setOpenDialogue] = useState(false);
  const [openoutDialogue, setOpenoutDialogue] = useState(false);

  const handleClick = () => {
    if (!user?.name) {
      setOpenDialogue(true);
    } else {
      setOpenDialogue(false);
    }
  };

  const handleLogout = () => {
    if (user) {
      setOpenoutDialogue(true);
    } else {
      setOpenoutDialogue(false);
    }
  };

  return (

    <header className="w-full bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 dark:from-blue-950 dark:via-purple-950 dark:to-indigo-950 text-white shadow-lg backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-white hover:text-purple-300 transition-colors">
          CodeCanvas AI
        </Link>

        {/* Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/Home" className="hover:text-purple-300 transition-colors">
            Home
          </Link>
          <Link href="/About" className="hover:text-purple-300 transition-colors">
            About
          </Link>
          <Link href="/Contact" className="hover:text-purple-300 transition-colors">
            Contact
          </Link>
          <Link href="/Feedback" className="hover:text-purple-300 transition-colors">
            Feedback
          </Link>
          <Link href="/pricing" className="hover:text-purple-300 transition-colors">
            Pricing
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="bg-indigo-600 text-white border-transparent hover:bg-indigo-700 transition-colors dark:text-white dark:border-white/20 dark:hover:bg-white/10"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px] bg-gray-900/90 backdrop-blur-md">
              <nav className="flex flex-col gap-4 mt-4">
                <Link href="/Home" className="text-white hover:text-purple-300 transition-colors">
                  Home
                </Link>
                <Link href="/About" className="text-white hover:text-purple-300 transition-colors">
                  About
                </Link>
                <Link href="/Contact" className="text-white hover:text-purple-300 transition-colors">
                  Contact
                </Link>
                <Link href="/Feedback" className="text-white hover:text-purple-300 transition-colors">
                  Feedback
                </Link>
                <Link href="/pricing" className="text-white hover:text-purple-300 transition-colors">
                  Pricing
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* Action Buttons and Theme Toggle */}
        <div className="flex items-center gap-2">
          <Link href="/Dashboard">
            <Button className="bg-white text-indigo-900 hover:bg-gray-200 transition-colors">
              New Project
            </Button>
          </Link>
          {user ? (
            <Button
              variant="outline"
              onClick={handleLogout}
              // For light mode: use a solid indigo button; dark mode remains as before.
              className="bg-indigo-600 text-white border-transparent hover:bg-indigo-700 hover:text-white transition-colors dark:text-white dark:border-white/20 dark:hover:bg-white/10"
            >
              Logout
            </Button>
          ) : (
            <Button
              variant="outline"
              onClick={handleClick}
              className="bg-indigo-600 text-white border-transparent hover:bg-indigo-700 transition-colors dark:text-white dark:border-white/20 dark:hover:bg-white/10"
            >
              Sign In
            </Button>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                // For light mode: indigo background, dark mode: original styling.
                className="bg-indigo-600 text-white border-transparent hover:bg-indigo-700 transition-colors dark:text-white dark:border-white/20 dark:hover:bg-white/10"
              >
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700">
              <DropdownMenuItem
                onClick={() => setTheme("light")}
                className="text-white hover:bg-gray-700 focus:bg-gray-700"
              >
                Light
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setTheme("dark")}
                className="text-white hover:bg-gray-700 focus:bg-gray-700"
              >
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setTheme("system")}
                className="text-white hover:bg-gray-700 focus:bg-gray-700"
              >
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Signin openDialogue={openDialogue} closeDialogue={() => setOpenDialogue(false)} />
      <Logout openoutDialogue={openoutDialogue} closeDialogue={() => setOpenoutDialogue(false)} />
    </header>

  );
};

export default Header;