import { useId } from "react";
import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

import { Input } from "@/components/ui/input";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { cn } from "@/lib/utils";

type FormTextFieldProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label: string;
  placeholder?: string;
  required?: boolean;
  description?: string;
  disabled?: boolean;
  readOnly?: boolean;
  readOnlyEmptyText?: string;
  type?: "text" | "email" | "tel" | "url" | "password";
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  maxLength?: number;
  autoFocus?: boolean;
  className?: string;
};

export function FormTextField<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  required = false,
  description,
  disabled,
  readOnly,
  readOnlyEmptyText,
  type = "text",
  autoComplete,
  inputMode,
  maxLength,
  autoFocus,
  className,
}: FormTextFieldProps<TFieldValues>) {
  const uid = useId();
  const inputId = `${uid}-${name}`;
  const descriptionId = `${inputId}-description`;
  const errorId = `${inputId}-error`;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const hasError = fieldState.invalid;

        const isEmpty =
          field.value === undefined ||
          field.value === null ||
          String(field.value).trim() === "";

        const showReadOnlyFallback = readOnly && isEmpty && readOnlyEmptyText;

        const displayValue = showReadOnlyFallback
          ? readOnlyEmptyText
          : (field.value ?? "");

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

            <Input
              {...field}
              id={inputId}
              type={showReadOnlyFallback ? "text" : type}
              value={displayValue}
              placeholder={placeholder}
              disabled={disabled}
              readOnly={readOnly}
              autoComplete={autoComplete}
              inputMode={inputMode}
              maxLength={maxLength}
              autoFocus={autoFocus}
              required={required}
              aria-invalid={hasError}
              aria-describedby={
                hasError ? errorId : description ? descriptionId : undefined
              }
              className={cn(
                hasError && "border-destructive",
                showReadOnlyFallback && "text-muted-foreground",
              )}
            />

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
