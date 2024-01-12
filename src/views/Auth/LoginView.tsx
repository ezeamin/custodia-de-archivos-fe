import LoginForm from '@/components/Views/Auth/V1_Login/LoginForm';

const LoginView = () => {
  return (
    <>
      <h2 className="text-3xl animate-in-left a-delay-300">Bienvenido</h2>
      <div className="divider mt-0 mb-1" />
      <LoginForm />
    </>
  );
};
export default LoginView;
