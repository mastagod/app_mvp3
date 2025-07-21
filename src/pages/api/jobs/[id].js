// src/pages/api/jobs/[id].js
import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  const { id } = req.query;
  const method = req.method;

  if (method === "GET") {
    try {
      const job = await prisma.job.findUnique({
        where: { id: Number(id) },
      });
      if (!job) return res.status(404).json({ message: "Nema tog posla" });
      res.status(200).json(job);
    } catch (error) {
      res.status(500).json({ message: "Greška na serveru" });
    }
  } else if (method === "DELETE") {
    try {
      await prisma.job.delete({
        where: { id: Number(id) },
      });
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: "Greška pri brisanju" });
    }
  } else if (method === "PUT") {
    const { title, description, price, date, time, contact } = req.body;

    try {
      const updated = await prisma.job.update({
        where: { id: Number(id) },
        data: {
          title,
          description,
          price: Number(price),
          date,
          time,
          contact,
        },
      });
      res.status(200).json(updated);
    } catch (error) {
      res.status(500).json({ message: "Greška pri ažuriranju" });
    }
  } else {
    res.setHeader("Allow", ["GET", "DELETE", "PUT"]);
    res.status(405).end(`Metoda ${method} nije dozvoljena`);
  }
}
