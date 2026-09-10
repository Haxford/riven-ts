import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/_ui/tabs";
import { PageShell } from "@/components/page-shell/page-shell";
import { DangerZone } from "@/components/settings/danger-zone/danger-zone";

import { useState } from "react";

import { GeneralTab } from "./_components/general-tab";
import { PluginsTab } from "./_components/plugins-tab";
import { RankingTab } from "./_components/ranking-tab";

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");

  const canManageSettings = true;

  return (
    <PageShell>
      <div className="mx-auto w-full max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight">Settings</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Configure Riven, plugins, and ranking preferences.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6 w-full justify-start">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="plugins">Plugins</TabsTrigger>
            <TabsTrigger value="ranking">Ranking</TabsTrigger>
          </TabsList>
          <TabsContent value="general">
            <GeneralTab />
            {canManageSettings && (
              <div className="mt-8">
                <DangerZone />
              </div>
            )}
          </TabsContent>

          <TabsContent value="plugins">
            <PluginsTab />
          </TabsContent>
          <TabsContent value="ranking">
            <RankingTab />
            {/* <RankingTab
                    bind:rank
                    rankSchema={data.rankSettingsSchema}
                    {qualityProfiles}
                    bind:customProfiles
                    bind:activeProfileName
                    bind:newProfileName
                    bind:savingProfile
                    {saveAsProfile}
                    {toggleProfileEnabled}
                    {applyProfile}
                    {deleteCustomProfile}
                    {saveActiveProfileSettings} /> */}
          </TabsContent>
        </Tabs>
      </div>
    </PageShell>
  );
}
