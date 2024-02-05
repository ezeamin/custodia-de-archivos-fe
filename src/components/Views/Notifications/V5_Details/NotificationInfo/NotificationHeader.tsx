import IssuerItem from './IssuerItem';
import ReceiverItem from './ReceiverItem';

import { Grid } from '@/components/ui';

import { NotificationInfoContentProps } from '@/components/interface/views';

const NotificationHeader = (props: NotificationInfoContentProps) => {
  const { data } = props;

  if (!('receivers' in data)) {
    return (
      <section className="content-card animate-in-bottom card mt-5">
        <h2 className="-mt-1 mb-2 text-xl font-bold">Emisor</h2>
        <IssuerItem data={data.issuer} />
      </section>
    );
  }

  return (
    <section className="content-card animate-in-bottom card mt-5">
      <h2 className="-mt-1 mb-2 text-xl font-bold">
        {data.receivers.length > 1 ? 'Destinatarios' : 'Destinatario'}
      </h2>
      <Grid container gap={3}>
        {data.receivers.map((receiver) => (
          <Grid item key={receiver.id} lg={6} md={12} sm={6} xs={12}>
            <ReceiverItem data={receiver} />
          </Grid>
        ))}
      </Grid>
    </section>
  );
};
export default NotificationHeader;
