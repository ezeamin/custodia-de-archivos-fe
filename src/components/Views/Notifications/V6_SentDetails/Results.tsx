import { useNavigate, useParams } from 'react-router-dom';

import NotificationInfo from '../V5_Details/NotificationInfo/NotificationInfo';
import { useQuery } from '@tanstack/react-query';

import { getSentNotificationFn } from '@/api/api-calls/notifications';

import { useLoading } from '@/hooks';

import ErrorMessage from '@/components/Error/ErrorMessage';

import { uuidRegex } from '@/constants/regex/regex';
import { paths } from '@/constants/routes/paths';

const Results = () => {
  const params = useParams();
  const { id: notificationId } = params;

  const navigate = useNavigate();

  if (!notificationId || !uuidRegex.test(notificationId)) {
    navigate(paths.NOTIFICATIONS.MAIN);
  }

  // -------------------------------------------------
  // API
  // -------------------------------------------------

  const { data, isLoading, isError, refetch, status } = useQuery({
    queryKey: ['sentNotification', notificationId],
    queryFn: () => getSentNotificationFn(notificationId!),
  });

  useLoading(isLoading, status);

  // -------------------------------------------------
  // HANDLERS
  // -------------------------------------------------

  const handleRetry = () => {
    refetch();
  };

  // -------------------------------------------------
  // RENDER
  // -------------------------------------------------

  if (isError) {
    return <ErrorMessage refetch={handleRetry} />;
  }

  if (data?.data) {
    return <NotificationInfo sent data={data.data} />;
  }

  return null;
};
export default Results;
