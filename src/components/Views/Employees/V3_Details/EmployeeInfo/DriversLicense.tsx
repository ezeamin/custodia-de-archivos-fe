import { IoWarning } from 'react-icons/io5';

import dayjs from 'dayjs';

import { Icon } from '@/components/ui';

import { DriversLicenseProps } from '@/components/interface/views';

const DriversLicense = (props: DriversLicenseProps) => {
  const { data, short = false } = props;

  if (!data)
    return (
      <div className="flex items-center">
        <Icon
          className="me-1 text-orange-400"
          iconComponent={<IoWarning />}
          title="Atención"
        />
        <p>N/A</p>
      </div>
    );

  const today = dayjs();
  const expirationDate = dayjs(data);

  if (expirationDate.isBefore(today)) {
    return (
      <div className="flex items-center">
        <Icon
          className="me-1 text-red-500"
          iconComponent={<IoWarning />}
          title="Atención"
        />
        <p>Vencido</p>
      </div>
    );
  }

  // If is a month away from expiration
  if (expirationDate.diff(today, 'month') <= 1) {
    return (
      <div className="flex items-center">
        <Icon
          className="me-1 text-orange-500"
          iconComponent={<IoWarning />}
          title="Atención"
        />
        <p>Por vencer</p>
      </div>
    );
  }

  return (
    <div className="flex items-center">
      <span className="mr-2 inline-block h-3 w-3 min-w-3 rounded-full bg-green-500" />
      <p>
        Vigente {!short && `- Vence: ${expirationDate.format('DD/MM/YYYY')}`}
      </p>
    </div>
  );
};
export default DriversLicense;
