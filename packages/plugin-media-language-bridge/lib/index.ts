import path from "node:path";

import packageJson from "../package.json" with { type: "json" };
import { MediaLanguageBridgeSettings } from "./media-language-bridge-settings.schema.ts";
import { pluginConfig } from "./media-language-bridge.config.ts";
import { MediaLanguageBridgeResolver } from "./schema/media-language-bridge.resolver.ts";

import type { RivenPlugin } from "@repo/util-plugin-sdk";

/**
 * Reports Riven request/download lifecycle events to Media Language Bridge.
 * Silo's scan-source plugin subsequently polls that bridge for raw paths.
 */
export const plugin: RivenPlugin = {
  name: pluginConfig.name,
  version: packageJson.version,
  resolvers: [MediaLanguageBridgeResolver],
  hooks: {
    "riven.item-request.create.success": async ({
      event,
      settings,
      logger,
    }) => {
      const { bridgeUrl, bridgeToken } = settings.get(
        MediaLanguageBridgeSettings,
      );
      const externalId =
        event.item.tmdbId ?? event.item.imdbId ?? event.item.tvdbId;

      if (!externalId) {
        logger.warn(
          `No external ID to report for Riven request ${event.item.id}`,
        );
        return;
      }

      const response = await fetch(new URL("/v1/riven/events", bridgeUrl), {
        method: "POST",
        headers: {
          authorization: `Bearer ${bridgeToken}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          type: "riven.item-request.create.success",
          itemId: event.item.id,
          requestKey: `${event.item.type}:${externalId}`,
        }),
      });

      if (!response.ok) {
        throw new Error(
          `Media Language Bridge returned HTTP ${response.status}`,
        );
      }

      logger.info(
        `Reported created request ${event.item.id} to Media Language Bridge`,
      );
    },
    "riven.media-item.download.success": async ({
      event,
      settings,
      logger,
    }) => {
      const { bridgeUrl, bridgeToken } = settings.get(
        MediaLanguageBridgeSettings,
      );
      const paths = (await event.item.getMediaEntries()).map((entry) =>
        path.join(entry.baseDirectory, entry.path),
      );

      if (paths.length === 0) {
        logger.warn(`No media paths to report for ${event.item.fullTitle}`);
        return;
      }

      const response = await fetch(new URL("/v1/riven/events", bridgeUrl), {
        method: "POST",
        headers: {
          authorization: `Bearer ${bridgeToken}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          type: "riven.media-item.download.success",
          itemId: event.item.id,
          title: event.item.fullTitle,
          paths,
        }),
      });

      if (!response.ok) {
        throw new Error(
          `Media Language Bridge returned HTTP ${response.status}`,
        );
      }

      logger.info(
        `Reported ${paths.length.toString()} completed media path(s) for ${event.item.fullTitle}`,
      );
    },
  },
  settingsSchema: MediaLanguageBridgeSettings,
  async validator() {
    return Promise.resolve(true);
  },
};
