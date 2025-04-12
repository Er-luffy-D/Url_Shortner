import { prisma } from "@/lib/prisma";
import RedirectClient from "./RedirectClient";

type PageProps = {
  params: {
    shorturl: string;
  };
};

export default async function Page({ params }: PageProps) {
  const shorturl = (await params).shorturl;

  const data = await prisma.link.findFirst({
    where: { shortCode: shorturl },
    select: { url: true },
  });

  return <RedirectClient url={data?.url ?? "/Notfound"} />;
}
