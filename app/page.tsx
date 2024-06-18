import MicroentrepreneursList from "@/components/MicroentrepreneursList";
import { defaultData } from "@/data/defaultData";

export default function Home() {
	return (
		<div>
			<MicroentrepreneursList data={defaultData} />
		</div>
	);
}
