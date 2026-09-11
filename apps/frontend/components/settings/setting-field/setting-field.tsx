import { cn } from "@/lib/utils";

import { SettingsNumberField } from "./_components/number-field";
import { SettingsPasswordField } from "./_components/password-field";
import { SettingsTextField } from "./_components/text-field";

import type { ComponentProps, ComponentType } from "react";

type SettingsFieldType = "text" | "password" | "number";

const settingFieldComponents = {
  text: SettingsTextField,
  password: SettingsPasswordField,
  number: SettingsNumberField,
} as const satisfies Record<SettingsFieldType, React.ComponentType<never>>;

export interface SettingFieldProps<
  T extends SettingsFieldType = SettingsFieldType,
> {
  nested?: boolean;
  type: T;
  config: ComponentProps<(typeof settingFieldComponents)[T]>;
}

export function SettingField<T extends SettingsFieldType>({
  type,
  config,
  nested = false,
}: SettingFieldProps<T>) {
  const Component: ComponentType<typeof config> = settingFieldComponents[type];

  return (
    <div className={cn("space-y-3", !nested && "rounded-lg border p-4")}>
      <Component {...config} />
    </div>
  );
}
