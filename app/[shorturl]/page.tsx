import { prisma } from "@/lib/prisma";
import RedirectClient from "./RedirectClient";
interface PageProps {
	params: Promise<{ shorturl: string }>;
}

export default async function Page({ params }: PageProps) {
	const { shorturl } = await params;
	const Url = decodeURIComponent(shorturl);
	try {
		const data = await prisma.link.findUnique({
			where: { shortCode: Url },
			select: { url: true },
		});

		if (!data?.url) {
			return <RedirectClient url="/Notfound" />;
		}

		await prisma.link.update({
			where: { shortCode: Url },
			data: {
				count: {
					increment: 1,
				},
			},
		});
		return <RedirectClient url={data.url} />;
	} catch (error) {
		console.error("Error fetching URL:", error);
		return <RedirectClient url="/Notfound" />;
	}
}
