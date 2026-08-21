import { MediaTable, MediaType, UserRole } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";
import { BASE_DIR, saveFile } from "@/lib/upload";
import path from "path";
import slugify from "slugify";

const activities = [
  {
    title: "Peluncuran Layanan Internet Dedicated untuk Segmen Enterprise",
    category: "Perusahaan",
    content:
      "Kami dengan bangga mengumumkan peluncuran layanan Internet Dedicated terbaru yang dirancang khusus untuk kebutuhan bisnis skala menengah hingga besar. Layanan ini menawarkan bandwidth simetris, SLA uptime 99.9%, serta dukungan teknis 24/7 untuk memastikan operasional bisnis pelanggan berjalan tanpa gangguan.",
  },
  {
    title: "Ekspansi Jaringan Fiber Optik ke 5 Kota Baru",
    category: "Infrastruktur",
    content:
      "Sebagai bagian dari komitmen kami memperluas jangkauan layanan, pembangunan infrastruktur fiber optik kini telah mencapai 5 kota baru. Ekspansi ini diharapkan dapat menjangkau lebih dari 10.000 rumah dan bisnis baru dalam enam bulan ke depan.",
  },
  {
    title: "Pelatihan Rutin Teknisi Lapangan: Standar Keselamatan Kerja",
    category: "Internal",
    content:
      "Divisi Teknis mengadakan pelatihan rutin bagi seluruh teknisi lapangan mengenai standar keselamatan kerja (K3) dalam instalasi dan pemeliharaan jaringan. Pelatihan ini bertujuan untuk meningkatkan kualitas layanan sekaligus menjaga keselamatan tim di lapangan.",
  },
  {
    title: "Kolaborasi dengan Pemerintah Daerah dalam Program Desa Digital",
    category: "Kemitraan",
    content:
      "Kami menjalin kerja sama dengan pemerintah daerah untuk mendukung program Desa Digital, menghadirkan akses internet terjangkau bagi masyarakat di wilayah pedesaan guna mendorong pemerataan akses informasi dan pertumbuhan ekonomi digital.",
  },
  {
    title: "Peningkatan Kapasitas Data Center untuk Layanan Colocation",
    category: "Infrastruktur",
    content:
      "Guna memenuhi permintaan layanan colocation dan dedicated server yang terus meningkat, kami melakukan peningkatan kapasitas data center dengan tambahan rak server, sistem pendingin baru, serta redundansi daya listrik ganda.",
  },
  {
    title: "Kampanye Kesadaran Keamanan Siber bagi Pelanggan Bisnis",
    category: "Edukasi",
    content:
      "Bekerja sama dengan tim keamanan sistem, kami mengadakan webinar edukasi bagi pelanggan bisnis mengenai praktik terbaik keamanan siber, termasuk konfigurasi firewall, VPN, dan pengelolaan IoT yang aman.",
  },
  {
    title: "Program Tanggung Jawab Sosial: Donasi Perangkat Belajar Daring",
    category: "CSR",
    content:
      "Sebagai bentuk kepedulian sosial, kami mendonasikan perangkat komputer dan akses internet gratis kepada beberapa sekolah di daerah terpencil untuk mendukung kegiatan belajar mengajar secara daring.",
  },
  {
    title: "Migrasi Sistem Manajemen Jaringan ke Platform Baru",
    category: "Internal",
    content:
      "Tim IT internal menyelesaikan migrasi sistem manajemen jaringan (NMS) ke platform yang lebih modern, memungkinkan pemantauan jaringan secara real-time dan respons yang lebih cepat terhadap gangguan layanan.",
  },
];

async function seedAdmin() {
  await prisma.user.upsert({
    where: { username: "administrator" },
    update: {},
    create: {
      fullName: "Administrator",
      username: "administrator",
      role: UserRole.ADMIN,
    },
  });

  console.log("Admin user created");
}

async function seedActivityImage(slug: string, activityId: number) {
  const existing = await prisma.media.findFirst({
    where: {
      mediaTable: MediaTable.ACTIVITY,
      entityId: activityId,
      mediaType: MediaType.IMAGE,
    },
  });
  if (existing) return;

  // Lorem Picsum stub image, seeded by slug so it's stable across reseeds.
  const res = await fetch(`https://picsum.photos/seed/${slug}/1200/800`);
  if (!res.ok) {
    console.warn(`Skipping image for "${slug}": fetch failed (${res.status})`);
    return;
  }

  const buffer = Buffer.from(await res.arrayBuffer());
  const file = new File([buffer], `${slug}.jpg`, { type: "image/jpeg" });

  const dir = path.join(BASE_DIR, MediaTable.ACTIVITY.toLowerCase());
  const saved = await saveFile({ baseDir: dir, file });

  await prisma.media.create({
    data: {
      entityId: activityId,
      url: `/media/${MediaTable.ACTIVITY.toLowerCase()}/${saved.filename}`,
      filename: saved.filename,
      mimeType: saved.mimeType,
      size: saved.size,
      mediaTable: MediaTable.ACTIVITY,
      mediaType: MediaType.IMAGE,
      description: "Seed stub image",
    },
  });
}

async function seedActivities() {
  for (const activity of activities) {
    const slug = slugify(activity.title, { lower: true, strict: true });

    const record = await prisma.activity.upsert({
      where: { slug },
      update: {
        title: activity.title,
        category: activity.category,
        content: activity.content,
      },
      create: {
        title: activity.title,
        category: activity.category,
        content: activity.content,
        slug,
      },
    });

    await seedActivityImage(slug, record.id);
  }

  console.log(`Seeded ${activities.length} activities`);
}

async function main() {
  await seedAdmin();
  await seedActivities();
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })