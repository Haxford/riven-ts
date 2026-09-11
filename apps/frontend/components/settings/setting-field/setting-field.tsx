import { cn } from "cn";

import { SettingsBooleanField } from "./_components/boolean-field";
import { SettingsCustomRankField } from "./_components/custom-rank-field";
import { SettingsNullableBooleanField } from "./_components/nullable-boolean-field";
import { SettingsNumberField } from "./_components/number-field";
import { SettingsPasswordField } from "./_components/password-field";
import { SettingsSelectField } from "./_components/select-field";
import { SettingsStringArrayField } from "./_components/string-array-field";
import { SettingsTextField } from "./_components/text-field";

import type { ComponentProps, ComponentType } from "react";

type SettingsFieldType =
  | "text"
  | "password"
  | "number"
  | "boolean"
  | "nullable_boolean"
  | "select"
  | "string_array"
  | "custom_rank";

const settingFieldComponents = {
  text: SettingsTextField,
  password: SettingsPasswordField,
  number: SettingsNumberField,
  boolean: SettingsBooleanField,
  nullable_boolean: SettingsNullableBooleanField,
  select: SettingsSelectField,
  string_array: SettingsStringArrayField,
  custom_rank: SettingsCustomRankField,
} as const satisfies Record<SettingsFieldType, React.ComponentType<never>>;

export type SettingFieldProps = { nested?: boolean } & {
  [T in SettingsFieldType]: {
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
