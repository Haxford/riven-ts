import { createFormDecorator } from "@/.storybook/decorators/create-form-decorator";
import { preview } from "@/.storybook/preview";

import { SettingField } from "./setting-field";

const meta = preview.meta({
  title: "Settings / SettingField",
  component: SettingField,
});

export const Text = meta.story({
  args: {
    type: "text",
    config: {
      name: "instance-name",
      label: "Instance Name",
    },
  },
  decorators: [createFormDecorator({ progressive: true })],
});

export const Password = meta.story({
  args: {
    type: "password",
    config: {
      name: "api-key",
      label: "API Key",
    },
  },
  decorators: [
    createFormDecorator({
      progressive: true,
      defaultValues: {
        "api-key": "1234567890",
      },
    }),
  ],
});

export const Number = meta.story({
  args: {
    type: "number",
    config: {
      name: "max-workers",
      label: "Max Workers",
      registerOptions: { min: 0 },
    },
  },
  decorators: [
    createFormDecorator({
      progressive: true,
      defaultValues: { "max-workers": 1 },
    }),
  ],
});

export const Boolean = meta.story({
  args: {
    type: "boolean",
    config: {
      name: "enable-notifications",
      label: "Enable Notifications",
    },
  },
  decorators: [
    createFormDecorator({
      progressive: true,
      defaultValues: { "enable-notifications": true },
    }),
  ],
});

export const NullableBoolean = meta.story({
  args: {
    type: "nullable_boolean",
    config: {
      name: "auto-scrape",
      label: "Auto Scrape",
      trueLabel: "Always",
      falseLabel: "Never",
    },
  },
  decorators: [
    createFormDecorator({
      progressive: true,
      defaultValues: { "auto-scrape": null },
    }),
  ],
});
