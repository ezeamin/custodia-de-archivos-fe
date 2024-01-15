import ResetPassForm from '@/components/Views/Auth/V3_Reset/ResetPassForm';

const ResetPasswordView = () => {
  return (
    <>
      <h2 className="animate-in-left a-delay-300 text-3xl">
        Cambiar contraseña
      </h2>
      <div className="animate-in-right a-delay-300 divider mb-1 mt-0" />
      <ResetPassForm />
    </>
  );
};
export default ResetPasswordView;
