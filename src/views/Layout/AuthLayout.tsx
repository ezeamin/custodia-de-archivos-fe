import { Outlet } from 'react-router-dom';

import logoImg from '/img/logo.png';

import ThemeTogglerButton from '@/components/Menu/ThemeTogglerButton';

const AuthLayout = () => {
  return (
    <section className="flex md:flex-row">
      <main className="lg:px-30 flex h-[90vh] w-full flex-col justify-center px-10 md:px-12 xl:px-48">
        <section>
          <article className="mb-10 flex flex-col items-center text-center md:mb-20">
            <img
              alt="Custodia de archivos"
              className="animate-in-bottom mb-3 rounded-md"
              src={logoImg}
              width={150}
            />
            <h1 className="animate-in-bottom a-delay-100 text-2xl font-bold">
              Portal de Empleados
            </h1>
          </article>
          <Outlet />
          <div className="fixed left-[1rem] top-[1rem]">
            <ThemeTogglerButton className="btn-ghost bg-transparent shadow-none md:tooltip-right hover:bg-gray-400/50 dark:bg-transparent" />
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
