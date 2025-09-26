import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { MobileMenu } from "./MobileMenu";
import { DesktopMenu } from "./DesktopMenu";
import { LoginJoinButtons } from "./LoginJoinButtons";

export const MainMenu = ({ items = [] }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const handleLoginStatusChange = () => {
      const user = localStorage.getItem("user");
      setIsLoggedIn(!!user);
    };

    handleLoginStatusChange();

    window.addEventListener("login-status-change", handleLoginStatusChange);

    return () => {
      window.removeEventListener(
        "login-status-change",
        handleLoginStatusChange,
      );
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("membershipId");
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    window.dispatchEvent(new Event("login-status-change"));
    window.location.href = "/";
  };

  return (
    <header
      className="sticky top-0 z-50 shadow-sm"
      style={{
        backgroundImage: "url('/images/asset-3.jpeg')",
        backgroundSize: "cover",
      }}
    >
      <nav
        className="max-w-full px-4 mx-auto sm:px-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex items-center justify-between py-3 sm:py-5 md:justify-start md:space-x-5">
          {/* Desktop Menu */}
          <DesktopMenu
            items={items}
            isLoggedIn={isLoggedIn}
            handleLogout={handleLogout}
            router={router}
          />

          {/* Mobile Menu */}
          <MobileMenu
            items={items}
            isLoggedIn={isLoggedIn}
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
            handleLogout={handleLogout}
            router={router}
          />

            {/* Login/Join Now Buttons */}
            <LoginJoinButtons isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
        </div>
      </nav>
    </header>
  );
};
