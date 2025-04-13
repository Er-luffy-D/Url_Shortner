import { prisma } from "@/lib/prisma";
import RedirectClient from "./RedirectClient";

export default async function Page({ params }: { params: { shorturl: string } }) {
  const { shorturl } = await params;
  const data = await prisma.link.findFirst({
    where: { shortCode: shorturl },
    select: { url: true },
  });

  return <RedirectClient url={data?.url ?? "/Notfound"} />;
}
