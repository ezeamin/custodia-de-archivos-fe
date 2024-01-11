import { useEffect } from 'react';
import { IoMdClose } from 'react-icons/io';

import { toast } from 'sonner';

import { useModal } from '@/stores/useModal';
import { useObservation } from '@/stores/useObservation';

import { IconButton } from '@/components/ui';

import { ObservationsMessageProps } from '@/components/interface/views';

const ObservationsMessage = (props: ObservationsMessageProps) => {
  const { id: propId } = props;
  const { id, message, clearObservationData } = useObservation();
  const { opened } = useModal();

  const handleClose = () => {
    clearObservationData();
  };

  useEffect(() => {
    if (message && id === propId && !opened)
      toast.info('La observación se mostró encima de la tabla actual');
  }, [message, id, propId, opened]);

  if (!id || !message || id !== propId) return null;

  return (
    <section
      className="w-full border border-gray-300 dark:border-gray-600 p-3 mb-3 rounded-md flex items-center justify-between"
      id={id}
    >
      <p className="w-[90%]">
        <b>Observación seleccionada:</b> {message}
      </p>
      <IconButton
        className="self-start"
        iconComponent={<IoMdClose />}
        onClick={handleClose}
      />
    </section>
  );
};
export default ObservationsMessage;
