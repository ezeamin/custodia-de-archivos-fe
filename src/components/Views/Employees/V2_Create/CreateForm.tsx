import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import Swal from 'sweetalert2';

import { postEmployeeFn } from '@/api/api-calls/employees';
import { getAreaOptionsFn, getGenderOptionsFn } from '@/api/api-calls/params';

import { useLoading, useZodForm } from '@/hooks';

import {
  Button,
  ComboBoxInput,
  DateInput,
  FileInput,
  Grid,
  TextInput,
} from '@/components/ui';

import { paths } from '@/constants/routes/paths';

import {
  CreateSchema,
  createSchema,
} from '@/form-schemas/schemas/employees/createSchema';

const CreateForm = () => {
  // -------------------------------------------------
  // FORM & STATES
  // -------------------------------------------------

  const {
    control,
    onSubmitMiddleware,
    areAllFieldsFilled,
    watch,
    setValue,
    reset,
  } = useZodForm(createSchema);

  const uploadedImage = watch('imgFile');

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // -------------------------------------------------
  // API
  // -------------------------------------------------

  const {
    data: genderOptions,
    isLoading: isLoadingGenders,
    isError: isErrorGenders,
    status: statusGenders,
  } = useQuery({
    queryKey: ['genderOptions'],
    queryFn: getGenderOptionsFn,
  });

  const {
    data: areaOptions,
    isLoading: isLoadingAreas,
    isError: isErrorAreas,
    status: statusAreas,
  } = useQuery({
    queryKey: ['areaOptions', true],
    queryFn: () => getAreaOptionsFn(true),
  });

  const { mutate: createEmployee } = useMutation({
    mutationFn: postEmployeeFn,
    onError: () => {
      setIsLoading(false);
    },
    onSuccess: (data) => {
      setIsLoading(false);

      // Person already exists, but is not an employee.
      if (data && data.data && data.message?.includes('Duplicate')) {
        const personData = data.data;
        const { body } = data.data;

        Swal.fire({
          title: 'Atención',
          html: `Ya existe una persona registrada bajo el CUIL ${personData.cuil} en el sistema.<br/><br/>
          Nombre: <b>${personData.lastname}, ${personData.name}</b><br/>
          ${personData.phone ? `Teléfono: <b>${personData.phone}</b><br/>` : ''}
          ${personData.address ? `Dirección: <b>${personData.address}</b><br/>` : ''}
          <br/>De continuar, se creará el empleado sin modificar los datos personales ya registrados.`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí, continuar',
          cancelButtonText: 'Cancelar',
        }).then((res) => {
          if (res.isConfirmed) {
            setIsLoading(true);

            const fd = new FormData();

            fd.append('name', body.name);
            fd.append('lastname', body.lastname);
            fd.append('email', body.email);
            fd.append('cuil', body.cuil);
            fd.append('fileNumber', body.fileNumber);
            fd.append('genderId', body.genderId);
            fd.append('startDate', body.startDate);
            fd.append('birthdate', body.birthdate);
            fd.append('position', body.position);
            fd.append('areaId', body.areaId);
            fd.append('imgFile', uploadedImage);
            fd.append('force', 'true');

            createEmployee(fd);
          }
        });
        return;
      }

      reset();
      toast.success('Empleado creado con éxito');
      navigate(paths.EMPLOYEES.MAIN);
    },
  });

  useLoading(isLoadingGenders, statusGenders);
  useLoading(isLoadingAreas, statusAreas);

  if (isErrorAreas || isErrorGenders) {
    toast.error(
      'Error al cargar datos necesarios para crear un empleado. Reintente más tarde'
    );
    navigate(paths.EMPLOYEES.MAIN);
  }

  // -------------------------------------------------
  // HANDLERS
  // -------------------------------------------------

  const handleSubmit = (data: CreateSchema) => {
    setIsLoading(true);

    const fd = new FormData();

    fd.append('name', data.name);
    fd.append('lastname', data.lastname);
    fd.append('email', data.email);
    fd.append('cuil', data.cuil);
    fd.append('fileNumber', data.fileNumber.toString());
    fd.append('genderId', data.gender.id);
    fd.append(
      'startDate',
      typeof data.startDate === 'string'
        ? data.startDate
        : (data.startDate as Date).toISOString()
    );
    fd.append(
      'birthdate',
      typeof data.birthdate === 'string'
        ? data.birthdate
        : (data.birthdate as Date).toISOString()
    );
    fd.append('position', data.position);
    fd.append('areaId', data.area.id);
    fd.append('imgFile', data.imgFile);

    createEmployee(fd);
  };

  // -------------------------------------------------
  // RENDER
  // -------------------------------------------------

  return (
    <form
      className="content-card animate-in-bottom a-delay-200 card"
      onSubmit={onSubmitMiddleware(handleSubmit)}
    >
      <div className="mb-3 flex items-end gap-3">
        <div className="h-32 w-32 overflow-hidden rounded-md bg-gray-400">
          {uploadedImage && (
            <img
              alt="Uploaded"
              className="h-full w-full object-cover"
              height={128}
              src={URL.createObjectURL(uploadedImage)}
              width={128}
            />
          )}
        </div>
        <div>
          <FileInput
            control={control}
            disabled={isLoading}
            label="Seleccione una imagen"
            name="imgFile"
            setValue={setValue}
          />
        </div>
      </div>
      <Grid container gap={2}>
        <Grid item lg={4} sm={6} xs={12}>
          <TextInput
            className="w-full"
            control={control}
            disabled={isLoading}
            label="Nombre"
            name="name"
            placeholder="Juan"
          />
        </Grid>
        <Grid item lg={4} sm={6} xs={12}>
          <TextInput
            className="w-full"
            control={control}
            disabled={isLoading}
            label="Apellido"
            name="lastname"
            placeholder="Pérez"
          />
        </Grid>
        <Grid item lg={4} sm={6} xs={12}>
          <TextInput
            className="w-full"
            control={control}
            disabled={isLoading}
            label="CUIL"
            maxLength={11}
            name="cuil"
            placeholder="12345678910"
          />
        </Grid>
        <Grid item lg={8} sm={6} xs={12}>
          <TextInput
            className="w-full"
            control={control}
            disabled={isLoading}
            label="Email"
            name="email"
            placeholder="juanperez@gmail.com"
          />
        </Grid>
        <Grid item lg={4} sm={6} xs={12}>
          <TextInput
            className="w-full"
            control={control}
            disabled={isLoading}
            label="Nro. Legajo"
            name="fileNumber"
            placeholder="1000"
          />
        </Grid>
        <Grid item lg={4} sm={6} xs={12}>
          <ComboBoxInput
            className="w-full"
            control={control}
            disabled={isLoading}
            label="Género"
            name="gender"
            options={genderOptions?.data || []}
            placeholder="Seleccione un género"
          />
        </Grid>
        <Grid item lg={4} sm={6} xs={12}>
          <DateInput
            className="w-full"
            control={control}
            disabled={isLoading}
            label="Fecha de nacimiento"
            name="birthdate"
            placeholder="01/01/2024"
          />
        </Grid>
        <Grid item lg={4} sm={6} xs={12}>
          <DateInput
            className="w-full"
            control={control}
            disabled={isLoading}
            label="Fecha de alta"
            name="startDate"
            placeholder="01/01/2024"
          />
        </Grid>
        <Grid item lg={8} sm={6} xs={12}>
          <TextInput
            className="w-full"
            control={control}
            disabled={isLoading}
            label="Puesto"
            name="position"
            placeholder="Mecánico"
          />
        </Grid>
        <Grid item lg={4} sm={6} xs={12}>
          <ComboBoxInput
            className="w-full"
            control={control}
            disabled={isLoading}
            label="Área"
            name="area"
            options={areaOptions?.data || []}
            placeholder="Seleccione un area"
          />
        </Grid>
      </Grid>
      <Button
        className="mt-4"
        colorLight="btn-primary"
        disabled={!areAllFieldsFilled}
        loading={isLoading}
        textColorLight="text-white"
        type="submit"
      >
        Guardar
      </Button>
    </form>
  );
};
export default CreateForm;
