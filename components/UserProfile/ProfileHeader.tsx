import Image from "next/image";

type ProfileHeaderProps = {
  username: string;
  joinedDate: string;
};

const ProfileHeader = ({ username, joinedDate }: ProfileHeaderProps) => (
  <div className="flex flex-col sm:flex-row items-center gap-6 mb-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
    <div className="relative h-32 w-32 sm:h-40 sm:w-40">
      <Image
        src="/logo TCU mujer pnjs-10.png"
        alt="TCU Mujer Logo"
        className="h-full w-full object-contain"
        width={160}
        height={160}
      />
    </div>
    <div className="text-center sm:text-left">
      <h2 className="font-bold text-3xl mb-2">{username || 'Microempresaria'}</h2>
      <p className="text-gray-600 dark:text-gray-400">
        {joinedDate ? `Miembro desde ${joinedDate}` : 'Fecha de ingreso desconocida'}
      </p>
    </div>
  </div>
);

export default ProfileHeader;
