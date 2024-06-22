import InputField from './InputField';

type ProfileDetailsProps = {
  name: string;
  email: string;
  contact: string;
};

const ProfileDetails = ({ name, email, contact }: ProfileDetailsProps) => (
  <div className="bg-white shadow-md rounded-lg p-6">
    <h2 className="text-xl font-semibold mb-4">Profile Details</h2>
    <div className="space-y-4">
      <InputField id="name" label="Name" defaultValue={name} />
      <InputField id="email" label="Email" defaultValue={email} type="email" />
      <InputField id="contact" label="Contact" defaultValue={contact} type="tel" />
    </div>
    <div className="mt-4 text-right">
      <button className="px-4 py-2 font-medium text-white bg-blue-500 rounded-md">
        Update Profile
      </button>
    </div>
  </div>
);

export default ProfileDetails;
