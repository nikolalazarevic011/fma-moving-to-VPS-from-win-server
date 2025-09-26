import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Fragment } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const DesktopMenu = ({ items, isLoggedIn, handleLogout, router }) => {
  
  const isActive = (path) => {
    if (!path) return false;
    const currentPath = router.asPath.replace(/\/$/, "");
    const targetPath = path.replace(/\/$/, "");
    return currentPath === targetPath;
  };

  return (
    <Popover.Group as="nav" className="z-20 hidden space-x-5 md:flex">
      {items.map((item) =>
        item.subMenuItems.length > 0 ? (
          <Popover key={item.id} className="relative">
            {({ open, close }) => (
              <>
                <Popover.Button
                  className={classNames(
                    open || isActive(item.destination)
                      ? "text-menuHighlightBlue"
                      : "text-secondary",
                    "group inline-flex items-center rounded-md text-base font-medium hover:text-menuHighlightBlue focus:outline-none"
                  )}
                  onClick={() => close()}
                >
                  {item.label}
                  <ChevronDownIcon
                    className={classNames(
                      open || isActive(item.destination)
                        ? "text-menuHighlightBlue"
                        : "text-secondary",
                      "ml-2 h-5 w-5 group-hover:text-menuHighlightBlue"
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
                  <Popover.Panel className="absolute z-50 w-screen max-w-md px-2 mt-3 -ml-4 transform sm:px-0 lg:left-1/2 lg:-translate-x-1/2">
                    <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                      <div className="relative grid gap-6 px-5 py-6 bg-white sm:gap-8 sm:p-8">
                        {item.subMenuItems.map((subItem) => (
                          <Link
                            legacyBehavior
                            key={subItem.id}
                            href={subItem.destination}
                            passHref
                          >
                            <a
                              className={`-m-3 flex items-start rounded-lg p-3 hover:text-menuHighlightBlue ${
                                isActive(subItem.destination)
                                  ? "text-menuHighlightBlue"
                                  : "text-primary"
                              }`}
                              onClick={() => close()}
                            >
                              <p className="text-base font-medium">
                                {subItem.label}
                              </p>
                            </a>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </Popover.Panel>
                </Transition>
              </>
            )}
          </Popover>
        ) : (
          <Link
            legacyBehavior
            key={item.id}
            href={item.destination}
            passHref
          >
            <a
              className={`text-base font-medium hover:text-menuHighlightBlue ${
                isActive(item.destination) ? "text-menuHighlightBlue" : "text-secondary"
              }`}
            >
              {item.label}
            </a>
          </Link>
        )
      )}
    </Popover.Group>
  );
};
