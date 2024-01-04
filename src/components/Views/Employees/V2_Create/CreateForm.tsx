import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { areaOptions, genderOptions } from './mocked';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { postEmployee } from '@/api/api-calls/employees';

import { useZodForm } from '@/hooks';

import {
  Button,
  ComboBoxInput,
  DateInput,
  Grid,
  TextInput,
} from '@/components/ui';
import FileInput from '@/components/ui/FileInput/FileInput';

import { paths } from '@/constants/routes/paths';

import {
  CreateSchema,
  createSchema,
} from '@/form-schemas/schemas/employees/createSchema';

const CreateForm = () => {
  const {
    control,
    onSubmitMiddleware,
    areAllFieldsFilled,
    watch,
    setValue,
    reset,
  } = useZodForm(createSchema);

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const { mutate: createEmployee } = useMutation({
    mutationFn: postEmployee,
    onError: (error) => {
      setIsLoading(false);
      toast.error(error.message);
    },
    onSuccess: () => {
      setIsLoading(false);
      reset();
      toast.success('Empleado creado con éxito');
      window.setTimeout(() => {
        navigate(paths.EMPLOYEES.MAIN);
      }, 1000);
    },
  });

  const uploadedImage = watch('imgFile');

  const handleSubmit = (data: CreateSchema) => {
    setIsLoading(true);

    const fd = new FormData();

    fd.append('name', data.name);
    fd.append('lastname', data.lastname);
    fd.append('email', data.email);
    fd.append('dni', data.dni);
    fd.append('fileNumber', data.fileNumber.toString());
    fd.append('gender', data.gender);
    fd.append(
      'startDate',
      typeof data.startDate === 'string'
        ? data.startDate
        : data.startDate.toISOString()
    );
    fd.append('position', data.position);
    fd.append('area', data.area);
    fd.append('imgFile', data.imgFile);

    createEmployee(fd);
  };

  return (
    <form
      className="card content-card"
      onSubmit={onSubmitMiddleware(handleSubmit)}
    >
      <div className="flex gap-3 mb-3 items-end">
        <div className="w-32 h-32 rounded-md bg-gray-400 overflow-hidden">
          {uploadedImage && (
            <img
              alt="Uploaded"
              className="w-full h-full object-cover"
              height={128}
              src={URL.createObjectURL(uploadedImage)}
              width={128}
            />
          )}
        </div>
        <div>
          <FileInput<CreateSchema>
            control={control}
            label="Seleccione una imagen"
            name="imgFile"
            setValue={setValue}
          />
        </div>
      </div>
      <Grid container gap={2}>
        <Grid item lg={4} sm={6} xs={12}>
          <TextInput<CreateSchema>
            className="w-full"
            control={control}
            label="Nombre"
            name="name"
            placeholder="Juan"
          />
        </Grid>
        <Grid item lg={4} sm={6} xs={12}>
          <TextInput<CreateSchema>
            className="w-full"
            control={control}
            label="Apellido"
            name="lastname"
            placeholder="Pérez"
          />
        </Grid>
        <Grid item lg={4} sm={6} xs={12}>
          <TextInput<CreateSchema>
            className="w-full"
            control={control}
            label="Email"
            name="email"
            placeholder="juanperez@gmail.com"
          />
        </Grid>
        <Grid item lg={4} sm={6} xs={12}>
          <TextInput<CreateSchema>
            className="w-full"
            control={control}
            label="DNI"
            name="dni"
            placeholder="15235647"
          />
        </Grid>
        <Grid item lg={4} sm={6} xs={12}>
          <TextInput<CreateSchema>
            className="w-full"
            control={control}
            label="Nro. Legajo"
            name="fileNumber"
            placeholder="1000"
          />
        </Grid>
        <Grid item lg={4} sm={6} xs={12}>
          <ComboBoxInput<CreateSchema>
            className="w-full"
            control={control}
            label="Género"
            name="gender"
            options={genderOptions}
            placeholder="Seleccione un género"
          />
        </Grid>
        <Grid item lg={4} sm={6} xs={12}>
          <DateInput<CreateSchema>
            className="w-full"
            control={control}
            label="Fecha de alta"
            name="startDate"
            placeholder="01/01/2024"
          />
        </Grid>
        <Grid item lg={4} sm={6} xs={12}>
          <TextInput<CreateSchema>
            className="w-full"
            control={control}
            label="Puesto"
            name="position"
            placeholder="Mecánico"
          />
        </Grid>
        <Grid item lg={4} sm={6} xs={12}>
          <ComboBoxInput<CreateSchema>
            className="w-full"
            control={control}
            label="Área"
            name="area"
            options={areaOptions}
            placeholder="Seleccione un area"
          />
        </Grid>
      </Grid>
      <Button
        className="mt-4"
        colorLight="btn-primary"
        disabled={!areAllFieldsFilled}
        loading={isLoading}
        type="submit"
      >
        Guardar
      </Button>
    </form>
  );
};
export default CreateForm;
