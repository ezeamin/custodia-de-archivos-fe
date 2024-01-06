import { FaPaperclip } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

import dayjs from 'dayjs';

import { useModal } from '@/stores/useModal';

import { Button, Grid } from '@/components/ui';

import { paths } from '@/constants/routes/paths';

import { NotificationInfoContentProps } from '@/components/interface/views';

const NotificationBody = (props: NotificationInfoContentProps) => {
  const { data } = props;

  const { openModal } = useModal();

  const formattedDate = dayjs(data.date).format('DD/MM/YYYY - HH:mm:ss');

  const handleClick = () => {
    openModal();
  };

  return (
    <section className="card content-card mt-3">
      <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row justify-between">
        <h2 className="text-xl font-bold">{data.type.description}</h2>
        <p className="text-lg">{formattedDate}</p>
      </div>
      <div className="rounded-md p-4 bg-gray-200 dark:bg-gray-700 border dark:border-gray-500 mt-3">
        <p>{data.message}</p>
      </div>
      <Grid container className="mt-3" gap={2}>
        {!!data?.files?.length && (
          <Grid item sm={6} xs={12}>
            <Button
              outlineButton
              className="w-full"
              colorLight="btn-primary"
              startIcon={<FaPaperclip />}
              onClick={handleClick}
            >
              Ver adjuntos
            </Button>
          </Grid>
        )}
        <Grid item sm={data?.files?.length ? 6 : 12} xs={12}>
          <Link
            className="btn btn-primary text-white w-full"
            to={`${paths.NOTIFICATIONS.CREATE}?type=response&receiverId=${data.receiver.id}`}
          >
            RESPONDER
          </Link>
        </Grid>
      </Grid>
    </section>
  );
};
export default NotificationBody;
