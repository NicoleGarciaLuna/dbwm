import InputField from './InputField';

type BillingInformationProps = {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
};

const BillingInformation = ({ cardNumber, expiryDate, cvv }: BillingInformationProps) => (
  <div className="bg-white shadow-md rounded-lg p-6">
    <h2 className="text-xl font-semibold mb-4">Billing Information</h2>
    <div className="space-y-4">
      <InputField id="card" label="Card Number" defaultValue={cardNumber} />
      <InputField id="expiry" label="Expiry Date" defaultValue={expiryDate} />
      <InputField id="cvv" label="CVV" defaultValue={cvv} type="password" />
    </div>
    <div className="mt-4 text-right">
      <button className="px-4 py-2 font-medium text-white bg-blue-500 rounded-md">
        Update Billing
      </button>
    </div>
  </div>
);

export default BillingInformation;
