import { useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { FormTextField } from "@/components/common/FormTextField";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  usernameSchema,
  type UsernameInput,
} from "@/features/profile/profile.schema";
import type { ProfileUser } from "../types";
import { Card } from "@/components/ui/card";
import avatarDefault from "@/assets/avatarDefault.png";
import { optimizeImage } from "@/utils/optimizeImage";
import { useProfileHandler } from "../hooks/useProfileHandler";
import { getImageUrl } from "@/utils/getImageUrl";

export function AccountInfoSection({ profile }: { profile: ProfileUser }) {
  const [avatarFile, setAvatarFile] = useState<File | Blob | null>(null);
  const [preview, setPreview] = useState<string | null>(
    profile.avatarUrl ? getImageUrl(profile.avatarUrl) : null,
  );

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form setup
  const { control, handleSubmit, formState, reset } = useForm<UsernameInput>({
    resolver: zodResolver(usernameSchema),
    defaultValues: {
      username: profile.username,
    },
  });

  const { updateAccountInfo, isLoading } = useProfileHandler();

  const hasChanges = formState.isDirty || avatarFile !== null;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      const { file: optimizedFile, previewUrl } = await optimizeImage(file, {
        maxWidth: 300,
        maxHeight: 300,
        square: true,
        quality: 0.85,
        format: "image/webp",
        maxSizeBytes: 300 * 1024,
      });

      if (preview?.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }

      setPreview(previewUrl);
      setAvatarFile(optimizedFile);
    } catch (error) {
      console.error(error);
      alert("No se pudo procesar la imagen.");
    } finally {
      e.target.value = "";
    }
  };

  const handleSelectFile = () => {
    fileInputRef.current?.click();
  };

  const onSubmit = async (data: UsernameInput) => {
    await updateAccountInfo(profile.id, data.username, avatarFile);
    reset();
    setAvatarFile(null);
  };

  return (
    <Card className="p-2.5 lg:p-6">
      <header className="mb-4">
        <h2 className="text-base font-semibold">Datos de la cuenta</h2>

        <p className="text-sm text-muted-foreground">
          Identificador utilizado para acceder al sistema.
        </p>
      </header>

      <div className="grid items-center gap-4 sm:grid-cols-2">
        <div className="flex flex-col items-center gap-4">
          <Avatar className="size-20 shrink-0 sm:size-24">
            {preview && <AvatarImage src={preview} alt={profile.firstName} />}

            <AvatarFallback className="overflow-hidden">
              <img
                src={avatarDefault}
                alt="Avatar por defecto"
                className="h-full w-full object-cover"
              />
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col items-center gap-2">
            <p className="font-medium">Foto de perfil</p>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleSelectFile}
              disabled={isLoading}
            >
              Subir imagen
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormTextField
            control={control}
            name="username"
            label="Nombre de usuario"
            placeholder="Ingresa tu nombre de usuario"
            autoComplete="username"
          />

          <div className="flex items-end justify-end">
            <Button
              type="submit"
              disabled={!hasChanges || isLoading}
              className="cursor-pointer"
            >
              {isLoading ? "Guardando..." : "Guardar cambios"}
            </Button>
          </div>
        </form>
      </div>
    </Card>
  );
}
