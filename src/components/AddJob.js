import React, { useState } from "react";

const AddJob = ({ user, setView }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    date: "",
    time: "",
    contact: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validacija
    const { title, description, price, date, time, contact } = formData;
    if (!title || !description || !price || !date || !time || !contact) {
      setError("Molimo popunite sva polja.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          price: parseInt(price, 10),
          user,
        }),
      });

      if (!res.ok) throw new Error("Neuspješno dodavanje.");

      // Reset i prebacivanje na prikaz oglasa
      setFormData({
        title: "",
        description: "",
        price: "",
        date: "",
        time: "",
        contact: "",
      });

      setView("jobs");
    } catch (err) {
      console.error(err);
      setError("Greška prilikom dodavanja oglasa.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2 style={{ textAlign: "center" }}>Dodaj oglas</h2>

      <input
        type="text"
        name="title"
        placeholder="Naziv posla"
        value={formData.title}
        onChange={handleChange}
      />

      <input
        type="text"
        name="description"
        placeholder="Opis posla"
        value={formData.description}
        onChange={handleChange}
      />

      <input
        type="number"
        name="price"
        placeholder="Cijena (KM)"
        value={formData.price}
        onChange={handleChange}
      />

      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
      />

      <input
        type="time"
        name="time"
        value={formData.time}
        onChange={handleChange}
      />

      <input
        type="text"
        name="contact"
        placeholder="Kontakt telefon"
        value={formData.contact}
        onChange={handleChange}
      />

      <button type="submit" disabled={loading}>
        {loading ? "Dodavanje..." : "Dodaj oglas"}
      </button>

      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default AddJob;
