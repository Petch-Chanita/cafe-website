import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { Tooltip } from 'react-tooltip'

interface SidebarItemProps {
  active?: boolean;
  icon: React.ReactNode;
  text: string;
  keyId?: string;
  expanded: boolean;
  subMenu?: SubMenuItemProps[] | null;
  onClick?: () => void;
}

// We're assuming that the sub-menu items will not have further sub-menu items therefore, it cannot be expanded
interface SubMenuItemProps extends Omit<SidebarItemProps, "expanded"> {
  expanded?: never;
  subMenu?: never;
}

// This component is used to render the sub-menu items when hovered
function HoveredSubMenuItem({ icon, text, active,onClick }: SubMenuItemProps) {
  return (
    <div
      className={`sidebar-item my-1 rounded-md p-2  ${active && "active"}`}
      onClick={onClick}
    >
      <div className="flex items-center justify-center ">
        <span className="h-6 w-6 ">{icon}</span>
        <span className="ml-3 w-28 text-start">{text}</span>
        <div className="h-1" />
      </div>
    </div>
  );
}
function SidebarItem({
  icon,
  active,
  text,
  expanded = false,
  subMenu = null,
  onClick,
}: SidebarItemProps) {
  const [expandSubMenu, setExpandSubMenu] = useState(false);

  useEffect(() => {
    if (!expanded) {
      setExpandSubMenu(false);
    }
  }, [expanded]);

  // Calculate the height of the sub-menu assuming each item is 40px tall
  const subMenuHeight = expandSubMenu
    ? `${((subMenu?.length || 0) * 40 + (subMenu! && 15)).toString()}px`
    : 0;

  return (
    <>
      <li>
        <button
          className={`sidebar-item
         group relative my-1 flex w-full cursor-pointer
         items-center rounded-md px-3
         py-2 font-medium transition-colors
         ${active && !subMenu ? "active" : ""}
         ${!expanded ? "collapsed" : ""}
     `}
          onClick={() => {
            setExpandSubMenu((curr) => expanded && !curr);
            if (onClick) onClick();
          }}

          data-tooltip-id="tooltip"
          data-tooltip-content={text}
          data-tooltip-place="right-end"
        >
          <span className="h-6 w-6">{icon}</span>

          <span
            className={`overflow-hidden text-start transition-all ${
              expanded ? "ml-3 w-44" : "w-0"
            }`}
          >
            {text}
          </span>
          {subMenu && (
            <div
              className={`absolute right-2 h-4 w-4${
                expanded ? "" : "top-2"
              } transition-all ${expandSubMenu ? "rotate-90" : "rotate-0"}`}
            >
              <ChevronRightIcon />
            </div>
          )}

        
          {!expanded && (
            <div
              className={`
            submenu-item
            invisible absolute left-full ml-6 
            rounded-md
            py-1 text-sm opacity-20 transition-all
            group-hover:visible group-hover:translate-x-0 group-hover:opacity-100
        `}
            >
              {!subMenu
                ?  <Tooltip id="tooltip" />
                : subMenu.map((item, index) => (
                    <HoveredSubMenuItem
                      key={index}
                      text={item.text}
                      icon={item.icon}
                      onClick={item.onClick}
                    />
                  ))}
            </div>
          )}
        </button>
      </li>
      <ul className="sub-menu pl-6" style={{ height: subMenuHeight }}>
        {expanded &&
          subMenu?.map((item, index) => (
            <SidebarItem key={index} {...item} expanded={expanded} />
          ))}
      </ul>
    </>
  );
}

export default SidebarItem;
