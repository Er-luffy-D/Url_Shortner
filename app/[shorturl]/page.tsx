import { PrismaClient } from "@/lib/generated/prisma";
import RedirectClient from "./RedirectClient"; // <- new file

export default async function Page({ params }: { params: { shorturl: string } }) {
  const client = new PrismaClient();
  const shorturl = (await params).shorturl;

  const data = await client.link.findFirst({
    where: { shortCode: shorturl },
    select: { url: true },
  });
  console.log(data);
  return <RedirectClient url={data?.url ?? "/Notfound"} />;
}
