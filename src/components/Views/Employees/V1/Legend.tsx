const Legend = () => {
  return (
    <article className="hidden xl:flex gap-4">
      <p className="text-nowrap">
        <span className="bg-green-500 w-3 h-3 rounded-full inline-block mr-2" />
        <span className="font-light">Activo</span>
      </p>
      <p className="text-nowrap">
        <span className="bg-orange-300 w-3 h-3 rounded-full inline-block mr-2" />
        <span className="font-light">Suspendido</span>
      </p>
      <p className="text-nowrap">
        <span className="bg-red-500 w-3 h-3 rounded-full inline-block mr-2" />
        <span className="font-light">De baja</span>
      </p>
    </article>
  );
};
export default Legend;
