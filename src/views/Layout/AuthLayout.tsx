import { Outlet } from 'react-router-dom';

import logoImg from '/img/logo.png';

import ThemeTogglerButton from '@/components/Menu/ThemeTogglerButton';

const AuthLayout = () => {
  return (
    <section className="flex md:flex-row">
      <main className="w-full px-10 md:px-12 lg:px-30 xl:px-40 h-[90vh] flex flex-col justify-center">
        <section>
          <article className="flex flex-col items-center text-center mb-10 md:mb-20">
            <img
              alt="Custodia de archivos"
              className="rounded-md mb-3 animate-in-bottom"
              src={logoImg}
              width={150}
            />
            <h1 className="text-2xl font-bold animate-in-bottom a-delay-100">
              Portal de Empleados
            </h1>
          </article>
          <Outlet />
          <div className="fixed top-[1rem] left-[1rem]">
            <ThemeTogglerButton className="bg-transparent dark:bg-transparent hover:bg-gray-400/50 shadow-none btn-ghost md:tooltip-right" />
          </div>
        </section>
      </main>
      <img
        alt="Custodia de archivos"
        className="login__img hidden md:block"
        height={900}
        src="https://ss-static-001.esmsv.com/r/content/host1/633b60a34364b636f824ec56dd5564c3/editor/IMG_5012.webp"
        width={900}
      />
    </section>
  );
};
export default AuthLayout;
