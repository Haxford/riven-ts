import { useSuspenseQuery } from "@apollo/client/react";
import { Text, useInput } from "ink";
import { Outlet, useNavigate } from "react-router";

import { PageWrapper } from "../../ui/page-wrapper/page-wrapper.tsx";
import { SuspenseBoundary } from "../../ui/suspense-boundary.tsx";
import { GET_LIBRARY_ITEM_COUNTS } from "./queries/get-library-item-counts.query.ts";

export function LibraryScreenLayout() {
  const { data } = useSuspenseQuery(GET_LIBRARY_ITEM_COUNTS, {});

  const navigate = useNavigate();

  useInput((input) => {
    if (input === "s") {
      void navigate("/search");
    }
  });

  return (
    <PageWrapper
      header={{
        title: "Media Library",
        // content: (
        //   <Text dimColor>
        //     {data.mediaItems.length} item
        //     {data.mediaItems.length === 1 ? "" : "s"}
        //   </Text>
        // ),
      }}
      footer={
        <Text dimColor>
          [↑/↓] navigate · [n]ext page · [p]rev page · [enter] view · [r]efresh
          · [s]earch · [q]uit
        </Text>
      }
      tabs={{
        "/library": {
          label: `All (${(data.totalMovies + data.totalShows).toString()})`,
        },
        "/library/type/movie": {
          label: `Movies (${data.totalMovies.toString()})`,
        },
        "/library/type/show": {
          label: `Shows (${data.totalShows.toString()})`,
        },
        "/search": {
          label: "Search",
        },
      }}
    >
      <SuspenseBoundary>
        <Outlet />
      </SuspenseBoundary>
    </PageWrapper>
  );
}
