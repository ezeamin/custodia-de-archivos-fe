import dayjs, { type Dayjs } from 'dayjs';
import { z, type ZodType } from 'zod';

// ----------------------------------------------------
// HELPERS
// ----------------------------------------------------

const optionalWrapper = <T extends ZodType>(required: boolean, rule: T) => {
  if (!required) {
    return z.optional(rule);
  }
  return rule;
};

// ----------------------------------------------------
// COMMON RULES
// ----------------------------------------------------

export const resolutionRules = (required = false) => {
  const rule = z
    .string()
    .max(25, {
      message: 'El Número de acordada debe tener como máximo 25 caracteres',
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
        message: 'El Número de acordada debe tener al menos 3 caracteres',
      }
    )
    .default('');

  return optionalWrapper<typeof rule>(required, rule);
};

export const dateRules = (required = false) => {
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

  return optionalWrapper<typeof rule>(required, rule);
};

export const typeRules = (required = false) => {
  const rule = z.string().min(1, {
    message: 'Debe seleccionar un tipo',
  });

  return optionalWrapper<typeof rule>(required, rule);
};

export const cuilRules = (required = false) => {
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

  return optionalWrapper<typeof rule>(required, rule);
};

export const lastnameRules = (required = false) => {
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

  return optionalWrapper<typeof rule>(required, rule);
};

export const nameRules = (required = false) => {
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

  return optionalWrapper<typeof rule>(required, rule);
};

export const usernameRules = (required = false) => {
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

  return optionalWrapper<typeof rule>(required, rule);
};
export const booleanRules = (required = false) => {
  const rule = z.boolean().default(false);

  return optionalWrapper<typeof rule>(required, rule);
};

export const emailRules = (required = false) => {
  const rule = z
    .string()
    .email({
      message: 'Debe ingresar un email válido',
    })
    .max(100, {
      message: 'El email debe tener como máximo 100 caracteres',
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
        message: 'El email debe tener al menos 3 caracteres',
      }
    )
    .default('');

  return optionalWrapper<typeof rule>(required, rule);
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
