import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { title, description, price, date, time, contact, user } = req.body;

    // VALIDACIJA
    if (
      !title?.trim() ||
      !description?.trim() ||
      !contact?.trim() ||
      !user?.trim()
    ) {
      return res.status(400).json({ error: "Sva polja su obavezna." });
    }

    if (isNaN(price) || Number(price) <= 0) {
      return res
        .status(400)
        .json({ error: "Cijena mora biti broj veći od 0." });
    }

    // Možeš dodatno validirati format datuma/vremena ako želiš

    try {
      const newJob = await prisma.job.create({
        data: {
          title,
          description,
          price: Number(price),
          date,
          time,
          contact,
          user,
        },
      });

      return res.status(201).json(newJob);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Greška na serveru." });
    }
  }

  // GET - vrati sve poslove
  if (req.method === "GET") {
    const jobs = await prisma.job.findMany({ orderBy: { id: "desc" } });
    return res.status(200).json(jobs);
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(405).end(`Method ${req.method} not allowed`);
}
