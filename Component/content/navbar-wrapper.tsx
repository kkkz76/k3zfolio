"use client";
import { useNavbar } from "../context/navbar-controller";
import Navbar from "./navbar";

export default function NavbarWrapper() {
  const { showNavbar, isDarkText } = useNavbar();

  return <Navbar showNavbar={showNavbar} isDarkText={isDarkText} />;
}
