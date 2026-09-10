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
  decorators: [
    createFormDecorator({
      defaultValues: {
        "instance-name": "My Riven Instance",
      },
    }),
  ],
});

export const Password = meta.story({
  args: {
    type: "password",
    config: {
      name: "api-key",
      label: "API Key",
      type: "file",
    },
  },
  decorators: [
    createFormDecorator({
      defaultValues: {
        "api-key": "1234567890",
      },
    }),
  ],
});
