import { FaArrowDownLong, FaArrowRightLong } from 'react-icons/fa6';

import { Icon } from '@/components/ui';

import { NotificationInfoContentProps } from '@/components/interface/views';

const NotificationHeader = (props: NotificationInfoContentProps) => {
  const { data } = props;

  return (
    <section className="mt-5 card content-card animate-in-bottom">
      <article className="flex flex-col md:flex-row justify-between items-center gap-3">
        <div className="flex self-start md:self-auto md:flex-col lg:flex-row gap-3">
          <img
            alt={data.issuer.lastname}
            className="rounded-md w-14 h-14 sm:w-20 sm:h-20 lg:w-32 lg:h-32 object-cover"
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
        <div className="flex flex-row self-end md:flex-col-reverse items-end lg:flex-row md:self-auto gap-3">
          <div className="text-end">
            <h3 className="text-lg font-bold">{`${data.receiver.lastname}, ${data.receiver.firstname}`}</h3>
            <p className="text-sm">{data.receiver.email}</p>
          </div>
          <img
            alt={data.receiver.lastname}
            className="rounded-md w-14 h-14 sm:w-20 sm:h-20 lg:w-32 lg:h-32 object-cover"
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
