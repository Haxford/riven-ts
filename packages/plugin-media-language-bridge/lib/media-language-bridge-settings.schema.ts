import z from "zod";

export const MediaLanguageBridgeSettings = z.object({
  siloUrl: z
    .url({ protocol: z.regexes.httpProtocol })
    .describe("Silo server URL, e.g. http://192.168.0.246:8090/"),
  siloApiKey: z
    .string()
    .min(1)
    .describe("Silo administrator API key used only to queue targeted scans"),
  siloMountPath: z
    .string()
    .startsWith("/")
    .default("/mnt/riven")
    .describe("Absolute path where Silo sees Riven's FUSE mount"),
  moviesLibraryId: z
    .string()
    .min(1)
    .default("1")
    .describe("Silo library ID for Riven movies"),
  showsLibraryId: z
    .string()
    .min(1)
    .default("2")
    .describe("Silo library ID for Riven shows"),
});

export type MediaLanguageBridgeSettings = z.infer<
  typeof MediaLanguageBridgeSettings
>;
