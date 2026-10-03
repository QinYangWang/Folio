"use client";
import { type ReactNode } from "react";
import {
  AnimatePresence,
  motion,
  useIsPresent,
  useReducedMotion,
} from "motion/react";
import { Modal, ModalOverlay } from "react-aria-components";

const MotionOverlay = motion.create(ModalOverlay);
const MotionModal = motion.create(Modal);

// Keep React Aria's portal, focus trap, scroll lock and restore-focus lifecycle.
function OverlayPresence({
  children,
  onOpenChange,
}: {
  children: ReactNode;
  onOpenChange?: (open: boolean) => void;
}) {
  const present = useIsPresent();
  const reduced = useReducedMotion();
  return (
    <MotionOverlay
      isOpen={present}
      isExiting={!present}
      onOpenChange={onOpenChange}
      isDismissable
      className="fixed inset-0 z-50 flex items-center justify-center bg-folio-backdrop p-5 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduced ? 0 : 0.16 }}
    >
      {children}
    </MotionOverlay>
  );
}

export function AnimatedOverlay({
  isOpen,
  onOpenChange,
  children,
}: {
  isOpen: boolean;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <OverlayPresence key="overlay" onOpenChange={onOpenChange}>
          {children}
        </OverlayPresence>
      )}
    </AnimatePresence>
  );
}

export function AnimatedModal({
  children,
  className = "w-full max-w-lg max-h-[90vh] overflow-auto rounded-xl bg-kumo-base bg-[image:var(--background-image-folio-card)] p-6 text-kumo-default shadow-folio-card",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <MotionModal
      className={className}
      initial={{ opacity: 0, y: reduced ? 0 : 12, scale: reduced ? 1 : 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: reduced ? 0 : 6, scale: reduced ? 1 : 0.99 }}
      transition={{ duration: reduced ? 0 : 0.18, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionModal>
  );
}
