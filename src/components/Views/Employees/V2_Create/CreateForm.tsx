import { useZodForm } from '@/hooks';

import {
  Button,
  ComboBoxInput,
  DateInput,
  Grid,
  TextInput,
} from '@/components/ui';
import FileInput from '@/components/ui/FileInput/FileInput';

import {
  CreateSchema,
  createSchema,
} from '@/form-schemas/schemas/employees/createSchema';

const genderOptions = [
  {
    id: '1',
    description: 'Masculino',
  },
  {
    id: '2',
    description: 'Femenino',
  },
  {
    id: '3',
    description: 'Otro',
  },
];

const areaOptions = [
  {
    id: '1',
    description: 'Sistematización',
  },
  {
    id: '2',
    description: 'Clasificación',
  },
  {
    id: '3',
    description: 'Atención al cliente',
  },
  {
    id: '4',
    description: 'Administración',
  },
  {
    id: '5',
    description: 'Mantenimiento',
  },
];

const CreateForm = () => {
  const { control, onSubmitMiddleware, areAllFieldsFilled, watch, setValue } =
    useZodForm(createSchema);

  const uploadedImage = watch('imgFile');

  const handleSubmit = (data: CreateSchema) => {
    console.log(data);
    // TODO: Send loading state to button
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
        type="submit"
      >
        Guardar
      </Button>
    </form>
  );
};
export default CreateForm;
