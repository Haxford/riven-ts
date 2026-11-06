import z from "zod";

export const MediaLanguageBridgeSettings = z.object({
  bridgeUrl: z
    .url({ protocol: z.regexes.httpProtocol })
    .describe("Media Language Bridge URL, e.g. http://bridge:8787/"),
  bridgeToken: z
    .string()
    .min(1)
    .describe("Bearer token configured in Media Language Bridge"),
});

export type MediaLanguageBridgeSettings = z.infer<
  typeof MediaLanguageBridgeSettings
>;
