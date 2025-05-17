// src/app/utils/pinata.js
export async function uploadToPinata(file) {
  const apiKey = process.env.NEXT_PUBLIC_PINATA_API_KEY;
  const apiSecret = process.env.NEXT_PUBLIC_PINATA_API_SECRET;

    // ADD THESE LINES:
  console.log("API Key:", apiKey);
  console.log("API Secret:", apiSecret);

  
  const url = "https://api.pinata.cloud/pinning/pinFileToIPFS";
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      pinata_api_key: apiKey,
      pinata_secret_api_key: apiSecret,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to upload to Pinata");
  }

  const data = await response.json();
  return `https://gateway.pinata.cloud/ipfs/${data.IpfsHash}`;
}
if (typeof window !== "undefined") {
  console.log("uploadToPinata loaded (browser):", typeof uploadToPinata);
} else {
  console.log("uploadToPinata loaded (server):", typeof uploadToPinata);
}
