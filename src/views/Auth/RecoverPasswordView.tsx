import RecoverPassForm from '@/components/Views/Auth/V2_Recover/RecoverPassForm';

const RecoverPasswordView = () => {
  return (
    <>
      <h2 className="text-3xl animate-in-left a-delay-300">
        Recuperar contraseña
      </h2>
      <div className="divider mt-0 mb-1 animate-in-right a-delay-300" />
      <RecoverPassForm />;
    </>
  );
};
export default RecoverPasswordView;
