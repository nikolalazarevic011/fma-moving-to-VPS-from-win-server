export default async function handler(req, res) {
  const wpBaseUrl = process.env.NEXT_PUBLIC_WP_URL;

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email } = req.body;

  try {
    const wpRes = await fetch(
      `${wpBaseUrl}/wp-json/mycustom/v1/forgot-password`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      },
    );

    const data = await wpRes.json();
    return res.status(wpRes.status).json(data);
  } catch (err) {
    return res.status(500).json({ error: "Failed to send reset email" });
  }
}
