'use client';

import React from 'react';
import { Radio } from './Radio';
import { useTheme } from '@/contexts/ThemeContext';
import { colors, spacing, getTypographyStyle } from '@/lib/design-system';

export type RadioGroupSize = 'sm' | 'md' | 'lg';
export type RadioGroupOrientation = 'horizontal' | 'vertical';

interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface RadioGroupProps {
  label?: string;
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  name: string;
  error?: string;
  hint?: string;
  size?: RadioGroupSize;
  orientation?: RadioGroupOrientation;
  disabled?: boolean;
}

export function RadioGroup({
  label,
  options,
  value,
  onChange,
  name,
  error,
  hint,
  size = 'md',
  orientation = 'horizontal',
  disabled = false,
}: RadioGroupProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const groupId = `radiogroup-${Math.random().toString(36).substr(2, 9)}`;

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: spacing[2],
  };

  const labelStyle = {
    ...getTypographyStyle('label'),
    color: isDark ? colors.text.dark.primary : colors.text.light.primary,
  };

  const optionsContainerStyle = {
    display: 'flex',
    flexDirection: orientation === 'vertical' ? ('column' as const) : ('row' as const),
    gap: spacing[3],
    flexWrap: 'wrap' as const,
  };

  const messageStyle = {
    ...getTypographyStyle('small'),
    marginTop: spacing[1],
  };

  const errorStyle = {
    ...messageStyle,
    color: colors.utility.error,
  };

  const hintStyle = {
    ...messageStyle,
    color: isDark ? colors.text.dark.tertiary : colors.text.light.tertiary,
  };

  return (
    <div style={containerStyle}>
      {label && (
        <label style={labelStyle} id={`${groupId}-label`}>
          {label}
        </label>
      )}
      <div
        style={optionsContainerStyle}
        role="radiogroup"
        aria-labelledby={label ? `${groupId}-label` : undefined}
        aria-describedby={
          error ? `${groupId}-error` :
          hint ? `${groupId}-hint` :
          undefined
        }
      >
        {options.map((option) => (
          <Radio
            key={option.value}
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={() => onChange?.(option.value)}
            label={option.label}
            size={size}
            disabled={disabled || option.disabled}
          />
        ))}
      </div>
      {error && <span id={`${groupId}-error`} style={errorStyle} role="alert">{error}</span>}
      {hint && !error && <span id={`${groupId}-hint`} style={hintStyle}>{hint}</span>}
    </div>
  );
}
