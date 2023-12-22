import { Button } from '@/components/ui';

const FALLBACK =
  'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png';
const user = {
  name: '',
  profilePicture: '',
};

const ProfileAvatar = (): JSX.Element => {
  // TODO: To be defined when user creates avatar (if ever)
  // const { user } = useAuth();

  return (
    <Button
      className="avatar w-12 p-0 rounded-full"
      colorDark="dark:btn-neutral"
      colorLight="btn-ghost"
    >
      <div className="rounded-full w-12 h-12">
        <img
          alt={user.name || 'Avatar photo'}
          height={100}
          src={user.profilePicture || FALLBACK}
          width={100}
        />
      </div>
    </Button>
  );
};
export default ProfileAvatar;
