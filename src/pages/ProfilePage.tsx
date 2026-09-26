import { EmailForm } from "@/features/profile/components/EmailForm";
import { PasswordForm } from "@/features/profile/components/PasswordForm";
import { PersonalInfoForm } from "@/features/profile/components/PersonalInfoForm";
import { ProfileHeader } from "@/features/profile/components/ProfileHeader";
import { TwoFactorSection } from "@/features/profile/components/TwoFactorSection";
import { useProfile } from "@/features/profile/hooks/useProfile";

function ProfilePage() {
  const { data: profile, isLoading } = useProfile();

  if (isLoading || !profile) {
    return <div className="p-6 text-muted-foreground">Cargando perfil…</div>;
  }

  const isAdmin = profile.roleName === "ADMINISTRADOR";

  return (
    <section className="mx-auto w-full space-y-3.5 p-2">
      <div className="flex flex-col items-start gap-1.5">
        <h1 className="text-lg font-semibold">Información del Perfil</h1>
        <p className="text-sm text-muted-foreground">
          Aquí puedes ver y actualizar tu información personal, cambiar tu
          correo electrónico y contraseña, y proteger tu cuenta al administrar
          la autenticación en dos pasos (2FA).
        </p>
      </div>

      {/* Profile information */}
      <ProfileHeader profile={profile} />
      <PersonalInfoForm profile={profile} canEditAll={isAdmin} />
      <EmailForm profile={profile} />
      <PasswordForm />
      <TwoFactorSection profile={profile} />
    </section>
  );
}

export default ProfilePage;
