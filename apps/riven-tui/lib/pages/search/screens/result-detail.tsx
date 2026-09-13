import { CombinedGraphQLErrors } from "@apollo/client";
import { useApolloClient } from "@apollo/client/react";
import { Box, Text, useInput } from "ink";
import Link from "ink-link";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { z } from "zod";

import { DetailRow } from "../../item-detail/components/detail-row.tsx";
import { REQUEST_ITEM } from "../queries/request-item.mutation.ts";

const RESOLUTION_OPTIONS = ["2160p", "1080p", "720p"] as const;
const LANGUAGE_OPTIONS = ["en", "ja", "ko", "es", "fr", "de"] as const;

const locationStateSchema = z.object({
  result: z.object({
    id: z.number(),
    mediaType: z.enum(["movie", "show"]),
    title: z.string().nullish(),
    overview: z.string().nullish(),
    releaseDate: z.string().nullish(),
    originalLanguage: z.string().nullish(),
    voteAverage: z.number().nullish(),
  }),
});

export function SearchResultDetailScreen() {
  const location = useLocation();
  const navigate = useNavigate();
  const client = useApolloClient();

  const parsedState = locationStateSchema.safeParse(location.state);

  const result = parsedState.success ? parsedState.data.result : null;

  const [selectedResolutions, setSelectedResolutions] = useState<Set<string>>(
    new Set(),
  );
  const [language, setLanguage] = useState<string | null>(null);
  const [cursor, setCursor] = useState(0);
  const [isRequesting, setIsRequesting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  function submitRequest() {
    if (result === null) {
      return;
    }

    setIsRequesting(true);
    setMessage(null);

    const preferences = {
      ...(selectedResolutions.size > 0 && {
        resolutions: [...selectedResolutions],
      }),
      ...(language != null && { language }),
    };

    client
      .mutate({
        mutation: REQUEST_ITEM,
        variables: {
          input: {
            type: result.mediaType,
            tmdbId: result.id.toString(),
            ...(Object.keys(preferences).length > 0 && { preferences }),
          },
        },
      })
      .then((response) => {
        if (response.data?.requestItem) {
          setMessage(
            `Requested ${result.title ?? result.mediaType}. It will appear in your library once indexed.`,
          );

          return;
        }

        setMessage("Request failed: unknown error.");
      })
      .catch((error: unknown) => {
        if (CombinedGraphQLErrors.is(error)) {
          const errorMessages = error.errors
            .map((graphQLError) => graphQLError.message)
            .join("; ");

          setMessage(`Request failed: ${errorMessages}`);

          return;
        }

        setMessage("Request failed: unknown error.");
      })
      .finally(() => {
        setIsRequesting(false);
      });
  }

  useInput((input, key) => {
    if (key.escape) {
      void navigate(-1);

      return;
    }

    if (result === null) {
      return;
    }

    if (key.upArrow || input.toLowerCase() === "k") {
      setCursor((current) => Math.max(0, current - 1));

      return;
    }

    if (key.downArrow || input.toLowerCase() === "j") {
      setCursor((current) =>
        Math.min(RESOLUTION_OPTIONS.length + 1, current + 1),
      );

      return;
    }

    if (!key.return && input !== " ") {
      return;
    }

    if (cursor < RESOLUTION_OPTIONS.length) {
      const resolution = RESOLUTION_OPTIONS[cursor];

      if (resolution) {
        setSelectedResolutions((current) => {
          const next = new Set(current);

          if (next.has(resolution)) {
            next.delete(resolution);
          } else {
            next.add(resolution);
          }

          return next;
        });
      }

      return;
    }

    if (cursor === RESOLUTION_OPTIONS.length) {
      const currentIndex = LANGUAGE_OPTIONS.indexOf(
        language as (typeof LANGUAGE_OPTIONS)[number],
      );
      const nextLanguage = LANGUAGE_OPTIONS[currentIndex + 1];

      setLanguage(nextLanguage ?? null);

      return;
    }

    submitRequest();
  });

  if (result === null) {
    return (
      <Box flexDirection="column">
        <Text dimColor>No result selected.</Text>
      </Box>
    );
  }

  const languageIndex = LANGUAGE_OPTIONS.indexOf(
    language as (typeof LANGUAGE_OPTIONS)[number],
  );
  const languageLabel =
    languageIndex === -1 ? "any" : LANGUAGE_OPTIONS[languageIndex];

  return (
    <Box flexDirection="column" gap={1}>
      <Box flexDirection="column">
        <DetailRow
          label="TMDB"
          value={
            <Link
              url={`https://www.themoviedb.org/${result.mediaType}/${result.id.toString()}`}
            >
              <Text color="blue">{result.id.toString()}</Text>
            </Link>
          }
        />
        <DetailRow
          label="Release"
          value={result.releaseDate?.slice(0, 4) ?? "—"}
        />
        <DetailRow
          label="Rating"
          value={result.voteAverage?.toFixed(1) ?? "—"}
        />
        <DetailRow label="Language" value={result.originalLanguage ?? "—"} />
      </Box>
      {result.overview && <Text>{result.overview}</Text>}
      <Box flexDirection="column" paddingTop={1}>
        <Text dimColor>Download preferences</Text>
        {RESOLUTION_OPTIONS.map((resolution, index) => (
          <Text key={resolution} color={index === cursor ? "cyan" : "white"}>
            {index === cursor ? "❯ " : "  "}
            {resolution}
            {selectedResolutions.has(resolution) ? " ✓" : ""}
          </Text>
        ))}
        <Text color={RESOLUTION_OPTIONS.length === cursor ? "cyan" : "white"}>
          {RESOLUTION_OPTIONS.length === cursor ? "❯ " : "  "}
          Language: {languageLabel}
        </Text>
        <Text
          color={RESOLUTION_OPTIONS.length + 1 === cursor ? "cyan" : "white"}
        >
          {RESOLUTION_OPTIONS.length + 1 === cursor ? "❯ " : "  "}
          Request
        </Text>
      </Box>
      {message && <Text color="yellow">{message}</Text>}
      {isRequesting && <Text dimColor>Requesting…</Text>}
    </Box>
  );
}
