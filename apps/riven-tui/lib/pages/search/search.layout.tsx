import { Text } from "ink";
import { Outlet } from "react-router";

import { PageWrapper } from "../../ui/page-wrapper/page-wrapper.tsx";

export function SearchScreenLayout() {
  return (
    <PageWrapper
      header={{ title: "Search" }}
      footer={
        <Text dimColor>
          [/] focus search · [enter] select · [esc] back · [q]uit
        </Text>
      }
      tabs={{
        "/library": {
          label: "Library",
        },
        "/search": {
          label: "Search",
        },
      }}
    >
      <Outlet />
    </PageWrapper>
  );
}
