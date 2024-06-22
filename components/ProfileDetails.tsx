import InputField from './InputField';
import Card from './Card';

type ProfileDetailsProps = {
  name: string;
  email: string;
  contact: string;
};

const ProfileDetails = ({ name, email, contact }: ProfileDetailsProps) => (
  <Card 
    title="Profile Details"
    action={
      <button className="px-4 py-2 font-medium text-white bg-blue-500 rounded-md">
        Update Profile
      </button>
    }
  >
    <div className="space-y-4">
      <InputField id="name" label="Name" defaultValue={name} />
      <InputField id="email" label="Email" defaultValue={email} type="email" />
      <InputField id="contact" label="Contact" defaultValue={contact} type="tel" />
    </div>
  </Card>
);

export default ProfileDetails;
