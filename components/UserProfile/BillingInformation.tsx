import InputField from '../InputField';
import Card from '../Card';

type BillingInformationProps = {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
};

const BillingInformation = ({ cardNumber, expiryDate, cvv }: BillingInformationProps) => (
  <Card 
    title="Billing Information"
    action={
      <button className="px-4 py-2 font-medium text-white bg-blue-500 rounded-md">
        Update Billing
      </button>
    }
  >
    <div className="space-y-4">
      <InputField id="card" label="Card Number" defaultValue={cardNumber} />
      <InputField id="expiry" label="Expiry Date" defaultValue={expiryDate} />
      <InputField id="cvv" label="CVV" defaultValue={cvv} type="password" />
    </div>
  </Card>
);

export default BillingInformation;
