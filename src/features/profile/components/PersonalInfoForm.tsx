import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  personalInfoSchema,
  type PersonalInfoInput,
} from "@/features/profile/profile.schema";
import type { ProfileUser } from "../types";
import { FormTextField } from "@/components/common/FormTextField";
import { useProfileHandler } from "../hooks/useProfileHandler";
import { Card } from "@/components/ui/card";

export function PersonalInfoForm({
  profile,
  canEditAll,
}: {
  profile: ProfileUser;
  canEditAll: boolean;
}) {
  const {
    control,
    handleSubmit,
    formState: { isDirty },
  } = useForm<PersonalInfoInput>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: profile.firstName,
      lastName: profile.lastName,
      phone: profile.phone ?? "",
      ci: profile.ci ?? "",
    },
  });

  const { isLoading, updatePersonProfile } = useProfileHandler();

  const onSubmit = (data: PersonalInfoInput) => {
    updatePersonProfile(profile.id, data);
  };

  return (
    <Card className="p-2.5 lg:p-6">
      <header className="mb-4">
        <h2 className="text-base font-semibold">Datos personales</h2>
        <p className="text-sm text-muted-foreground">
          Aquí puedes ver y actualizar solo tus datos personales disponibles
          como teléfono.
        </p>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <FormTextField
            control={control}
            name="firstName"
            label="Nombres"
            placeholder="Ingresa tus nombres"
            readOnly={true}
          />

          <FormTextField
            control={control}
            name="lastName"
            label="Apellidos"
            placeholder="Ingresa tus apellidos"
            readOnly={true}
          />

          <FormTextField
            control={control}
            name="ci"
            label="Cédula de identidad"
            placeholder="Ingresa tu cédula"
            readOnly={true}
            readOnlyEmptyText="Sin cédula de identidad"
          />

          <FormTextField
            control={control}
            name="phone"
            label="Teléfono"
            placeholder="Ingresa tu teléfono"
          />
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isLoading || !isDirty}
            className="cursor-pointer"
          >
            {isLoading ? "Guardando…" : "Guardar cambios"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
