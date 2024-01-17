import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import {
  editEmployeeFn,
  getLocalitiesFn,
  getStatesFn,
  getStreetsFn,
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

  const [hasLoadedInfo, setHasLoadedInfo] = useState(false);
  const [localityList, setLocalityList] = useState<BasicList[]>([]);
  const [streetList, setStreetList] = useState<BasicList[]>([]);

  const queryClient = useQueryClient();

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
    queryKey: [`localities_${state?.id || ''}`, !!state],
    queryFn: () => getLocalitiesFn(state?.id || ''),
    enabled: !!state,
  });

  const {
    data: streetAPIList,
    isLoading: streetListIsLoading,
    status: streetListStatus,
  } = useQuery({
    queryKey: [`streets_${locality?.id || ''}`, !!locality],
    queryFn: () =>
      getStreetsFn({
        state: state?.description || '',
        locality: locality?.description || '',
      }),
    enabled: !!locality,
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
      queryClient.invalidateQueries({
        queryKey: [`employee_${employeeOriginalData.id}`],
      });
      window.setTimeout(() => {
        navigate(`/employees/${employeeOriginalData.id}/personal`);
      }, 1000);
    },
  });

  useLoading(stateListIsLoading, stateListStatus);
  useLoading(localityListIsLoading, localityListStatus);
  useLoading(streetListIsLoading, streetListStatus);

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
        setValue('streetNumber', employeeOriginalData.address.streetNumber);
      if (employeeOriginalData.address.apt)
        setValue('apt', employeeOriginalData.address.apt);
      if (employeeOriginalData.address)
        setValue('state', employeeOriginalData.address.state);
    }
  }, [employeeOriginalData, setValue, email, stateList]);

  // Load locality from original data if it is in the list, after localityList has loaded
  useEffect(() => {
    if (hasLoadedInfo) return;

    if (state && localityList) {
      const isLocalityInList = localityList.find(
        (loc) => loc.id === employeeOriginalData.address.locality.id
      );
      if (isLocalityInList)
        setValue('locality', employeeOriginalData.address.locality);
    }
  }, [employeeOriginalData, setValue, state, localityList, hasLoadedInfo]);

  // Load street from original data if it is in the list, after streetList has loaded
  useEffect(() => {
    if (hasLoadedInfo) return;

    if (locality && streetList) {
      const isStreetInList = streetList.find(
        (strt) => strt.id === employeeOriginalData.address.street.id
      );
      if (isStreetInList) {
        setValue('street', employeeOriginalData.address.street);
        setHasLoadedInfo(true);
      }
    }
  }, [employeeOriginalData, setValue, locality, streetList, hasLoadedInfo]);

  // Reset localities and streets if no state is selected
  useEffect(() => {
    if (!state) {
      setValue('locality', null);
      setValue('street', null);
      setLocalityList([]);
      setStreetList([]);
    }
  }, [state, setValue]);

  // Reset streets if no locality is selected
  useEffect(() => {
    if (!locality) {
      setValue('street', null);
      setStreetList([]);
    }
  }, [locality, setValue]);

  // Update lists when they have value
  useEffect(() => {
    if (localityAPIList) {
      setLocalityList(localityAPIList.data || []);
    }
    if (streetAPIList) {
      setStreetList(streetAPIList.data || []);
    }
  }, [localityAPIList, streetAPIList]);

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
            disabled={isLoading || !state}
            label="Localidad *"
            name="locality"
            options={localityList}
            placeholder={
              state
                ? 'Seleccione una opción'
                : 'Seleccione primero una Provincia'
            }
          />
        </Grid>
        <Grid item lg={4} sm={6} xs={12}>
          <ComboBoxInput
            className="w-full"
            control={control}
            disabled={isLoading || !locality}
            label="Calle *"
            name="street"
            options={streetList}
            placeholder={
              state
                ? 'Seleccione una opción'
                : 'Seleccione primero una Localidad'
            }
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
