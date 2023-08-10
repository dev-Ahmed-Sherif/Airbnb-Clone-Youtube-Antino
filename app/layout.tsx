import "./globals.css";

import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import Navbar from "./components/header/Navbar";
import ClientOnly from "./components/ClientOnly";
import RegisterModal from "./components/modals/RegisterModal";
import LoginModal from "./components/modals/LoginModal";
import RentModal from "./components/modals/RentModal";

import ToasterProvider from "./providers/ToasterProvider";
import ThemeProviders from "./providers/ThemeProvider";

import getCurrentUser from "./actions/getCurrentUser";
import ThemeSwitcher from "./components/ThemeSwitcher";

const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Airbnb",
  description: "Airbnb Clone",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  // console.log("currentUser",currentUser);

  return (
    <html lang="en">
      <body className={font.className}>
        {/* Enable Dark and Light Modes */}
        <ThemeProviders>
          <ThemeSwitcher />
            <ToasterProvider />
            <RegisterModal />
            <LoginModal />
            <RentModal />
            <Navbar currentUser={currentUser} />
          <ClientOnly>
          </ClientOnly>
        {children}
        </ThemeProviders>
      </body>
    </html>
  );
}
