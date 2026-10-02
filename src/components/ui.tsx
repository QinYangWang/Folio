'use client';
import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Button as AriaButton, Switch as AriaSwitch, Checkbox as AriaCheckbox, TextField, Label, Input, type ButtonProps, type SwitchProps, type CheckboxProps } from 'react-aria-components';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const spring = { type: 'spring', stiffness: 500, damping: 32 } as const;

export function Button({ className, variant = 'secondary', children, ...props }: ButtonProps & { variant?: 'primary' | 'secondary' | 'ghost' }) {
  const reduced = useReducedMotion();
  return (
    <AriaButton {...props} className={state => twMerge(clsx(
      'inline-flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-kumo-focus disabled:opacity-40 disabled:cursor-not-allowed',
      variant === 'primary' ? 'bg-kumo-brand text-folio-on-brand hover:bg-kumo-brand-hover' : variant === 'ghost' ? 'hover:bg-kumo-tint' : 'bg-kumo-control text-kumo-default ring-1 ring-kumo-line hover:bg-kumo-fill-hover',
      typeof className === 'function' ? className(state) : className,
    ))}>
      {state => <motion.span className="inline-flex items-center justify-center gap-2" initial={false}
        animate={{ scale: state.isPressed && !state.isDisabled && !reduced ? 0.96 : 1 }}
        transition={reduced ? { duration: 0 } : spring}>
        {typeof children === 'function' ? children(state) : children}
      </motion.span>}
    </AriaButton>
  );
}

export function Switch({ children, ...props }: SwitchProps) {
  const reduced = useReducedMotion();
  return <AriaSwitch {...props} className="group flex items-center gap-3 text-sm cursor-pointer data-[disabled]:cursor-not-allowed data-[disabled]:opacity-40">
    {state => <>
      <span className="flex h-5 w-9 shrink-0 items-center rounded-full bg-kumo-interact px-0.5 group-data-[selected]:bg-kumo-brand group-data-[focus-visible]:ring-2 ring-kumo-focus">
        <motion.span aria-hidden="true" className="h-4 w-4 rounded-full bg-folio-on-brand shadow-sm"
          initial={false} animate={{ x: state.isSelected ? 16 : 0 }} transition={reduced ? { duration: 0 } : spring} />
      </span>
      {typeof children === 'function' ? children(state) : children}
    </>}
  </AriaSwitch>;
}

export function Checkbox({ children, ...props }: CheckboxProps) {
  const reduced = useReducedMotion();
  return <AriaCheckbox {...props} className="group flex items-center gap-2.5 text-sm cursor-pointer data-[disabled]:cursor-not-allowed data-[disabled]:opacity-40">
    {state => <>
      <span className="flex size-4 items-center justify-center rounded bg-kumo-control ring-1 ring-kumo-line group-data-[selected]:bg-kumo-brand group-data-[selected]:ring-kumo-brand group-data-[indeterminate]:bg-kumo-brand group-data-[focus-visible]:ring-2 group-data-[focus-visible]:ring-kumo-focus">
        <motion.svg aria-hidden="true" viewBox="0 0 16 16" className="size-3 text-folio-on-brand" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <motion.path d={state.isIndeterminate ? 'M3 8h10' : 'M3 8l3 3 7-7'} initial={false}
            animate={{ pathLength: state.isSelected || state.isIndeterminate ? 1 : 0, opacity: state.isSelected || state.isIndeterminate ? 1 : 0 }}
            transition={{ duration: reduced ? 0 : 0.16, ease: 'easeOut' }} />
        </motion.svg>
      </span>
      {typeof children === 'function' ? children(state) : children}
    </>}
  </AriaCheckbox>;
}

export function Field({ label, placeholder, type = 'text' }: { label: string; placeholder?: string; type?: string }) {
  const [focused, setFocused] = useState(false);
  const reduced = useReducedMotion();
  return <TextField className="flex flex-col gap-1.5 text-sm" type={type} onFocusChange={setFocused}>
    <Label className="font-medium">{label}</Label>
    <div className="relative">
      <Input placeholder={placeholder} className="w-full rounded-md bg-kumo-control px-3 py-2 text-sm text-kumo-default placeholder:text-kumo-placeholder ring-1 ring-kumo-line outline-none focus:ring-2 focus:ring-kumo-focus" />
      <motion.span aria-hidden="true" className="pointer-events-none absolute inset-x-2 bottom-0 h-0.5 origin-left rounded bg-kumo-brand"
        initial={false} animate={{ scaleX: focused ? 1 : 0, opacity: focused ? 1 : 0 }} transition={{ duration: reduced ? 0 : 0.18 }} />
    </div>
  </TextField>;
}
