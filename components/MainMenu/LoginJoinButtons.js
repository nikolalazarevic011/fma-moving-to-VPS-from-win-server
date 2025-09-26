import Link from "next/link";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { Fragment, useEffect, useState } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const LoginJoinButtons = ({ isLoggedIn, handleLogout }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (isLoggedIn) {
      const userData = localStorage.getItem("user");
      if (userData) {
        setUser(JSON.parse(userData));
      }
    }
  }, [isLoggedIn]);

  return (
    <div className="z-20 items-center justify-end md:flex md:flex-1 lg:w-0">
      {isLoggedIn && user ? (
        <Popover className="relative">
          {({ open, close }) => (
            <>
              <Popover.Button
                className={classNames(
                  open ? "text-menuHighlightBlue" : "text-secondary",
                  "group inline-flex items-center rounded-md text-base font-medium hover:text-menuHighlightBlue focus:outline-none",
                )}
              >
                <UserCircleIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                Hi {user.display_name || user.user_login}
                <ChevronDownIcon
                  className={classNames(
                    open ? "text-menuHighlightBlue" : "text-secondary",
                    "ml-2 h-5 w-5 group-hover:text-menuHighlightBlue",
                  )}
                  aria-hidden="true"
                />
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute right-0 z-50 mt-3 w-56 transform">
                  <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="relative bg-white">
                      <Link legacyBehavior href="/edit-profile" passHref>
                        <a
                          className="flex items-center p-4 text-base font-medium text-primary hover:bg-gray-50 hover:text-menuHighlightBlue"
                          onClick={() => close()}
                        >
                          Edit Profile
                        </a>
                      </Link>
                      <a
                        className="flex cursor-pointer items-center p-4 text-base font-medium text-primary hover:bg-gray-50 hover:text-menuHighlightBlue"
                        onClick={() => {
                          handleLogout();
                          close();
                        }}
                      >
                        Logout
                      </a>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      ) : (
        <>
          <Link legacyBehavior href="/login/" passHref>
            <a className="whitespace-nowrap text-base font-medium text-secondary hover:text-menuHighlightBlue">
              Login
            </a>
          </Link>
          <Link legacyBehavior href="/register/" passHref>
            <a className="ml-3 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent px-4 py-2 text-base font-medium text-secondary shadow-sm hover:text-menuHighlightBlue">
              Join Now
            </a>
          </Link>
        </>
      )}
    </div>
  );
};
