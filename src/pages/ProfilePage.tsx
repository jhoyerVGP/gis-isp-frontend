import { EmailForm } from "@/features/profile/components/EmailForm";
import { AccountInfoSection } from "@/features/profile/components/AccountInfoSection";
import { PasswordForm } from "@/features/profile/components/PasswordForm";
import { PersonalInfoForm } from "@/features/profile/components/PersonalInfoForm";
import { ProfileHeader } from "@/features/profile/components/ProfileHeader";
import { TwoFactorSection } from "@/features/profile/components/2FA/TwoFactorSection";
import { useProfile } from "@/features/profile/hooks/useProfile";

function ProfilePage() {
  const { data: profile, isLoading, error } = useProfile();

  if (isLoading || !profile) {
    return (
      <div className="p-6 text-muted-foreground w-full h-full flex items-center justify-center">
        Cargando perfil…
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-destructive w-full h-full">
        A ocurrido un error al cargar el perfil. Por favor, inténtalo de nuevo
        más tarde.
      </div>
    );
  }

  const isAdmin = profile.roleName === "ADMINISTRADOR";

  return (
    <section className="mx-auto w-full space-y-3.5 p-2 lg:p-3">
      <div className="flex flex-col items-start">
        <h2 className="text-lg font-semibold">Información del Perfil</h2>
        <p className="text-sm text-muted-foreground">
          Aquí puedes ver y actualizar tu información personal.
        </p>
      </div>

      {/* Profile information */}
      <ProfileHeader profile={profile} />
      <PersonalInfoForm profile={profile} canEditAll={isAdmin} />
      <AccountInfoSection profile={profile} />
      <EmailForm profile={profile} />
      <PasswordForm />
      <TwoFactorSection twoFactorEnabled={profile.twoFactorEnabled} />
    </section>
  );
}

export default ProfilePage;
