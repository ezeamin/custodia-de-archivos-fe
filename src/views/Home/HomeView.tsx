import { usePortrait } from '@/hooks';

import Title from '@/components/Common/Title';

const HomeView = () => {
  const isPortrait = usePortrait();

  return (
    <>
      <Title title="Bienvenido" />
      <section className="vertically-centered">
        <p className="font-thin max-w-[500px]">
          Bienvenido al SAP (Sistema de Administración de Usuarios) de Custodia
          de Archivos Noroeste SRL. Para comenzar, selecciona una opción del
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
