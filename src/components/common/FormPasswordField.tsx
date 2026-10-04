import { useId, useState } from "react";
import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { cn } from "@/lib/utils";

type FormPasswordFieldProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label: string;
  placeholder?: string;
  required?: boolean;
  description?: string;
  disabled?: boolean;
  readOnly?: boolean;
  autoComplete?: string;
  maxLength?: number;
  autoFocus?: boolean;
  className?: string;
};

export function FormPasswordField<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  required = false,
  description,
  disabled,
  readOnly,
  autoComplete,
  maxLength,
  autoFocus,
  className,
}: FormPasswordFieldProps<TFieldValues>) {
  const uid = useId();
  const [showPassword, setShowPassword] = useState(false);

  const inputId = `${uid}-${name}`;
  const descriptionId = `${inputId}-description`;
  const errorId = `${inputId}-error`;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const hasError = fieldState.invalid;

        return (
          <Field data-invalid={hasError} className={className}>
            <FieldLabel htmlFor={inputId}>
              {label}
              {required && (
                <span aria-hidden="true" className="text-destructive">
                  *
                </span>
              )}
            </FieldLabel>

            <div className="relative">
              <Input
                {...field}
                id={inputId}
                type={showPassword ? "text" : "password"}
                value={field.value ?? ""}
                placeholder={placeholder}
                disabled={disabled}
                readOnly={readOnly}
                autoComplete={autoComplete}
                maxLength={maxLength}
                autoFocus={autoFocus}
                required={required}
                aria-invalid={hasError}
                aria-describedby={
                  hasError ? errorId : description ? descriptionId : undefined
                }
                className={cn("pr-10", hasError && "border-destructive")}
              />

              <Button
                type="button"
                variant="ghost"
                size="sm"
                disabled={disabled}
                tabIndex={-1}
                aria-label={
                  showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                }
                className="absolute right-0 top-0 h-full px-3 text-muted-foreground hover:bg-transparent"
                onClick={() => setShowPassword((value) => !value)}
              >
                {showPassword ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </Button>
            </div>

            {description && !hasError && (
              <FieldDescription id={descriptionId}>
                {description}
              </FieldDescription>
            )}

            {hasError && (
              <FieldError id={errorId} errors={[fieldState.error]} />
            )}
          </Field>
        );
      }}
    />
  );
}
