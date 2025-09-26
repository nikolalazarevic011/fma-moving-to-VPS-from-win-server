// pages/api/members.js
export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  // Retrieve the WordPress base URL from environment variables
  const wpBaseUrl = process.env.NEXT_PUBLIC_WP_URL;

  try {
    const response = await fetch(`${wpBaseUrl}/wp-json/custom/v1/members`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (response.ok) {
      res.status(200).json(data);
    } else {
      res
        .status(response.status)
        .json({ message: data.message || "Failed to fetch members" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
