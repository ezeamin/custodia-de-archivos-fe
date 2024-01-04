import { useEffect, useRef } from 'react';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Spanish } from 'flatpickr/dist/l10n/es.js';

import { cn } from '@/utilities';

import type {
  DatePickerProps,
  OptionsDatePickerProps,
} from './DatePicker.types';

const optionsDefaultValues: OptionsDatePickerProps = {
  enableTime: false,
  dateFormat: 'd/m/Y',
  locale: Spanish,
  mode: 'single',
  noCalendar: false,
};

/**
 * Component for selecting dates and time s with customizable options.
 * @param props - The props for the DateTimePicker component.
 * @param [props.className = ''] - Additional CSS class for the component.
 * @param [props.dti] - data-testid attribute value.
 * @param [props.error] - Indicates whether the input has an error.
 * @param [props.name] - Name of the input.
 * @param props.onChange - Function to execute when the selected date changes.
 * @param [props.placeholder] - Placeholder text for the input.
 * @param [props.options] - Configuration options for the DateTimePicker.
 * @param [props.options.allowInput] - Allow manual input of dates.
 * @param [props.options.clickOpens] - Open the calendar when the input is clicked.
 * @param [props.options.dateFormat='d/m/Y'] - Date and time format to display.
 *   Possible values: 'd/m/Y H:i' | 'd/m/Y H:i:S' | 'd/m/Y' | 'H:i' | 'H:i:S'
 * @param [props.options.defaultDate] - Default date to display.
 * @param [props.options.defaultHour] - Default hour value.
 * @param [props.options.defaultMinute] - Default minute value.
 * @param [props.options.defaultSeconds] - Default seconds value.
 * @param [props.options.disableMobile] - Disable mobile mode.
 * @param [props.options.enableTime] - Enable or disable time selection.
 * @param [props.options.errorHandler] - Custom error handler function.
 * @param [props.options.locale] - Local language for the component.
 * @param [props.options.maxDate] - Maximum allowed date.
 * @param [props.options.minDate] - Minimum allowed date.
 * @param [props.options.mode='single'] - Calendar selection mode ('single', 'multiple', 'range', 'time').
 * @param [props.options.noCalendar] - Hide the calendar and show only the time picker.
 * @returns The DateTimePicker component.
 */

const DatePicker = (props: DatePickerProps): JSX.Element => {
  const {
    className = '',
    error = false,
    name,
    onChange,
    disabled = false,
    options,
    placeholder,
  } = props;

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      const fp = flatpickr(inputRef.current, {
        ...optionsDefaultValues,
        ...options,
        onChange: (selectedDates) => {
          if (selectedDates.length > 0) {
            onChange(selectedDates[0]);
          } else {
            // Clear input
            onChange('');
          }
        },
      });

      return () => {
        fp.destroy();
      };
    }

    return () => {};
  }, [onChange, options]);

  return (
    <input
      className={cn(
        `input input-bordered bg-gray-100 dark:bg-slate-700 w-full ${
          error && 'border-error'
        }`,
        className
      )}
      disabled={disabled}
      name={name}
      placeholder={placeholder || 'Seleccione la Fecha'}
      ref={inputRef}
      type="text"
    />
  );
};

export default DatePicker;
