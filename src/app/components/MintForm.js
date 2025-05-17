"use client";
import { useState } from "react";
import { uploadToPinata } from "../utils/pinata"; // Make sure path is correct!

export default function MintForm() {
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [date, setDate] = useState("");
  const [file, setFile] = useState(null);
  const [ipfsUrl, setIpfsUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !name || !course || !date) {
      alert("Please fill in all fields and upload the certificate.");
      return;
    }

    setLoading(true);
    setIpfsUrl("");

    try {
      // 1. Upload file to IPFS using Pinata
      const url = await uploadToPinata(file);
      setIpfsUrl(url);

      // 2. (Next step) Call smart contract mint function with url
      alert(`File uploaded! IPFS URL:\n${url}`);
    } catch (err) {
      alert("IPFS upload failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 mt-8 max-w-md mx-auto"
    >
      <input
        type="text"
        placeholder="Recipient Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        type="text"
        placeholder="Course/Program"
        value={course}
        onChange={(e) => setCourse(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        type="file"
        accept="application/pdf,image/*"
        onChange={(e) => setFile(e.target.files[0])}
        className="border p-2 rounded"
      />

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        disabled={loading}
      >
        {loading ? "Uploading..." : "Submit Certificate"}
      </button>

      {ipfsUrl && (
        <div className="mt-4 break-all bg-gray-100 dark:bg-gray-800 p-2 rounded">
          <strong>IPFS Link:</strong><br />
          <a
            href={ipfsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            {ipfsUrl}
          </a>
        </div>
      )}
    </form>
  );
}
