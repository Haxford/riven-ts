import path from "node:path";

import packageJson from "../package.json" with { type: "json" };
import { MediaLanguageBridgeSettings } from "./media-language-bridge-settings.schema.ts";
import { pluginConfig } from "./media-language-bridge.config.ts";
import { MediaLanguageBridgeResolver } from "./schema/media-language-bridge.resolver.ts";

import type { RivenPlugin } from "@repo/util-plugin-sdk";

/**
 * Queues one targeted Silo scan after Riven has mounted a completed item.
 * Silo owns the request lifecycle: scanning the matching TMDB/TVDB item
 * causes Silo to close the originating request.
 */
export const plugin: RivenPlugin = {
  name: pluginConfig.name,
  version: packageJson.version,
  resolvers: [MediaLanguageBridgeResolver],
  hooks: {
    "riven.media-item.download.success": async ({
      event,
      settings,
      logger,
    }) => {
      const siloSettings = settings.get(MediaLanguageBridgeSettings);
      const targets = new Map<string, { libraryId: string; path: string }>();

      for (const entry of await event.item.getMediaEntries()) {
        const libraryId =
          entry.baseDirectory === "movies"
            ? siloSettings.moviesLibraryId
            : entry.baseDirectory === "shows"
              ? siloSettings.showsLibraryId
              : undefined;

        if (!libraryId) {
          continue;
        }

        const relativeDirectory = path.posix.dirname(entry.path);
        if (
          path.posix.isAbsolute(entry.path) ||
          relativeDirectory === ".." ||
          relativeDirectory.startsWith("../")
        ) {
          throw new Error(`Unsafe Riven media path: ${entry.path}`);
        }

        const scanPath = path.posix.join(
          siloSettings.siloMountPath,
          entry.baseDirectory,
          relativeDirectory,
        );
        targets.set(`${libraryId}:${scanPath}`, { libraryId, path: scanPath });
      }

      if (targets.size === 0) {
        logger.warn(
          `No supported Silo scan target for ${event.item.fullTitle}`,
        );
        return;
      }

      const results = await Promise.allSettled(
        [...targets.values()].map(async (target) => {
          const response = await fetch(
            new URL("/api/v2/scan", siloSettings.siloUrl),
            {
              method: "POST",
              headers: {
                authorization: `Bearer ${siloSettings.siloApiKey}`,
                "content-type": "application/json",
              },
              body: JSON.stringify({
                library_id: target.libraryId,
                path: target.path,
              }),
            },
          );

          if (response.status !== 202) {
            throw new Error(
              `Silo scan request for ${target.path} returned HTTP ${response.status}`,
            );
          }
        }),
      );

      const errors = results
        .filter(
          (result): result is PromiseRejectedResult =>
            result.status === "rejected",
        )
        .map((result) =>
          result.reason instanceof Error
            ? result.reason.message
            : String(result.reason),
        );

      if (errors.length > 0) {
        throw new Error(
          `Failed to queue Silo scans for ${event.item.fullTitle}: ${errors.join(", ")}`,
        );
      }

      logger.info(
        `Queued ${targets.size.toString()} targeted Silo scan(s) for ${event.item.fullTitle}`,
      );
    },
  },
  settingsSchema: MediaLanguageBridgeSettings,
  async validator() {
    return Promise.resolve(true);
  },
};
