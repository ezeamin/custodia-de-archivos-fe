import { useLoadingState } from '@/stores/useLoadingState';

const Legend = () => {
  const { isLoading } = useLoadingState();

  if (isLoading) return null;

  return (
    <article className="hidden xl:flex gap-4">
      <p className="text-nowrap animate-in-bottom a-delay-200">
        <span className="bg-green-500 w-3 h-3 rounded-full inline-block mr-2" />
        <span>Activo</span>
      </p>
      <p className="text-nowrap animate-in-bottom a-delay-400">
        <span className="bg-orange-300 w-3 h-3 rounded-full inline-block mr-2" />
        <span>Suspendido</span>
      </p>
      <p className="text-nowrap animate-in-bottom a-delay-600">
        <span className="bg-red-500 w-3 h-3 rounded-full inline-block mr-2" />
        <span>De baja</span>
      </p>
    </article>
  );
};
export default Legend;
