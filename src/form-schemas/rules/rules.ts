import dayjs, { type Dayjs } from 'dayjs';
import { z } from 'zod';

// ----------------------------------------------------
// HELPERS
// ----------------------------------------------------
type RuleType<T extends z.ZodType, U extends boolean> = U extends true
  ? T
  : z.ZodOptional<T>;

export function optionalWrapper<T extends z.ZodType, U extends boolean>(
  required: U,
  rule: T
): RuleType<T, U> {
  if (required) return rule as RuleType<T, U>;
  return z.optional(rule) as RuleType<T, U>;
}

// ----------------------------------------------------
// COMMON RULES
// ----------------------------------------------------

export const dateRules = <T extends boolean = false>(required: T) => {
  const rule = z
    .union([z.date(), z.string()])
    // Check if it's a string (empty field)
    .refine(
      (data) => {
        return !(typeof data === 'string');
      },
      {
        message: `Debe ingresar una fecha valida`,
      }
    )
    .refine(
      // If it has a value, it must be a valid date
      (data) => {
        if (!data) return true;
        const date = dayjs(data);
        return date.isValid();
      },
      {
        message: `La fecha no es válida`,
      }
    );

  return optionalWrapper(required, rule);
};

export const hourRules = <T extends boolean = false>(required: T) => {
  const rule = z
    .string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
      message: 'La hora debe tener el formato HH:MM',
    })
    .default('');

  return optionalWrapper(required, rule);
};

export const typeRules = <T extends boolean = false>(
  required: T,
  typeName = ''
) => {
  const rule = z.string().min(1, {
    message: `Debe seleccionar un tipo ${typeName ? `de ${typeName}` : ''}`,
  });

  return optionalWrapper(required, rule);
};

export const cuilRules = <T extends boolean = false>(required: T) => {
  const rule = z
    .string()
    .regex(/^\d+$/, {
      message: 'El CUIL debe contener solo números',
    })
    .max(11, {
      message: 'El CUIL debe tener como máximo 11 caracteres',
    })
    .refine(
      // Min length is 11 when it does have content (cannot use .min() because it's initially empty)
      (data) => {
        if (required) {
          return data.length > 0;
        }

        return !data || data.length >= 11;
      },
      {
        message: 'El CUIL debe tener 11 caracteres',
      }
    )
    .default('');

  return optionalWrapper(required, rule);
};

export const lastnameRules = <T extends boolean = false>(required: T) => {
  const rule = z
    .string()
    .max(50, {
      message: 'El Apellido debe tener como máximo 50 caracteres',
    })
    .refine(
      // Min length is 3 when it does have content (cannot use .min() because it's initially empty)
      (data) => {
        if (required) {
          return data.length > 0;
        }

        return !data || data.length >= 3;
      },
      {
        message: 'El Apellido debe tener al menos 3 caracteres',
      }
    )
    .default('');

  return optionalWrapper(required, rule);
};

export const nameRules = <T extends boolean = false>(required: T) => {
  const rule = z
    .string()
    .max(50, {
      message: 'El Nombre debe tener como máximo 50 caracteres',
    })
    .refine(
      // Min length is 3 when it does have content (cannot use .min() because it's initially empty)
      (data) => {
        if (required) {
          return data.length > 0;
        }

        return !data || data.length >= 3;
      },
      {
        message: 'El Nombre debe tener al menos 3 caracteres',
      }
    )
    .default('');

  return optionalWrapper(required, rule);
};

export const textRules = <T extends boolean = false>(required: T) => {
  const rule = z
    .string()
    .max(1000, {
      message: 'El Texto debe tener como máximo 1000 caracteres',
    })
    .refine(
      // Min length is 3 when it does have content (cannot use .min() because it's initially empty)
      (data) => {
        if (required) {
          return data.length > 0;
        }

        return !data || data.length >= 3;
      },
      {
        message: 'El Texto debe tener al menos 3 caracteres',
      }
    )
    .default('');

  return optionalWrapper(required, rule);
};

export const usernameRules = <T extends boolean = false>(required: T) => {
  const rule = z
    .string()
    .max(50, {
      message: 'El Usuario debe tener como máximo 50 caracteres',
    })
    .refine(
      // Min length is 3 when it does have content (cannot use .min() because it's initially empty)
      (data) => {
        if (required) {
          return data.length > 0;
        }

        return !data || data.length >= 3;
      },
      {
        message: 'El Usuario debe tener al menos 3 caracteres',
      }
    )
    .default('');

  return optionalWrapper(required, rule);
};

export const booleanRules = <T extends boolean = false>(required: T) => {
  const rule = z.boolean().default(false);

  return optionalWrapper(required, rule);
};

export const emailRules = <T extends boolean = false>(required: T) => {
  const rule = z
    .string()
    .email({
      message: 'Debe ingresar un Email válido',
    })
    .max(100, {
      message: 'El Email debe tener como máximo 100 caracteres',
    })
    .refine(
      // Min length is 3 when it does have content (cannot use .min() because it's initially empty)
      (data) => {
        if (required) {
          return data.length > 0;
        }

        return !data || data.length >= 3;
      },
      {
        message: 'El Email debe tener al menos 3 caracteres',
      }
    )
    .default('');

  return optionalWrapper(required, rule);
};

export const dniRules = <T extends boolean = false>(required: T) => {
  const rule = z
    .string()
    .regex(/^\d+$/, {
      message: 'El DNI debe contener solo números',
    })
    .max(8, {
      message: 'El DNI debe tener 7 u 8 caracteres',
    })
    .refine(
      // Min length is 7 when it does have content (cannot use .min() because it's initially empty and optional)
      (data) => {
        if (required) {
          return data.length > 0;
        }

        return !data || data.length >= 7;
      },
      {
        message: 'El DNI debe tener 7 u 8 caracteres',
      }
    )
    .default('');

  return optionalWrapper(required, rule);
};

export const positionRules = <T extends boolean = false>(required: T) => {
  const rule = z
    .string()
    .max(50, {
      message: 'El Puesto debe tener como máximo 50 caracteres',
    })
    .refine(
      // Min length is 3 when it does have content (cannot use .min() because it's initially empty)
      (data) => {
        if (required) {
          return data.length > 0;
        }

        return !data || data.length >= 3;
      },
      {
        message: 'El Puesto debe tener al menos 3 caracteres',
      }
    )
    .default('');

  return optionalWrapper(required, rule);
};

export const multipleValuesRules = <T extends boolean = false>(required: T) => {
  // each value is of type {id: string, description: string}, that's an interface called BasicList
  const rule = z
    .array(
      z.object({
        id: z.string(),
        description: z.string(),
      })
    )
    .default([]);

  return optionalWrapper(required, rule);
};

// ----------------------------------------------------
// COMMON REFINES
// ----------------------------------------------------

// At least one field must have value
export const notEmptyForm = (data: object) => {
  return Object.values(data).some(Boolean);
};

notEmptyForm.msg = () => ({
  message: 'Por lo menos un campo debe tener valores',
});

// If fromDate and toDate have values, fromDate must be before or equal to toDate
export const fromDateBeforeToDate = (data: {
  fromDate: Dayjs | null;
  toDate: Dayjs | null;
}) => {
  if (!data.fromDate || !data.toDate) return true;
  if (data.fromDate.isSame(data.toDate)) return true;
  return data.fromDate.isBefore(data.toDate);
};

fromDateBeforeToDate.msg = () => ({
  message: 'La fecha desde debe ser menor a la fecha hasta',
});

// If fromDate has value, toDate must have value too
export const fromDateAndToDate = (
  data: {
    fromDate: Dayjs | null;
    toDate: Dayjs | null;
  },
  field: 'toDate' | 'fromDate'
) => {
  const otherField = field === 'toDate' ? 'fromDate' : 'toDate';

  if (!data[field]) return true;
  return data[field] && !!data[otherField];
};

fromDateAndToDate.msg = (field: 'toDate' | 'fromDate') => ({
  message: `Para buscar por fecha ${
    field === 'toDate' ? 'hasta' : 'desde'
  }, debe ingresar también una fecha ${field === 'toDate' ? 'desde' : 'hasta'}`,
  path: [field],
});

export const fromHourBeforeToHour = (data: {
  startHour: string;
  endHour: string;
}) => {
  if (!data.startHour || !data.endHour) return true;
  if (data.startHour === data.endHour) return true;
  return data.startHour < data.endHour;
};

fromHourBeforeToHour.msg = () => ({
  message: 'La hora de inicio debe ser menor a la hora de fin',
});
