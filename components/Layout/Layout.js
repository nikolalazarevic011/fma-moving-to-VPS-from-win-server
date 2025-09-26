import React from "react";
import { MainMenu } from "components/MainMenu";
import FooterMenu from "components/FooterMenu/FooterMenu";

export const Layout = ({ children, mainMenuItems, footerMenuItems }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <MainMenu items={mainMenuItems} /> {/* Main menu at the top */}
      <main className="flex-grow">{children}</main> {/* Page content */}
      <FooterMenu socialLinks={footerMenuItems} /> {/* Footer at the bottom */}
    </div>
  );
};

export default Layout;
