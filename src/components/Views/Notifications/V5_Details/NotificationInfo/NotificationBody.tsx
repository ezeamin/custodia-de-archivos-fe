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
    openModal('filesModal');
  };

  return (
    <section className="content-card animate-in-bottom a-delay-300 card mt-3">
      <div className="flex flex-col justify-between sm:flex-row md:flex-col lg:flex-row">
        <h2 className="text-xl font-bold">{data.type.description}</h2>
        <p className="text-lg">{formattedDate}</p>
      </div>
      <div className="mt-3 rounded-md border bg-gray-200 p-4 dark:border-gray-500 dark:bg-gray-700">
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
            className="btn btn-primary w-full text-white"
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
