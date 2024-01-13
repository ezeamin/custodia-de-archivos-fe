import LoginForm from '@/components/Views/Auth/V1_Login/LoginForm';

const LoginView = () => {
  return (
    <>
      <h2 className="animate-in-left a-delay-300 text-3xl">Bienvenido</h2>
      <div className="animate-in-right a-delay-300 divider mb-1 mt-0" />
      <LoginForm />
    </>
  );
};
export default LoginView;
