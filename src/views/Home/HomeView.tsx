import { usePortrait } from '@/hooks';

import Title from '@/components/Common/Title';

const HomeView = () => {
  const isPortrait = usePortrait();

  return (
    <>
      <Title title="Bienvenido" />
      <section className="vertically-centered">
        <p className="max-w-[500px] animate-in-bottom a-delay-200">
          Bienvenido al <b>SAP (Sistema de Administración de Personal)</b> de
          Custodia de Archivos Noroeste SRL. Para comenzar, seleccione una
          opción del
          {isPortrait
            ? ' menu ubicado en la parte superior del sitio'
            : ' panel lateral'}
          .
        </p>
      </section>
    </>
  );
};
export default HomeView;
