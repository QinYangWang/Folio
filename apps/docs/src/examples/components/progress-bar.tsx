"use client";

import { ProgressBar } from "@/ui/progress-bar";
import { Label } from "@/ui/label";

export default function Example() {
  return (
    <ProgressBar value={65} className="w-64">
      {({ percentage, valueText }) => (
        <>
          <div className="flex justify-between">
            <Label>Uploading files</Label>
            <span>{valueText}</span>
          </div>
          <div className="h-2 rounded-full bg-kumo-fill shadow-folio-inset">
            <div
              className="h-full rounded-full bg-kumo-brand"
              style={{ width: percentage + "%" }}
            />
          </div>
        </>
      )}
    </ProgressBar>
  );
}
