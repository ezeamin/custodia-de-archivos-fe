import { IssuerItemProps } from '@/components/interface/views';

const IssuerItem = (props: IssuerItemProps) => {
  const { data } = props;

  return (
    <article className="flex gap-2">
      <img
        alt={data.lastname}
        className="h-[100px] w-[100px] rounded-md object-cover"
        height={100}
        src={data.imgSrc}
        width={100}
      />
      <div>
        <h3 className="text-xl">{`${data.lastname}, ${data.firstname}`}</h3>
        <p>{data.email}</p>
      </div>
    </article>
  );
};
export default IssuerItem;
