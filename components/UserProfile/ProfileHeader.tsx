import Image from "next/image";

type ProfileHeaderProps = {
  username: string;
  joinedDate: string;
  avatarSrc: string;
};

const ProfileHeader = ({
  username,
  joinedDate,
  avatarSrc,
}: ProfileHeaderProps) => (
  <div className="flex flex-col sm:flex-row items-center gap-4 mb-6 bg-white dark:bg-primary-800 p-4 rounded-lg shadow-md">
    <div className="relative h-24 w-24 sm:h-28 sm:w-28">
      <Image
        src={avatarSrc || "/logo TCU mujer pnjs-10.png"}
        alt={avatarSrc ? `${username}'s avatar` : "TCU Mujer Logo"}
        className="h-full w-full object-contain"
        width={112}
        height={112}
      />
    </div>
    <div className="text-center sm:text-left">
      <h2 className="font-bold text-2xl mb-1 text-primary-800 dark:text-white">
        {username || "Microempresaria"}
      </h2>
      <p className="text-sm text-primary-800 dark:text-white">
        {joinedDate
          ? `Miembro desde ${joinedDate}`
          : "Fecha de ingreso desconocida"}
      </p>
    </div>
  </div>
);

export default ProfileHeader;
