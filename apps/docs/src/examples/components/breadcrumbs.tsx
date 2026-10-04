"use client";

import { Breadcrumbs, Breadcrumb } from "@/ui/breadcrumbs";
import { Link } from "@/ui/link";

export default function Example() {
  return (
    <Breadcrumbs>
      <Breadcrumb>
        <Link href="#/components">Components</Link>
      </Breadcrumb>
      <Breadcrumb>
        <Link>Breadcrumbs</Link>
      </Breadcrumb>
    </Breadcrumbs>
  );
}
