import { prisma } from "@/lib/prisma";
import RedirectClient from "./RedirectClient";

export default async function Page({ params }: { params: { shorturl: string } }) {
  const data = await prisma.link.findFirst({
    where: { shortCode: params.shorturl },
    select: { url: true },
  });

  return <RedirectClient url={data?.url ?? "/Notfound"} />;
}
