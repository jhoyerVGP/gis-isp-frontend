import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { ProfileUser } from "../types";
import { Card } from "@/components/ui/card";
import { getImageUrl } from "@/utils/getImageUrl";

export function ProfileHeader({ profile }: { profile: ProfileUser }) {
  const initials = `${profile.firstName[0] ?? ""}${profile.lastName[0] ?? ""}`;

  return (
    <Card className="p-2.5 lg:p-6 flex flex-col items-center justify-center gap-2 lg:flex-row lg:items-center lg:gap-4">
      <Avatar className="size-14">
        <AvatarImage
          src={getImageUrl(profile.avatarUrl)}
          alt={profile.firstName}
        />
        <AvatarFallback>{initials.toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <h1 className="text-xl font-semibold">
          {profile.firstName} {profile.lastName}
        </h1>
        <p className="text-sm text-muted-foreground">{profile.username}</p>
        <p className="text-sm text-muted-foreground">{profile.email}</p>
      </div>
      <Badge variant="default">{profile.roleName}</Badge>
    </Card>
  );
}
