import { useParams } from 'react-router-dom';

import AreaReceiverItem from './AreaReceiverItem';
import { useQuery } from '@tanstack/react-query';

import { getNotificationAreaReceiversFn } from '@/api/api-calls/notifications';

import { useModal } from '@/stores/useModal';

import ErrorMessage from '@/components/Error/ErrorMessage';
import { Grid, Modal } from '@/components/ui';

import { ModalNotificacionAreaReceiver } from '@/components/interface/views';

const AreaReceiversModal = () => {
  const params = useParams();
  const { id: notificationId } = params;

  const {
    data: modalData,
    opened,
    modalId,
  } = useModal() as ModalNotificacionAreaReceiver;

  // -------------------------------------------------
  // API
  // -------------------------------------------------

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['notificationAreaReceivers', notificationId, modalData?.areaId],
    queryFn: () =>
      getNotificationAreaReceiversFn({
        notificationId: notificationId!,
        areaId: modalData?.areaId,
      }),
    enabled: opened && modalId === 'receiversModal',
  });

  // -------------------------------------------------
  // HANDLERS
  // -------------------------------------------------

  const handleRetry = () => {
    refetch();
  };

  // -------------------------------------------------
  // RENDER
  // -------------------------------------------------

  return (
    <Modal id="receiversModal" title="Receptores">
      {isError && <ErrorMessage className="mb-3" refetch={handleRetry} />}
      {isLoading && <p>Cargando...</p>}
      {data?.data && (
        <Grid container className="overflow-x-hidden" gap={3}>
          {data.data?.map((receiver) => (
            <Grid item key={receiver.id} md={6} xs={12}>
              <AreaReceiverItem receiver={receiver} />
            </Grid>
          ))}
        </Grid>
      )}
    </Modal>
  );
};
export default AreaReceiversModal;
