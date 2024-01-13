import RecoverPassForm from '@/components/Views/Auth/V2_Recover/RecoverPassForm';

const RecoverPasswordView = () => {
  return (
    <>
      <h2 className="animate-in-left a-delay-300 text-3xl">
        Recuperar contraseña
      </h2>
      <div className="animate-in-right a-delay-300 divider mb-1 mt-0" />
      <RecoverPassForm />;
    </>
  );
};
export default RecoverPasswordView;
