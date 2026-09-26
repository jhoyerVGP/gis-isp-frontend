import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  personalInfoSchema,
  type PersonalInfoInput,
} from "@/features/profile/profile.schema";
import type { ProfileUser } from "../types";
import { getFriendlyErrorMessage } from "@/utils/errorHandler";

export function PersonalInfoForm({
  profile,
  canEditAll,
}: {
  profile: ProfileUser;
  canEditAll: boolean;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<PersonalInfoInput>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: profile.firstName,
      lastName: profile.lastName,
      phone: profile.phone ?? "",
      ci: profile.ci ?? "",
    },
  });

  //const { mutate, isPending, error } = useUpdatePersonalInfo();

  const onSubmit = (data: PersonalInfoInput) => {
    //mutate(data);
  };

  return (
    <section className="rounded-lg border bg-card p-5">
      <header className="mb-4">
        <h2 className="text-base font-semibold">Datos personales</h2>
        <p className="text-sm text-muted-foreground">
          {canEditAll
            ? "Como administrador puedes editar todos los campos."
            : "Solo puedes actualizar tu teléfono. Contacta a un administrador para cambiar nombre o CI."}
        </p>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="firstName">Nombres</Label>
            <Input
              id="firstName"
              disabled={!canEditAll}
              {...register("firstName")}
            />
            {errors.firstName && (
              <p className="text-xs text-destructive">
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName">Apellidos</Label>
            <Input
              id="lastName"
              disabled={!canEditAll}
              {...register("lastName")}
            />
            {errors.lastName && (
              <p className="text-xs text-destructive">
                {errors.lastName.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="ci">CI</Label>
            <Input id="ci" disabled={!canEditAll} {...register("ci")} />
            {errors.ci && (
              <p className="text-xs text-destructive">{errors.ci.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Teléfono</Label>
            <Input id="phone" {...register("phone")} />
            {errors.phone && (
              <p className="text-xs text-destructive">{errors.phone.message}</p>
            )}
          </div>
        </div>

       {/*  {error && (
          <div className="rounded bg-red-100 p-2 text-sm text-red-700">
            {getFriendlyErrorMessage(error)}
          </div>
        )} */}

        {/* <div className="flex justify-end">
          <Button type="submit" disabled={isPending || !isDirty}>
            {isPending ? "Guardando…" : "Guardar cambios"}
          </Button>
        </div> */}
      </form>
    </section>
  );
}
