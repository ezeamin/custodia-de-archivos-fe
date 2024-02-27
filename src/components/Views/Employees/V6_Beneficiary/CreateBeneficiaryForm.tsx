import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import Swal from 'sweetalert2';

import {
  getLocalitiesFn,
  getStatesFn,
  getStreetsFn,
  postBeneficiaryFn,
  putBeneficiaryFn,
} from '@/api/api-calls/employees';
import {
  getGenderOptionsFn,
  getRelationshipOptionsFn,
} from '@/api/api-calls/params';

import { useLoading, useZodForm } from '@/hooks';
import { useModal } from '@/stores/useModal';

import { Button, ComboBoxInput, Grid, TextInput } from '@/components/ui';

import {
  BeneficiaryFormSchema,
  beneficiaryFormSchema,
} from '@/form-schemas/schemas/employees/beneficiaryFormSchema';

import { BeneficiaryFormProps } from '@/components/interface/views';
import { BasicList } from '@/interface';

const CreateBeneficiaryForm = (props: BeneficiaryFormProps) => {
  const { beneficiaryOriginalData } = props;

  const { id: employeeId, lifeInsuranceId, beneficiaryId } = useParams();
  const navigate = useNavigate();
  const { closeModal } = useModal();

  const isEditing = !!beneficiaryOriginalData;

  // -------------------------------------------------
  // FORM & STATES
  // -------------------------------------------------

  const { control, onSubmitMiddleware, setValue, reset, watch } = useZodForm(
    beneficiaryFormSchema
  );

  const name = watch('name');
  const lastname = watch('lastname');
  const gender = watch('gender');
  const cuil = watch('cuil');
  const relationship = watch('relationship');
  const street = watch('street');
  const state = watch('state');
  const locality = watch('locality');
  const streetNumber = watch('streetNumber');
  const apt = watch('apt');
  const percentage = watch('percentage');
  const areAllMandatoryFieldsFilled =
    name &&
    lastname &&
    gender &&
    cuil &&
    relationship &&
    state &&
    street &&
    locality &&
    streetNumber &&
    percentage;

  // -------------------------------------------------
  // API
  // -------------------------------------------------

  const [isLoading, setIsLoading] = useState(false);
  const [hasLoadedInfo, setHasLoadedInfo] = useState(false);
  const [localityList, setLocalityList] = useState<BasicList[]>([]);
  const [streetList, setStreetList] = useState<BasicList[]>([]);

  const queryClient = useQueryClient();

  const {
    data: genderList,
    isLoading: genderListIsLoading,
    isError: genderListIsError,
    status: genderStatus,
  } = useQuery({
    queryKey: ['genderOptions'],
    queryFn: getGenderOptionsFn,
  });

  const {
    data: relationshipList,
    isLoading: relationshipListIsLoading,
    isError: relationshipListIsError,
    status: relationshipStatus,
  } = useQuery({
    queryKey: ['relationshipOptions'],
    queryFn: getRelationshipOptionsFn,
  });

  const {
    data: stateList,
    isLoading: stateListIsLoading,
    isError: stateListIsError,
    status: stateListStatus,
  } = useQuery({
    queryKey: ['states'],
    queryFn: getStatesFn,
  });

  const {
    data: localityAPIList,
    isLoading: localityListIsLoading,
    isError: localityListIsError,
    status: localityListStatus,
  } = useQuery({
    queryKey: [`localities_${state?.id || ''}`, !!state],
    queryFn: () => getLocalitiesFn(state?.id || ''),
    enabled: !!state,
  });

  const {
    data: streetAPIList,
    isLoading: streetListIsLoading,
    isError: streetListIsError,
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

  const { mutate: createBeneficiary } = useMutation({
    mutationFn: postBeneficiaryFn,
    onError: () => {
      setIsLoading(false);
    },
    onSuccess: (data) => {
      setIsLoading(false);

      if (data && data.message?.includes('Duplicate')) {
        const personData = data.data;
        if (personData) {
          Swal.fire({
            title: 'Atención',
            html: `Ya existe una persona registrada bajo el CUIL ${cuil} en el sistema.<br/><br/>
            Nombre: <b>${personData.lastname}, ${personData.name}</b><br/>
            ${personData.address ? `Dirección: <b>${personData.address}</b><br/>` : ''}
            <br/>De continuar, se registrará el beneficiario, y SOLO se actualizarán los datos faltantes (de haberlos).`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, continuar',
            cancelButtonText: 'Cancelar',
          }).then((res) => {
            if (res.isConfirmed) {
              setIsLoading(true);
              createBeneficiary({
                force: true,
                employeeId,
                lifeInsuranceId,
                genderId: gender.id,
                relationshipId: relationship.id,
                birthdate: new Date(0),
                cuil,
                name,
                lastname,
                street,
                locality,
                state,
                streetNumber,
                apt,
                percentage: Number(percentage), // in the case it comes as a string
              });
            }
          });
          return;
        }
      }

      reset();
      toast.success('Beneficiario agregado con éxito');
      queryClient.invalidateQueries({
        queryKey: ['employee', employeeId],
      });
      navigate(`/employees/${employeeId}/personal`);
      closeModal();
    },
  });

  const { mutate: editBeneficiary } = useMutation({
    mutationFn: putBeneficiaryFn,
    onError: () => {
      setIsLoading(false);
    },
    onSuccess: () => {
      setIsLoading(false);
      reset();
      toast.success('Información del beneficiario editada con éxito');
      queryClient.invalidateQueries({
        queryKey: ['beneficiary', beneficiaryOriginalData?.id],
      });
      queryClient.invalidateQueries({
        queryKey: ['employee', employeeId],
      });
      navigate(`/employees/${employeeId}/personal`);
      closeModal();
    },
  });

  useLoading(relationshipListIsLoading, relationshipStatus);
  useLoading(genderListIsLoading, genderStatus);
  useLoading(stateListIsLoading, stateListStatus);
  useLoading(localityListIsLoading, localityListStatus);
  useLoading(streetListIsLoading, streetListStatus);

  if (
    streetListIsError ||
    localityListIsError ||
    stateListIsError ||
    genderListIsError ||
    relationshipListIsError
  ) {
    toast.error(
      'Ocurrió un error cargando la información necesaria para completar el formulario. Reintente más tarde',
      {
        duration: 10000,
      }
    );
    navigate(`/employees/${employeeId}/personal`);
  }

  // -------------------------------------------------
  // HANDLERS
  // -------------------------------------------------

  const handleSubmit = (data: BeneficiaryFormSchema) => {
    setIsLoading(true);

    if (isEditing) {
      editBeneficiary({
        ...data,
        employeeId,
        lifeInsuranceId,
        beneficiaryId,
        genderId: data.gender.id,
        relationshipId: data.relationship.id,
        gender: undefined,
        relationship: undefined,
      });
    } else {
      createBeneficiary({
        ...data,
        employeeId,
        lifeInsuranceId,
        genderId: data.gender.id,
        relationshipId: data.relationship.id,
        gender: undefined,
        relationship: undefined,
      });
    }
  };

  // -------------------------------------------------
  // EFFECTS
  // -------------------------------------------------

  useEffect(() => {
    // if !name only to check if information has been loaded
    if (beneficiaryOriginalData && stateList && !name) {
      setValue('name', beneficiaryOriginalData.name);
      if (beneficiaryOriginalData.lastname)
        setValue('lastname', beneficiaryOriginalData.lastname);
      if (beneficiaryOriginalData.cuil)
        setValue('cuil', beneficiaryOriginalData.cuil);
      if (beneficiaryOriginalData.relationship)
        setValue('relationship', beneficiaryOriginalData.relationship);
      if (beneficiaryOriginalData.gender)
        setValue('gender', beneficiaryOriginalData.gender);
      if (beneficiaryOriginalData.address) {
        if (beneficiaryOriginalData.address.streetNumber)
          setValue(
            'streetNumber',
            beneficiaryOriginalData.address.streetNumber
          );
        if (beneficiaryOriginalData.address.apt)
          setValue('apt', beneficiaryOriginalData.address.apt);
        if (beneficiaryOriginalData.address.state)
          setValue('state', beneficiaryOriginalData.address.state);
        if (beneficiaryOriginalData.address.observations)
          setValue(
            'addressObservations',
            beneficiaryOriginalData.address.observations
          );
      }
      if (beneficiaryOriginalData.percentage)
        setValue('percentage', beneficiaryOriginalData.percentage);
    }
  }, [beneficiaryOriginalData, setValue, name, stateList]);

  // Load locality from original data if it is in the list, after localityList has loaded
  useEffect(() => {
    if (hasLoadedInfo) return;

    if (
      state &&
      localityList &&
      beneficiaryOriginalData &&
      beneficiaryOriginalData.address
    ) {
      const isLocalityInList = localityList.find(
        (loc) => loc.id === beneficiaryOriginalData.address?.locality.id
      );
      if (isLocalityInList)
        setValue('locality', beneficiaryOriginalData.address.locality);
    }
  }, [beneficiaryOriginalData, setValue, state, localityList, hasLoadedInfo]);

  // Load street from original data if it is in the list, after streetList has loaded
  useEffect(() => {
    if (hasLoadedInfo) return;

    if (
      locality &&
      streetList &&
      beneficiaryOriginalData &&
      beneficiaryOriginalData.address
    ) {
      const isStreetInList = streetList.find(
        (strt) => strt.id === beneficiaryOriginalData.address?.street.id
      );
      if (isStreetInList) {
        setValue('street', beneficiaryOriginalData.address.street);
        setHasLoadedInfo(true);
      }
    }
  }, [beneficiaryOriginalData, setValue, locality, streetList, hasLoadedInfo]);

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
        <Grid item lg={4} sm={6} xs={12}>
          <TextInput
            className="w-full"
            control={control}
            disabled={isLoading}
            label="Nombre *"
            name="name"
            placeholder="Juan"
          />
        </Grid>
        <Grid item lg={4} sm={6} xs={12}>
          <TextInput
            className="w-full"
            control={control}
            disabled={isLoading}
            label="Apellido *"
            name="lastname"
            placeholder="Perez"
          />
        </Grid>
        <Grid item lg={4} sm={6} xs={12}>
          <TextInput
            className="w-full"
            control={control}
            disabled={isLoading}
            label="CUIL (sin puntos) *"
            maxLength={8}
            name="cuil"
            placeholder="1234578"
          />
        </Grid>
        <Grid item lg={4} sm={6} xs={12}>
          <ComboBoxInput
            className="w-full"
            control={control}
            disabled={isLoading}
            label="Género *"
            name="gender"
            options={genderList?.data || []}
            placeholder="Seleccione una opción"
          />
        </Grid>
        <Grid item lg={4} sm={6} xs={12}>
          <ComboBoxInput
            className="w-full"
            control={control}
            disabled={isLoading}
            label="Parentesco *"
            name="relationship"
            options={relationshipList?.data || []}
            placeholder="Seleccione una opción"
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
        <Grid item lg={4} sm={6} xs={12}>
          <TextInput
            className="w-full"
            control={control}
            disabled={isLoading}
            helperText="Ingresar solo números, entre 0 y 100"
            label="Porcentaje"
            name="percentage"
            placeholder="100"
          />
        </Grid>
        <Grid item xs={12}>
          <TextInput
            className="w-full"
            control={control}
            disabled={isLoading}
            label="Observaciones de la dirección"
            name="addressObservations"
            placeholder="Manzana 3, Lote 4, Casa 5"
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
export default CreateBeneficiaryForm;
