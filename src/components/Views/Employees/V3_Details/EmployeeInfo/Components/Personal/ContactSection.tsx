import { FaPencil } from 'react-icons/fa6';
import { Link, useParams } from 'react-router-dom';

import EmployeeDataField from '../../EmployeeDataField';

import { Grid, Icon } from '@/components/ui';

import { PersonalProps } from '@/components/interface/views';

const ContactSection = (props: PersonalProps) => {
  const { data } = props;

  const { id: employeeId } = useParams();

  const formattedAddress = data?.address
    ? `${data?.address.street.description} ${data?.address.streetNumber}${
        data?.address.apt ? ` - Dpto. ${data?.address.apt}` : ''
      }, ${data?.address.locality.description}, ${
        data?.address.state.description
      }`
    : 'N/A';
  const formattedPhone = data?.phone
    ? data.phone.replace(/(\d{2})(\d{4})(\d{4})/, '+$1 $2-$3')
    : 'N/A';

  return (
    <article>
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-lg font-bold">Contacto</h2>
        <Link
          className="tooltip tooltip-left"
          data-tip="Editar"
          to={`/employees/${employeeId}/edit/contact`}
        >
          <Icon iconComponent={<FaPencil size="1em" />} title="Editar" />
        </Link>
      </div>
      <Grid container component="section" gap={2}>
        <Grid item xs={12}>
          <EmployeeDataField label="Email" value={data?.email} />
        </Grid>
        <Grid item lg={6} xs={12}>
          <EmployeeDataField label="Teléfono" value={formattedPhone} />
        </Grid>
        <Grid item className="hidden md:block" lg={6} xs={12}>
          <EmployeeDataField
            label="Ciudad"
            value={data?.address ? data?.address.locality.description : 'N/A'}
          />
        </Grid>
        <Grid item className="mb-1" xs={12}>
          <EmployeeDataField label="Dirección" value={formattedAddress} />
        </Grid>
      </Grid>
    </article>
  );
};
export default ContactSection;
