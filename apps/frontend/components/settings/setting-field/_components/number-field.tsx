import { Input } from "@/components/_ui/input";
import { Label } from "@/components/_ui/label";

import { useId } from "react";
import { useFormContext } from "react-hook-form";

import type { ComponentProps } from "react";
import type { RegisterOptions } from "react-hook-form";

export interface SettingsNumberField extends Omit<
  ComponentProps<"input">,
  keyof RegisterOptions | "type"
> {
  name: string;
  label: string;
  description?: string;
  registerOptions?: RegisterOptions;
}

export function SettingsNumberField({
  name,
  label,
  description,
  ...props
}: SettingsNumberField) {
  const id = useId();

  const { register } = useFormContext();
  const field = register(name, props.registerOptions);

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      {description && (
        <p className="text-muted-foreground text-sm">{description}</p>
      )}
      <div className="flex max-w-xl items-center gap-2">
        <Input
          {...props}
          {...field}
          id={id}
          className="max-w-xl"
          type="number"
        />
      </div>
    </div>
  );
}
