import "../globals.css";
import LayoutComponent from "@/shared/components/Layout";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <LayoutComponent>{children}</LayoutComponent>;
}
