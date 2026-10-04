"use client";
import {
  ModalOverlay as AriaModalOverlay,
  Modal as AriaModal,
} from "react-aria-components";
import { styled } from "@/lib/folio-styled";
export const ModalOverlay = styled(
  AriaModalOverlay,
  "fixed inset-0 z-50 flex items-center justify-center bg-folio-backdrop p-5 backdrop-blur-sm",
);
export const Modal = styled(
  AriaModal,
  "w-full max-w-lg rounded-xl bg-kumo-base bg-[image:var(--background-image-folio-card)] p-6 text-kumo-default shadow-folio-card",
);
