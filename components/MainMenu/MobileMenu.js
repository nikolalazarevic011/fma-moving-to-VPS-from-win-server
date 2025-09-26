import React, { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  ChevronDownIcon,
  XMarkIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

export const MobileMenu = ({
  items,
  mobileMenuOpen,
  setMobileMenuOpen,
  isLoggedIn,
  handleLogout,
  router,
}) => {
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (isLoggedIn) {
      const userData = localStorage.getItem("user");
      if (userData) {
        setUser(JSON.parse(userData));
      }
    }
  }, [isLoggedIn]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleSubmenu = (id) => {
    setOpenSubmenu(openSubmenu === id ? null : id);
  };

  const normalizePath = (path) => {
    // Ensure path is a string and remove trailing slash for consistent comparison
    return path ? path.replace(/\/$/, "") : "";
  };

  const isActive = (path) => {
    //  Guard against null or undefined paths
    if (!path) return false;
    const currentPath = normalizePath(router.asPath);
    const targetPath = normalizePath(path);
    // console.log(`Comparing ${currentPath} to ${targetPath}`);
    return currentPath === targetPath;
  };

  const isAnySubMenuItemActive = (subMenuItems) => {
    return subMenuItems.some((subItem) => isActive(subItem.destination));
  };

  if (!items.length) return null; // Render nothing if items is empty

  return (
    <>
      {/* Hamburger menu */}
      <div className="-my-2 -mr-2 md:hidden">
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-secondary opacity-100"
          onClick={toggleMobileMenu}
        >
          <span className="sr-only">Open menu</span>
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>

      {/* Mobile menu panel */}
      <Transition show={mobileMenuOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40 md:hidden"
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-40 overflow-hidden">
            <Dialog.Panel className="absolute inset-0 h-full w-full max-w-xs bg-primary p-4 opacity-90">
              <div
                className="flex items-center justify-between text-secondary"
                onClick={toggleMobileMenu}
              >
                <Dialog.Title>Menu</Dialog.Title>
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-md p-2 text-background hover:bg-gray-100 hover:text-gray-500"
                  onClick={toggleMobileMenu}
                >
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  <span className="sr-only">Close menu</span>
                </button>
              </div>
              <div className="relative mt-6 flex-1">
                <nav className="flex flex-col space-y-2">
                  {items.map((item) => (
                    <Fragment key={item.id}>
                      {item.subMenuItems.length > 0 ? (
                        <div>
                          <button
                            className={`rounded-md p-2 text-base font-medium ${
                              isAnySubMenuItemActive(item.subMenuItems)
                                ? "text-menuHighlightBlue"
                                : "text-secondary"
                            } flex items-center justify-between`}
                            onClick={() => toggleSubmenu(item.id)}
                          >
                            {item.label}
                            <ChevronDownIcon
                              className={`h-5 w-5 transition-transform ${
                                openSubmenu === item.id ? "rotate-180" : ""
                              }`}
                            />
                          </button>
                          {openSubmenu === item.id && (
                            <div className="space-y-1 pl-6">
                              {item.subMenuItems.map((subItem) => (
                                <Link
                                  legacyBehavior
                                  key={subItem.id}
                                  href={subItem.destination || "#"}
                                  passHref
                                >
                                  <a
                                    className={`block rounded-md px-2 py-2 text-sm font-medium leading-5 ${
                                      isActive(subItem.destination)
                                        ? "text-menuHighlightBlue"
                                        : "text-secondary"
                                    }`}
                                    onClick={() => setMobileMenuOpen(false)}
                                  >
                                    {subItem.label}
                                  </a>
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <Link
                          legacyBehavior
                          href={item.destination || "#"}
                          passHref
                        >
                          <a
                            className={`rounded-md p-2 text-base font-medium ${
                              isActive(item.destination)
                                ? "text-menuHighlightBlue"
                                : "text-secondary"
                            }`}
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {item.label}
                          </a>
                        </Link>
                      )}
                    </Fragment>
                  ))}

                  {/* **User Profile Section** */}
                  <div className="mt-4 border-t border-gray-600 pt-4">
                    {isLoggedIn && user ? (
                      <div>
                        <button
                          className={`flex w-full items-center justify-between rounded-md p-2 text-base font-medium text-secondary`}
                          onClick={() => toggleSubmenu("user-profile")}
                        >
                          <div className="flex items-center">
                            <UserCircleIcon
                              className="mr-2 h-5 w-5"
                              aria-hidden="true"
                            />
                            Hi {user.display_name || user.user_login}
                          </div>
                          <ChevronDownIcon
                            className={`h-5 w-5 transition-transform ${
                              openSubmenu === "user-profile" ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        {openSubmenu === "user-profile" && (
                          <div className="space-y-1 pl-6">
                            <Link legacyBehavior href="/edit-profile" passHref>
                              <a
                                className="block rounded-md px-2 py-2 text-sm font-medium leading-5 text-secondary"
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                Edit Profile
                              </a>
                            </Link>
                            <a
                              className="block cursor-pointer rounded-md px-2 py-2 text-sm font-medium leading-5 text-secondary"
                              onClick={() => {
                                handleLogout();
                                setMobileMenuOpen(false);
                              }}
                            >
                              Logout
                            </a>
                          </div>
                        )}
                      </div>
                    ) : (
                      <>
                        <Link legacyBehavior href="/login/" passHref>
                          <a
                            className="block rounded-md p-2 text-base font-medium text-secondary"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            Login
                          </a>
                        </Link>
                        <Link legacyBehavior href="/register/" passHref>
                          <a
                            className="block rounded-md p-2 text-base font-medium text-secondary"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            Join Now
                          </a>
                        </Link>
                      </>
                    )}
                  </div>
                </nav>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
