import Layout from "@/components/Layout/Layout";
import MicroentrepreneursList from "@/components/MicroentrepreneursList/MicroentrepreneursList";
import { defaultData } from "@/data/defaultData";

export default function Home() {
  return (
    <Layout>
      <div>
        <MicroentrepreneursList data={defaultData} />
      </div>
    </Layout>
  );
}
