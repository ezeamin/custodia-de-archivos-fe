import { useParams } from 'react-router-dom';

import ContactSection from '../Components/Personal/ContactSection';
import FamilySection from '../Components/Personal/FamilySection';
import HealthSection from '../Components/Personal/HealthSection';
import PersonalSection from '../Components/Personal/PersonalSection';
import { useQuery } from '@tanstack/react-query';

import { getEmployeeFn } from '@/api/api-calls/employees';

const EmployeePersonalTab = () => {
  const { id: employeeId } = useParams();

  const { data } = useQuery({
    queryKey: ['employee', employeeId],
    queryFn: () => getEmployeeFn(employeeId!),
  });

  if (!data) return null;

  return (
    <>
      <PersonalSection data={data?.data} />
      <div className="divider" />
      <ContactSection data={data?.data} />
      <div className="divider" />
      <FamilySection data={data?.data} />
      <div className="divider" />
      <HealthSection data={data?.data} />
    </>
  );
};
export default EmployeePersonalTab;
