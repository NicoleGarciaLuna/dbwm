import Image from "next/image";

type ProfileHeaderProps = {
  avatarSrc: string;
  username: string;
  joinedDate: string;
};

const ProfileHeader = ({ avatarSrc, username, joinedDate }: ProfileHeaderProps) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="relative h-24 w-24">
      <Image
        src={avatarSrc}
        alt={`${username || 'User'} avatar`}
        className="h-full w-full rounded-full object-cover"
        width={50}
        height={50}
      />
      <div className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded-full">
        {username ? username.charAt(0) : '?'}
      </div>
    </div>
    <div className="grid gap-0.5 text-xs">
      <div className="font-medium text-2xl">{username || 'Unknown User'}</div>
      <div className="text-gray-500 dark:text-gray-400">
        {joinedDate ? `Joined in ${joinedDate}` : 'Join date unknown'}
      </div>
    </div>
  </div>
);

export default ProfileHeader;
