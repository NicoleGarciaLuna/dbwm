import { Avatar, Typography, Card } from "antd";

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
  <Card className="mb-6">
    <div className="flex flex-col sm:flex-row items-center gap-4">
      <Avatar
        size={112}
        src={avatarSrc || "/logo TCU mujer pnjs-10.png"}
        alt={avatarSrc ? `${username}'s avatar` : "TCU Mujer Logo"}
      />
      <div className="text-center sm:text-left">
        <Typography.Title level={2} className="mb-1">
          {username || "Microempresaria"}
        </Typography.Title>
        <Typography.Text>
          {joinedDate
            ? `Miembro desde ${joinedDate}`
            : "Fecha de ingreso desconocida"}
        </Typography.Text>
      </div>
    </div>
  </Card>
);

export default ProfileHeader;
