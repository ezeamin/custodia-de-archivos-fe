import { useLoadingState } from '@/stores/useLoadingState';

const Legend = () => {
  const { isLoading } = useLoadingState();

  if (isLoading) return null;

  return (
    <article className="hidden gap-4 xl:flex">
      <p className="animate-in-bottom a-delay-200 text-nowrap">
        <span className="mr-2 inline-block h-3 w-3 rounded-full bg-green-500" />
        <span>Activo</span>
      </p>
      <p className="animate-in-bottom a-delay-400 text-nowrap">
        <span className="mr-2 inline-block h-3 w-3 rounded-full bg-orange-300" />
        <span>Suspendido</span>
      </p>
      <p className="animate-in-bottom a-delay-600 text-nowrap">
        <span className="mr-2 inline-block h-3 w-3 rounded-full bg-red-500" />
        <span>De baja</span>
      </p>
    </article>
  );
};
export default Legend;
