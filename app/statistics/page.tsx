"use client";
import { useState } from "react";
import TabsComponent from "@/features/statistics/components/Tab";
import { CATEGORY_TABS } from "@/shared/config/endpoints";
import { useStatistics } from "@/features/statistics/hooks/useStatistics";

const Statistics = () => {
	const [activeTab, setActiveTab] = useState(CATEGORY_TABS[0].value);
	const { loading, data: rawData } = useStatistics(activeTab);

	const handleTabChange = (key: string) => {
		setActiveTab(key);
	};

	return (
		<TabsComponent
			loading={loading}
			tabs={CATEGORY_TABS}
			data={rawData}
			onTabChange={handleTabChange}
			activeTab={activeTab}
		/>
	);
};

export default Statistics;
