import { Button } from "@/components/_ui/button";
import { ButtonGroup } from "@/components/_ui/button-group";
import { Input } from "@/components/_ui/input";
import { Label } from "@/components/_ui/label";

import { Eye, EyeOff } from "lucide-react";
import { useId, useState } from "react";
import { useFormContext } from "react-hook-form";

import type { ComponentProps } from "react";
import type { RegisterOptions } from "react-hook-form";

export interface SettingsPasswordFieldProps extends Omit<
  ComponentProps<"input">,
  keyof RegisterOptions | "type"
> {
  name: string;
  label: string;
  description?: string;
  registerOptions?: RegisterOptions;
}

export function SettingsPasswordField({
  name,
  label,
  description,
  ...props
}: SettingsPasswordFieldProps) {
  const id = useId();

  const { register } = useFormContext();
  const field = register(name, props.registerOptions);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

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
          type={isPasswordVisible ? "text" : "password"}
          className="max-w-xl"
        />
        <ButtonGroup className="shrink-0">
          <Button
            aria-label={isPasswordVisible ? "Hide password" : "Show password"}
            onClick={() => {
              setIsPasswordVisible(!isPasswordVisible);
            }}
            variant="outline"
            size="icon"
            type="button"
          >
            {isPasswordVisible ? <EyeOff /> : <Eye />}
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
}
