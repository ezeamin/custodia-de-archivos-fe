import Title from '@/components/Common/Title'

const HomeView = () => {
  return (
    <>
      <Title title="Bienvenido" />
      <section className="vertically-centered">
        <p className="animate-in-bottom a-delay-200 max-w-[500px]">
          Bienvenido al <b>SAP (Sistema de Administración de Personal)</b> de
          Custodia de Archivos Noroeste SRL. Para comenzar, seleccione una
          opción del{' '}
          <span className="md:hidden">
            menu ubicado en la parte superior del sitio
          </span>
          <span className="hidden md:inline">panel lateral</span>.
        </p>
      </section>
    </>
  );
};
export default HomeView;
