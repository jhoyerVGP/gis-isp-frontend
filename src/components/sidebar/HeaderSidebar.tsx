import { MapPin, Network } from "lucide-react";

function HeaderSidebar() {
  return (
    <div className="flex items-center gap-3 py-4 px-2">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
        <Network className="h-5 w-5" />
      </div>
      <div className="flex flex-col overflow-hidden">
        <span className="font-bold tracking-tight text-sidebar-foreground truncate">
          VERANET
        </span>
        <span className="text-xs text-muted-foreground flex items-center gap-1 truncate">
          <MapPin className="h-3 w-3 shrink-0" /> Sistema GIS Telecom
        </span>
      </div>
    </div>
  );
}

export default HeaderSidebar;
