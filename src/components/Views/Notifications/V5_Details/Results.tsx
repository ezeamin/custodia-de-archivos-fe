import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { mockedData } from './mocked';
import NotificationInfo from './NotificationInfo/NotificationInfo';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

import {
  getNotificationFn,
  putReadNotificationFn,
} from '@/api/api-calls/notifications';

import { useLoading } from '@/hooks';

import ErrorMessage from '@/components/Error/ErrorMessage';

import { uuidRegex } from '@/constants/regex/regex';
import { paths } from '@/constants/routes/paths';

const data = mockedData;
const isError = false;
const isLoading = false;

const Results = () => {
  const params = useParams();
  const { id: notificationId } = params;

  const navigate = useNavigate();
  const [markedAsRead, setMarkedAsRead] = useState(false);
  const [isLoadingReadNotification, setIsLoadingReadNotification] =
    useState(false);

  if (!notificationId || !uuidRegex.test(notificationId)) {
    navigate(paths.NOTIFICATIONS.MAIN);
  }

  // -------------------------------------------------
  // API
  // -------------------------------------------------

  const { /* data, isLoading, isError, */ refetch, status } = useQuery({
    queryKey: [`notification_${notificationId}`],
    queryFn: () => getNotificationFn(notificationId!),
  });

  const { mutate: readNotification } = useMutation({
    mutationFn: () => putReadNotificationFn(notificationId!),
    onError: () => {
      setIsLoadingReadNotification(false);
      toast.error('Ocurrió un error al marcar la notificación como leída');
    },
    onSuccess: () => {
      setIsLoadingReadNotification(false);
      setMarkedAsRead(true);
    },
  });

  useLoading(isLoading, status);

  // -------------------------------------------------
  // HANDLERS
  // -------------------------------------------------

  const handleRetry = () => {
    refetch();
  };

  // -------------------------------------------------
  // EFFECTS
  // -------------------------------------------------

  useEffect(() => {
    if (data && !data.data.hasBeenRead) {
      setIsLoadingReadNotification(true);
      readNotification();
    }
  }, [data, readNotification]);

  // -------------------------------------------------
  // RENDER
  // -------------------------------------------------

  if (isError) {
    return <ErrorMessage refetch={handleRetry} />;
  }

  if (data?.data) {
    return (
      <NotificationInfo
        data={data.data}
        isLoadingRead={isLoadingReadNotification}
        showReadAlert={markedAsRead}
      />
    );
  }

  return null;
};
export default Results;
