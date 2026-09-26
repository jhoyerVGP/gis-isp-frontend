import { Link } from "react-router-dom";
import type { LucideIcon } from "lucide-react";

type NavItem = {
  title: string;
  url: string;
  icon?: LucideIcon;
};

type NavMainProps = {
  items: NavItem[];
};

export function NavButton({ items }: NavMainProps) {
  return (
    <nav aria-label="Main navigation" className="flex flex-col gap-2 p-2">
      {/* Navigation items */}
      <ul className="flex flex-col gap-1">
        {items.map((item) => {
          const IconCmp = item.icon;
          return (
            <li key={item.title}>
              <Link
                to={item.url}
                title={item.title}
                className="
                  group flex items-center gap-2 rounded-md px-2 py-1.5 text-sm
                  text-sidebar-foreground
                  hover:bg-sidebar-accent hover:text-sidebar-accent-foreground
                  data-[collapsible=icon]:justify-center
                "
              >
                {IconCmp && <IconCmp className="size-4 shrink-0" />}
                <span className="group-data-[collapsible=icon]:hidden">
                  {item.title}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
