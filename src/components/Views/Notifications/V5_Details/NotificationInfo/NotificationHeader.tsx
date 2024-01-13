import { FaArrowDownLong, FaArrowRightLong } from 'react-icons/fa6';

import { Icon } from '@/components/ui';

import { NotificationInfoContentProps } from '@/components/interface/views';

const NotificationHeader = (props: NotificationInfoContentProps) => {
  const { data } = props;

  return (
    <section className="content-card animate-in-bottom card mt-5">
      <article className="flex flex-col items-center justify-between gap-3 md:flex-row">
        <div className="flex gap-3 self-start md:flex-col md:self-auto lg:flex-row">
          <img
            alt={data.issuer.lastname}
            className="h-14 w-14 rounded-md object-cover sm:h-20 sm:w-20 lg:h-32 lg:w-32"
            height={128}
            src={data.issuer.imgSrc}
            width={128}
          />
          <div>
            <h3 className="text-lg font-bold">{`${data.issuer.lastname}, ${data.issuer.firstname}`}</h3>
            <p className="text-sm">{data.issuer.email}</p>
          </div>
        </div>
        <Icon
          className="hidden sm:block"
          iconComponent={<FaArrowRightLong size="1.75em" />}
          title="Envia a"
        />
        <Icon
          className="sm:hidden"
          iconComponent={<FaArrowDownLong size="1.75em" />}
          title="Envia a"
        />
        <div className="flex flex-row items-end gap-3 self-end md:flex-col-reverse md:self-auto lg:flex-row">
          <div className="text-end">
            <h3 className="text-lg font-bold">{`${data.receiver.lastname}, ${data.receiver.firstname}`}</h3>
            <p className="text-sm">{data.receiver.email}</p>
          </div>
          <img
            alt={data.receiver.lastname}
            className="h-14 w-14 rounded-md object-cover sm:h-20 sm:w-20 lg:h-32 lg:w-32"
            height={128}
            src={data.receiver.imgSrc}
            width={128}
          />
        </div>
      </article>
    </section>
  );
};
export default NotificationHeader;
