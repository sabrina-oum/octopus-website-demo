import Link from "next/link";
import type { ComponentProps, ComponentPropsWithoutRef } from "react";
import { cx } from "@/lib/cx";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonStyleProps = {
  variant?: ButtonVariant;
  iconOnly?: boolean;
};

type ButtonShape = "text" | "iconOnly";

const baseClasses =
  "focus-ring inline-flex h-10 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-button border text-cta font-medium disabled:cursor-not-allowed";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "border-button-primary-stroke bg-button-primary text-white hover:bg-button-primary-hover focus-visible:bg-button-primary-hover active:bg-button-primary-pressed disabled:border-button-disabled disabled:bg-button-disabled disabled:text-button-disabled-text",
  secondary:
    "border-button-secondary-stroke bg-white text-text-primary hover:bg-button-secondary-hover active:bg-button-secondary-pressed disabled:bg-button-disabled disabled:text-button-disabled-text",
  ghost: "border-transparent disabled:text-button-disabled-text",
};

const shapeClasses: Record<ButtonShape, string> = {
  text: "px-4",
  iconOnly: "size-10",
};

export const ghostTextClasses =
  "text-button-ghost-text hover:text-text-primary active:text-text-primary";

const ghostShapeClasses: Record<ButtonShape, string> = {
  text: ghostTextClasses,
  iconOnly:
    "text-icon-primary hover:bg-button-ghost-hover active:bg-button-ghost-pressed",
};

function buttonClasses({
  variant = "primary",
  iconOnly = false,
  className,
}: ButtonStyleProps & { className?: string }): string {
  const shape: ButtonShape = iconOnly ? "iconOnly" : "text";

  return cx(
    baseClasses,
    variantClasses[variant],
    variant === "ghost" && ghostShapeClasses[shape],
    shapeClasses[shape],
    className,
  );
}

type ButtonProps = ButtonStyleProps & ComponentProps<"button">;

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
