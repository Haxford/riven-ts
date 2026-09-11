import { createFormDecorator } from "@/.storybook/decorators/create-form-decorator";
import { preview } from "@/.storybook/preview";

import { SettingField } from "./setting-field";

const meta = preview.meta({
  title: "Settings / SettingField",
  component: SettingField,
  decorators: [createFormDecorator({ progressive: true })],
});

export const Text = meta.story({
  args: {
    type: "text",
    config: {
      name: "instance-name",
      label: "Instance Name",
      defaultValue: "My Riven Instance",
    },
  },
});

export const Password = meta.story({
  args: {
    type: "password",
    config: {
      name: "api-key",
      label: "API Key",
      defaultValue: "1234567890",
      type: "file",
    },
  },
});

export const Number = meta.story({
  args: {
    type: "number",
    config: {
      name: "max-workers",
      label: "Max Workers",
      defaultValue: 1,
      registerOptions: { min: 0 },
    },
  },
});
