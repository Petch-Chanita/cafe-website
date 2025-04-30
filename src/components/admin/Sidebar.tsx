import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Avatar } from "@heroui/react";

import "./theme.css";

// This sidebar component is for both mobile and desktop
function Sidebar({ children, expanded, setExpanded }: any) {
  return (
    <div className="relative">
      <div
        className={`fixed inset-0 -z-10 block   ${
          expanded ? "block sm:hidden" : "hidden"
        }`}
      />
      <aside
        className={`sidebar box-border h-screen transition-all${
          expanded ? "w-5/6 sm:w-64" : "w-full sm:w-20"
        }`}
      >
        <nav className="flex h-full flex-col shadow-sm">
          <div className="flex items-center justify-between p-4 pb-2">
            <img
              src="https://img.logoipsum.com/243.svg"
              className={`overflow-hidden transition-all ${
                expanded ? "w-32" : "w-0"
              }`}
              alt=""
            />
            <div>
              {/* className={`${expanded ? "" : "hidden sm:block"}`} */}
              <button
                onClick={() => setExpanded((curr: boolean) => !curr)}
                className="rounded-lg p-1.5"
              >
                {!expanded ? (
                  <ArrowRightIcon className="h-6 w-6" />
                ) : (
                  <ArrowLeftIcon className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
          <ul className="flex-1 px-3">{children}</ul>

          <div className="flex p-3">
            <Avatar
              isBordered
              color="success"
              name="Mark+Ruffalo"
              src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true&name=Mark+Ruffalo"
            />
            <div
              className={`
                flex items-center justify-between
                overflow-hidden transition-all ${expanded ? "ml-3 w-40" : "w-0"}
            `}
            >
              <div className="leading-4">
                <h4 className="font-semibold">Mark Ruffalo</h4>
                <span className="text-xs">mark@gmail.com</span>
              </div>
              {/* <EllipsisVerticalIcon className="h-6 w-6" /> */}
            </div>
          </div>
        </nav>
      </aside>
    </div>
  );
}

export default Sidebar;
