import { prisma } from "@/lib/prisma";
import RedirectClient from "./RedirectClient";

interface PageProps {
  params: {
    shorturl: string;
  };
}

export default async function Page({ params }: PageProps) {
  const data = await prisma.link.findFirst({
    where: { shortCode: params.shorturl },
    select: { url: true },
  });

  return <RedirectClient url={data?.url ?? "/Notfound"} />;
}
