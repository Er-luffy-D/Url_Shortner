import { prisma } from "@/lib/prisma";
import RedirectClient from "./RedirectClient";

export default async function Page({
  params,
}: {
  params: { shorturl: string };
}) {
  const data = await prisma.link.findFirst({
    where: { shortCode: params.shorturl },
    select: { url: true },
  });

  if (!data?.url) {
    return <RedirectClient url="/Notfound" />;
  }

  return <RedirectClient url={data.url} />;
}