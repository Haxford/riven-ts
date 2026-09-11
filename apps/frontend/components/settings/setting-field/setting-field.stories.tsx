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
      label: "Instance Name",
      name: "instance-name",
    },
  },
  decorators: [createFormDecorator({ progressive: true })],
});

export const Password = meta.story({
  args: {
    type: "password",
    config: {
      label: "API Key",
      name: "api-key",
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
      label: "Max Workers",
      name: "max-workers",
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
      label: "Enable Notifications",
      name: "enable-notifications",
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
      label: "Auto Scrape",
      name: "auto-scrape",
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

export const Select = meta.story({
  args: {
    type: "select",
    config: {
      label: "Preferred Resolution",
      name: "preferred-resolution",
      options: [
        { value: "2160p", label: "2160p" },
        { value: "1080p", label: "1080p" },
        { value: "720p", label: "720p" },
        { value: "480p", label: "480p" },
      ],
    },
  },
  decorators: [
    createFormDecorator({
      progressive: true,
      defaultValues: { "preferred-resolution": "1080p" },
    }),
  ],
});

export const StringArray = meta.story({
  args: {
    type: "string_array",
    config: {
      label: "Excluded Words",
      name: "excluded-words",
    },
  },
  decorators: [
    createFormDecorator({
      progressive: true,
      defaultValues: { "excluded-words": ["CAM", "TS", "WORKPRINT"] },
    }),
  ],
});

export const CustomRank = meta.story({
  args: {
    type: "custom_rank",
    config: {
      label: "1080p",
      name: "custom-rank",
    },
  },
  decorators: [
    createFormDecorator({
      progressive: true,
      defaultValues: { "custom-rank": { fetch: true, rank: 1 } },
    }),
  ],
});
