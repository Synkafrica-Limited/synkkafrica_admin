// src/components/ui/AdminButton.jsx
import React from 'react'

/**
 * @param {'primary'|'secondary'|'danger'|'icon'} variant
 * @param {'sm'|'md'|'lg'}        size
 * @param {boolean}               disabled
 * @param {React.ReactNode}       children
 * @param {React.ReactNode}       icon
 * @param {'left'|'right'}        iconPosition
 * @param {string}                className  extra classes
 * @param {object}                props
 */
export default function AdminButton({
  variant = "primary",
  size = "md",
  disabled = false,
  children,
  icon,
  iconPosition = "right",
  className = "",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center font-medium transition-colors rounded focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-primary-300 shadow-sm"

  const sizes = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
    lg: "px-5 py-2 text-base",
  }

  const variants = {
    primary:
      "bg-primary-600 hover:bg-primary-700 text-white border border-primary-600 disabled:bg-primary-200 disabled:text-white disabled:cursor-not-allowed",
    secondary:
      "bg-white text-primary-600 border border-primary-600 hover:bg-primary-50 disabled:border-primary-200 disabled:text-primary-200 disabled:cursor-not-allowed",
    danger:
      "bg-red-600 hover:bg-red-700 text-white border border-red-600 disabled:bg-red-200 disabled:text-white disabled:cursor-not-allowed",
    icon:
      "bg-primary-600 text-white p-2 rounded-full w-9 h-9 justify-center hover:bg-primary-700 disabled:bg-primary-200 disabled:text-white disabled:cursor-not-allowed",
  }

  if (variant === "icon") {
    return (
      <button
        type="button"
        disabled={disabled}
        className={[base, variants.icon, className].join(" ")}
        {...props}
      >
        {icon}
      </button>
    )
  }

  return (
    <button
      type="button"
      disabled={disabled}
      className={[
        base,
        sizes[size],
        variants[variant],
        className
      ].join(" ")}
      {...props}
    >
      {icon && iconPosition === "left" && (
        <span className="mr-2 flex items-center">{icon}</span>
      )}
      {children}
      {icon && iconPosition === "right" && (
        <span className="ml-2 flex items-center">{icon}</span>
      )}
    </button>
  )
}