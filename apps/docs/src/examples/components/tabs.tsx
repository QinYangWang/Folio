"use client";

import { Tabs, TabList, Tab, TabPanel } from "@/ui/tabs";

export default function Example() {
  return (
    <Tabs>
      <TabList aria-label="Project sections">
        <Tab id="overview">Overview</Tab>
        <Tab id="analytics">Analytics</Tab>
        <Tab id="settings">Settings</Tab>
      </TabList>
      <TabPanel id="overview">Everything you need, in one place.</TabPanel>
      <TabPanel id="analytics">Your project has 1,204 views.</TabPanel>
      <TabPanel id="settings">Manage your team and preferences.</TabPanel>
    </Tabs>
  );
}
