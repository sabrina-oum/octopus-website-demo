import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { cx } from "@/lib/cx";

type ButtonVariant = "primary" | "secondary";

type ButtonStyleProps = {
  variant?: ButtonVariant;
  iconOnly?: boolean;
};

const baseClasses =
  "inline-flex h-10 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-button border text-cta font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus disabled:cursor-not-allowed";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "border-button-primary-stroke bg-button-primary text-white hover:bg-button-primary-hover focus-visible:bg-button-primary-hover active:bg-button-primary-pressed disabled:border-button-disabled disabled:bg-button-disabled disabled:text-button-disabled-text",
  secondary:
    "border-button-secondary-stroke bg-white text-text-primary hover:bg-button-secondary-hover active:bg-button-secondary-pressed disabled:bg-button-disabled disabled:text-button-disabled-text",
};

function buttonClasses({
  variant = "primary",
  iconOnly = false,
  className,
}: ButtonStyleProps & { className?: string }): string {
  return cx(
    baseClasses,
    variantClasses[variant],
    iconOnly ? "size-10" : "px-4",
    className,
  );
}

type ButtonProps = ButtonStyleProps & ComponentPropsWithoutRef<"button">;

export function Button({
  variant,
  iconOnly,
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonClasses({ variant, iconOnly, className })}
      {...props}
    />
  );
}

type ButtonLinkProps = ButtonStyleProps & ComponentPropsWithoutRef<typeof Link>;

export function ButtonLink({
  variant,
  iconOnly,
  className,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={buttonClasses({ variant, iconOnly, className })}
      {...props}
    />
  );
}
