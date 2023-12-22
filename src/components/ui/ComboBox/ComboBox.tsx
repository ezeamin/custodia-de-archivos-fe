import { Fragment, useEffect, useState } from 'react';
import type { FieldValues } from 'react-hook-form';
import { MdCheck, MdClear, MdExpandMore } from 'react-icons/md';

import { cn } from '@/utilities';
import { Combobox, Transition } from '@headlessui/react';

import type { ComboBoxProps } from './ComboBox.types';
import Button from '@/components/ui/Button/Button';
import Icon from '@/components/ui/Icon/Icon';

/**
 * A custom combo box component that provides autocompletion functionality.
 *
 * @param props - The props for the ComboBox component.
 * @param className - Additional CSS class to apply to the component.
 * @param disabled - Specifies whether the combobox is disabled.
 * @param error - Specifies whether the combobox has an error.
 * @param iconCheckProps - Props for the check icon in the component.
 * @param iconClearProps - Props for the clear icon in the component.
 * @param iconExpandProps - Props for the expand icon in the component.
 * @param msgError - Error message to display if no options are available.
 * @param options - Array of options for the combo box.
 * @param positionedColorOption - Background and text color for positioned option.
 * @param selectedColorOption - Background color for selected option.
 * @param sizing - Dimensions for the combo box.
 +
 * @returns JSX.Element A custom combo box element.
 */

const ComboBox = <T extends FieldValues>(
  props: ComboBoxProps<T>
): JSX.Element => {
  const {
    className,
    disabled = false,
    error = false,
    iconCheckProps,
    iconClearProps,
    iconExpandProps,
    inputClassName,
    msgError,
    name,
    options,
    placeholder,
    positionedColorOption,
    selectedColorOption,
    sizing,
    controller,
  } = props;

  const [disabledState, setDisabledState] = useState(true);
  const [isOptionSelected, setIsOptionSelected] = useState(false); // Track if an option is selected
  const [query, setQuery] = useState('');
  const [selectedOption, setSelectedOption] = useState('');

  const filteredOption =
    query === ''
      ? options
      : options.filter(({ description }) => {
          return description.toLowerCase().includes(query.toLowerCase());
        });

  const positionedColor = positionedColorOption
    ? `${positionedColorOption.bgColor} ${positionedColorOption.textColor}`
    : 'bg-sky-600 text-white';

  const handleClearSelection = (): void => {
    setSelectedOption('');
    setIsOptionSelected(false);
    controller.onChange('');
  };

  const handleSelect = (selected: string | null): void => {
    if (selected !== null) {
      setSelectedOption(selected);
      setIsOptionSelected(true);
    }
    controller.onChange(selected);
  };

  useEffect(() => {
    setDisabledState(disabled);
  }, [disabled]);

  useEffect(() => {
    if (controller.value !== selectedOption) {
      handleSelect(controller.value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- causes an infinite loop
  }, [controller.value]);

  return (
    <div className={className}>
      <Combobox
        aria-describedby="error-message"
        aria-label="Seleccione una opción"
        disabled={disabledState}
        onChange={handleSelect}
        ref={controller.ref}
        value={selectedOption}
      >
        <div className={`relative mt-1 ${sizing?.width ? sizing.width : ''}`}>
          <div
            aria-label="Combo Box"
            className="grid relative w-full cursor-default overflow-hidden rounded-lg  bg-gray-100 dark:bg-slate-700 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm"
          >
            <Combobox.Input
              aria-label="Ingrese su selección"
              className={cn(
                `input input-bordered bg-transparent focus:outline-none w-full ${
                  sizing?.height ? sizing.height : ''
                } ${error ? 'border-error' : ''}`,
                inputClassName
              )}
              displayValue={(option: string) => option}
              id={name}
              onChange={(event) => {
                setQuery(event.target.value);
              }}
              placeholder={placeholder || 'Seleccione una opción...'}
            />

            {isOptionSelected ? (
              <Button
                aria-label="Borrar selección"
                ariaHidden
                className="absolute inset-y-0 right-0 flex items-center pr-3 h-auto"
                colorLight="btn-ghost"
                onClick={handleClearSelection}
                type="button"
                unstyled
              >
                <Icon
                  className={iconClearProps?.className}
                  color={iconClearProps?.color}
                  iconComponent={
                    iconClearProps?.iconComponent ? (
                      iconClearProps.iconComponent
                    ) : (
                      <MdClear />
                    )
                  }
                  size={iconClearProps?.size}
                  title="icon-clear"
                />
              </Button>
            ) : (
              <Combobox.Button
                aria-label="Expandir/comprimir opciones"
                className="btn-ghost absolute inset-y-0 right-0 flex items-center p-3"
              >
                <Icon
                  className={iconExpandProps?.className}
                  color={iconExpandProps?.color}
                  iconComponent={
                    iconExpandProps?.iconComponent ? (
                      iconExpandProps.iconComponent
                    ) : (
                      <MdExpandMore />
                    )
                  }
                  size={iconExpandProps?.size}
                  title="icon-expand-more"
                />
              </Combobox.Button>
            )}
          </div>
          <Transition
            afterLeave={() => {
              setQuery('');
            }}
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-40">
              {filteredOption.length === 0 && !query ? (
                <div
                  aria-atomic="true"
                  aria-live="assertive"
                  className="relative cursor-default select-none py-2 px-4 text-gray-700"
                  id="error-message"
                >
                  {msgError || 'No hay opciones disponibles.'}
                </div>
              ) : (
                filteredOption.map((option) => (
                  <Combobox.Option
                    aria-label="Opciones disponibles"
                    className={({ active, selected }) =>
                      `relative cursor-pointer select-none py-3 pl-10 pr-4 ${
                        active ? `${positionedColor}` : 'text-gray-900'
                      } ${selected ? `${selectedColorOption}` : ''}`
                    }
                    key={option.id}
                    value={option.description}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {option.description}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? 'text-rose-500' : 'text-teal-600'
                            }`}
                          >
                            <Icon
                              className={`${iconCheckProps?.className} h-5 w-5`}
                              iconComponent={
                                iconCheckProps?.iconComponent ? (
                                  iconCheckProps.iconComponent
                                ) : (
                                  <MdCheck />
                                )
                              }
                              title="icon-check"
                            />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};

export default ComboBox;
