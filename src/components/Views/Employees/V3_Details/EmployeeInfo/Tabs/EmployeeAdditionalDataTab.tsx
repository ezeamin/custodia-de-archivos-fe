import Absenses from '../Components/AdditionalData/Absences/Results';
import FormalWarnings from '../Components/AdditionalData/FormalWarnings/Results';
import LateArrivals from '../Components/AdditionalData/LateArrivals/Results';
import Licences from '../Components/AdditionalData/Licenses/Results';
import Trainings from '../Components/AdditionalData/Trainings/Results';
import Vacations from '../Components/AdditionalData/Vacations/Results';

const EmployeeAdditionalDataTab = () => {
  return (
    <>
      <Absenses />
      <div className="divider" />
      <LateArrivals />
      <div className="divider" />
      <Licences />
      <div className="divider" />
      <Vacations />
      <div className="divider" />
      <FormalWarnings />
      <div className="divider" />
      <Trainings />
    </>
  );
};
export default EmployeeAdditionalDataTab;
