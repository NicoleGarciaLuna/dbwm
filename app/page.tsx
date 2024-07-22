"use client";
import { StyleProvider } from "@ant-design/cssinjs";
import type { AppProps } from "next/app";
import MicroentrepreneursList from "@/features/microentrepreneurs/components/List";
import React from "react";

import "../public/antd.min.css";
import "./globals.css";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<StyleProvider hashPriority="high">
			<MicroentrepreneursList />;
		</StyleProvider>
	);
}
