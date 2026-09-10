import { cn } from "@/lib/utils";

import { SettingsPasswordField } from "./_components/password-field";
import { SettingsTextField } from "./_components/text-field";

import type { ComponentProps } from "react";

type SettingsFieldType = "text" | "password";

const settingFieldComponents = {
  text: SettingsTextField,
  password: SettingsPasswordField,
} as const satisfies Record<SettingsFieldType, React.ComponentType<never>>;

export type SettingFieldProps<T extends SettingsFieldType = SettingsFieldType> =
  { type: T; nested?: boolean } & {
    config: ComponentProps<(typeof settingFieldComponents)[T]>;
  };

export function SettingField({
  type,
  config,
  nested = false,
}: SettingFieldProps) {
  const Component = settingFieldComponents[type];

  return (
    <div className={cn("space-y-3", !nested && "rounded-lg border p-4")}>
      <Component {...config} />
    </div>
  );
}
