import { prisma } from "@/lib/prisma";
import RedirectClient from "./RedirectClient";

interface PageProps {
  params: {
    shorturl: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Page({ params }: PageProps) {
  try {
    const data = await prisma.link.findUnique({
      where: { shortCode: params.shorturl },
      select: { url: true },
    });

    if (!data?.url) {
      return <RedirectClient url="/Notfound" />;
    }

    return <RedirectClient url={data.url} />;
  } catch (error) {
    console.error("Error fetching URL:", error);
    return <RedirectClient url="/Notfound" />;
  }
}
