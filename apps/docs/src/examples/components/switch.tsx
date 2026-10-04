"use client";

import { Switch } from "@/ui/switch";

export default function Example() {
  return (
    <div className="flex flex-col gap-4">
      <Switch defaultSelected>Email notifications</Switch>
      <Switch>Product updates</Switch>
      <Switch isDisabled>Unavailable</Switch>
    </div>
  );
}
