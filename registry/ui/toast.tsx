"use client";
import {
  UNSTABLE_Toast as AriaToast,
  UNSTABLE_ToastRegion as AriaToastRegion,
  UNSTABLE_ToastContent as AriaToastContent,
} from "react-aria-components";
import { styled } from "@/lib/folio-styled";
export {
  UNSTABLE_ToastQueue as ToastQueue,
  UNSTABLE_ToastList as ToastList,
} from "react-aria-components";
export const ToastRegion = styled(
  AriaToastRegion,
  "fixed bottom-5 right-5 z-50 max-w-[calc(100vw-40px)] outline-none",
);
export const Toast = styled(
  AriaToast,
  "mb-2 flex items-center justify-between gap-4 rounded-xl bg-kumo-base px-4 py-3 text-sm text-kumo-default shadow-folio-card outline-none",
);
export const ToastContent = styled(AriaToastContent, "flex flex-col gap-1");
