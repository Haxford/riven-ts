import { cn } from "@/lib/utils";

import { SettingsBooleanField } from "./_components/boolean-field";
import { SettingsNullableBooleanField } from "./_components/nullable-boolean-field";
import { SettingsNumberField } from "./_components/number-field";
import { SettingsPasswordField } from "./_components/password-field";
import { SettingsTextField } from "./_components/text-field";

import type { ComponentProps, ComponentType } from "react";

type SettingsFieldType =
  | "text"
  | "password"
  | "number"
  | "boolean"
  | "nullable_boolean";

const settingFieldComponents = {
  text: SettingsTextField,
  password: SettingsPasswordField,
  number: SettingsNumberField,
  boolean: SettingsBooleanField,
  nullable_boolean: SettingsNullableBooleanField,
} as const satisfies Record<SettingsFieldType, React.ComponentType<never>>;

export type SettingFieldProps = {
  [T in SettingsFieldType]: {
    nested?: boolean;
    type: T;
    config: ComponentProps<(typeof settingFieldComponents)[T]>;
  };
}[SettingsFieldType];

export function SettingField({
  type,
  config,
  nested = false,
}: SettingFieldProps) {
  // oxlint-disable-next-line typescript/no-explicit-any
  const Component: ComponentType<any> = settingFieldComponents[type];

  return (
    <div className={cn("space-y-3", !nested && "rounded-lg border p-4")}>
      <Component {...config} />
    </div>
  );
}
