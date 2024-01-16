import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

import {
  editEmployeeFn,
  getLocalitiesFn,
  getStatesFn,
} from '@/api/api-calls/employees';

import { useLoading, useZodForm } from '@/hooks';

import { Button, ComboBoxInput, Grid, TextInput } from '@/components/ui';

import {
  EditContactInfoSchema,
  editContactInfoSchema,
} from '@/form-schemas/schemas/employees/editContactInfoSchema';

import { EmployeeInfoProps } from '@/components/interface/views';
import { BasicList } from '@/interface';

const EditContactForm = (props: EmployeeInfoProps) => {
  const { data: employeeOriginalData } = props;

  // -------------------------------------------------
  // FORM & STATES
  // -------------------------------------------------

  const { control, onSubmitMiddleware, setValue, reset, watch } = useZodForm(
    editContactInfoSchema
  );

  const email = watch('email');
  const state = watch('state');
  const locality = watch('locality');
  const street = watch('street');
  const streetNumber = watch('streetNumber');
  const areAllMandatoryFieldsFilled =
    email && state && street && locality && streetNumber;

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // -------------------------------------------------
  // API
  // -------------------------------------------------

  const [localityList, setLocalityList] = useState<BasicList[]>([]);

  const {
    data: stateList,
    isLoading: stateListIsLoading,
    status: stateListStatus,
  } = useQuery({
    queryKey: ['states'],
    queryFn: getStatesFn,
  });

  const {
    data: localityAPIList,
    isLoading: localityListIsLoading,
    status: localityListStatus,
  } = useQuery({
    queryKey: ['localities'],
    queryFn: () => getLocalitiesFn(state.id),
    enabled: !!state,
  });

  const { mutate: editEmployee } = useMutation({
    mutationFn: editEmployeeFn,
    onError: () => {
      setIsLoading(false);
    },
    onSuccess: () => {
      setIsLoading(false);
      reset();
      toast.success('Información de contacto editada con éxito');
      window.setTimeout(() => {
        navigate(`/employees/${employeeOriginalData.id}`);
      }, 1000);
    },
  });

  useLoading(stateListIsLoading, stateListStatus);
  useLoading(localityListIsLoading, localityListStatus);

  // -------------------------------------------------
  // HANDLERS
  // -------------------------------------------------

  const handleSubmit = (data: EditContactInfoSchema) => {
    setIsLoading(true);
    editEmployee({ ...data, id: employeeOriginalData.id });
  };

  // -------------------------------------------------
  // EFFECTS
  // -------------------------------------------------

  useEffect(() => {
    // if !email only to check if information has been loaded
    if (employeeOriginalData && stateList && !email) {
      setValue('email', employeeOriginalData.email);
      if (employeeOriginalData.phone)
        setValue('phone', +employeeOriginalData.phone);
      if (employeeOriginalData.address)
        setValue('street', employeeOriginalData.address.street);
      if (employeeOriginalData.address)
        setValue('streetNumber', employeeOriginalData.address.streetNumber);
      if (employeeOriginalData.address.apt)
        setValue('apt', employeeOriginalData.address.apt);
      if (employeeOriginalData.address)
        setValue('state', employeeOriginalData.address.state);
    }
    if (state && localityList) {
      const isLocalityInList = localityList.find(
        (loc) => loc.id === employeeOriginalData.address.locality.id
      );
      if (isLocalityInList)
        setValue('locality', employeeOriginalData.address.locality);
    }
  }, [employeeOriginalData, setValue, stateList, localityList, state, email]);

  useEffect(() => {
    if (!state) {
      setValue('locality', {
        id: '',
        description: '',
      });
      setLocalityList([]);
    }
  }, [state, setValue]);

  useEffect(() => {
    if (localityAPIList) {
      setLocalityList(localityAPIList.data || []);
    }
  }, [localityAPIList]);

  // -------------------------------------------------
  // RENDER
  // -------------------------------------------------

  return (
    <form
      className="content-card animate-in-bottom a-delay-200 card"
      onSubmit={onSubmitMiddleware(handleSubmit)}
    >
      <Grid container gap={2}>
        <Grid item lg={8} sm={6} xs={12}>
          <TextInput
            className="w-full"
            control={control}
            disabled={isLoading}
            label="Email *"
            name="email"
            placeholder="juan@hotmail.com"
          />
        </Grid>
        <Grid item lg={4} sm={6} xs={12}>
          <TextInput
            className="w-full"
            control={control}
            disabled={isLoading}
            helperText='Introduce el número con codigo de país y area, pero sin el "+", ejemplo: "5493815857499"'
            label="Teléfono"
            name="phone"
            placeholder="5493815857499"
            type="tel"
          />
        </Grid>
        <Grid item lg={4} sm={6} xs={12}>
          <ComboBoxInput
            className="w-full"
            control={control}
            disabled={isLoading}
            label="Provincia *"
            name="state"
            options={stateList?.data || []}
            placeholder="Seleccione una opción"
          />
        </Grid>
        <Grid item lg={8} sm={6} xs={12}>
          <ComboBoxInput
            className="w-full"
            control={control}
            disabled={isLoading}
            label="Localidad *"
            name="locality"
            options={localityList}
            placeholder="Seleccione una opción"
          />
        </Grid>
        <Grid item lg={4} sm={6} xs={12}>
          <TextInput
            className="w-full"
            control={control}
            disabled={isLoading}
            label="Calle *"
            name="street"
            placeholder="San Martín"
          />
        </Grid>
        <Grid item lg={4} sm={6} xs={12}>
          <TextInput
            className="w-full"
            control={control}
            disabled={isLoading}
            label="Nro *"
            name="streetNumber"
            placeholder="135"
            type="number"
          />
        </Grid>
        <Grid item lg={4} sm={6} xs={12}>
          <TextInput
            className="w-full"
            control={control}
            disabled={isLoading}
            label="Departamento"
            name="apt"
            placeholder="1A"
          />
        </Grid>
      </Grid>
      <Button
        className="mt-4"
        colorLight="btn-primary"
        disabled={!areAllMandatoryFieldsFilled}
        loading={isLoading}
        textColorLight="text-white"
        type="submit"
      >
        Guardar
      </Button>
    </form>
  );
};
export default EditContactForm;
