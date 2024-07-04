import Layout from "@/components/Layout/LayoutComponent";
import MicroentrepreneursList from "@/components/MicroentrepreneursList/List";
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
