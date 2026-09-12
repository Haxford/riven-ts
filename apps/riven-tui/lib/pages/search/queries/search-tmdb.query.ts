import { gql } from "@apollo/client";

import type {
  RivenTuiSearchTmdbQuery,
  RivenTuiSearchTmdbQueryVariables,
} from "./search-tmdb.query.typegen.ts";
import type { TypedDocumentNode } from "@apollo/client";

export const SEARCH_TMDB: TypedDocumentNode<
  RivenTuiSearchTmdbQuery,
  RivenTuiSearchTmdbQueryVariables
> = gql`
  query RivenTuiSearchTmdb($query: String!, $page: Int, $language: String) {
    tmdbSearch(query: $query, page: $page, language: $language) {
      id
      mediaType
      title
      overview
      releaseDate
      originalLanguage
      voteAverage
    }
  }
`;
