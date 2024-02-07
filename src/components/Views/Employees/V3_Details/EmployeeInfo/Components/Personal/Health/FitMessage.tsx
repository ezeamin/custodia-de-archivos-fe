import { FitMessageProps } from '@/components/interface/views';

const FitMessage = (props: FitMessageProps) => {
  const { data } = props;

  if (!data)
    return (
      <h3 className="mb-1 mt-3">
        Preocupacionales - Sin información de aptitud
      </h3>
    );

  return (
    <h3 className="mb-1 mt-3">
      Preocupacionales -{' '}
      {data.fit ? (
        <>
          <span className="mr-2 inline-block h-3 w-3 min-w-3 rounded-full bg-green-500" />
          Apto
        </>
      ) : (
        <>
          <span className="mr-2 inline-block h-3 w-3 min-w-3 rounded-full bg-red-500" />
          No Apto
        </>
      )}
    </h3>
  );
};
export default FitMessage;
