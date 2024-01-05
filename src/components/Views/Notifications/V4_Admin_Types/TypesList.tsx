import { useQuery } from '@tanstack/react-query';

import { getNotificationTypes } from '@/api/api-calls/notifications';

const TypesList = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['notificationTypes'],
    queryFn: getNotificationTypes,
  });

  console.log(data, isLoading, isError);

  return <section className="mt-4">TypesList</section>;
};
export default TypesList;
