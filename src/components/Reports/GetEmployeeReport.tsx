import { useState } from 'react';
import { FaFileExcel } from 'react-icons/fa';

import { Button, Icon } from '../ui';
import { useMutation } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { toast } from 'sonner';

import { getEmployeesReportFn } from '@/api/api-calls/employees';

const GetEmployeeReport = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { mutate: getEmployeesReport } = useMutation({
    mutationFn: getEmployeesReportFn,
    onError: () => {
      setIsLoading(false);
    },
    onSuccess: (res) => {
      // res comes as blob, download it
      setIsLoading(false);

      toast.success('Reporte creado correctamente. Descargando...');

      const today = dayjs().format('YYYYMMDDHHmmss');

      const url = window.URL.createObjectURL(new Blob([res]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `reporte_empleados_${today}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    },
  });

  const handleClick = () => {
    setIsLoading(true);
    getEmployeesReport();
  };

  return (
    <Button
      className="h-full md:h-auto"
      colorLight="btn-neutral"
      disabled={isLoading}
      textColorLight="text-white"
      onClick={handleClick}
    >
      {isLoading ? (
        <span className="loading loading-spinner loading-sm" />
      ) : (
        <Icon iconComponent={<FaFileExcel />} title="Descargar" />
      )}
    </Button>
  );
};
export default GetEmployeeReport;
