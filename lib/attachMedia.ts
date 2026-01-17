import { Media, MediaTable } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";

export async function attachMedia<T extends { id: number }>(
  items: T[],
  mediaTable: MediaTable,
) {
  if (items.length === 0) {
    return items.map((i) => ({ ...i, media: [] as Media[] }));
  }

  const media = await prisma.media.findMany({
    where: {
      mediaTable,
      entityId: { in: items.map((i) => i.id) },
    },
  });

  const mediaMap = new Map<number, Media[]>();

  for (const m of media) {
    if (!mediaMap.has(m.entityId)) {
      mediaMap.set(m.entityId, []);
    }
    mediaMap.get(m.entityId)!.push(m);
  }

  return items.map((item) => ({
    ...item,
    media: mediaMap.get(item.id) ?? [],
  }));
}
