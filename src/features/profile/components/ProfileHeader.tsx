import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { ProfileUser } from "../types";

export function ProfileHeader({ profile }: { profile: ProfileUser }) {
  const initials = `${profile.firstName[0] ?? ""}${profile.lastName[0] ?? ""}`;

  return (
    <header className="flex items-center gap-4 rounded-lg border bg-card p-4">
      <Avatar className="size-14">
        <AvatarFallback>{initials.toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <h1 className="text-xl font-semibold">
          {profile.firstName} {profile.lastName}
        </h1>
        <p className="text-sm text-muted-foreground">{profile.email}</p>
      </div>
      <div className="flex flex-col items-end gap-1">
        <Badge variant="secondary">{profile.roleName}</Badge>
        <Badge
          variant={
            profile.status === "ACTIVE"
              ? "default"
              : profile.status === "SUSPENDED"
                ? "destructive"
                : "outline"
          }
        >
          {profile.status}
        </Badge>
      </div>
    </header>
  );
}
