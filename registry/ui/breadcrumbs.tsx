"use client";
import {
  Breadcrumbs as AriaBreadcrumbs,
  Breadcrumb as AriaBreadcrumb,
} from "react-aria-components";
import { styled } from "@/lib/folio-styled";
export const Breadcrumbs = styled(
  AriaBreadcrumbs,
  "flex flex-wrap items-center gap-2 text-sm text-kumo-subtle",
);
export const Breadcrumb = styled(
  AriaBreadcrumb,
  'inline-flex items-center gap-2 after:content-["/"] after:ml-2 last:after:hidden',
);
