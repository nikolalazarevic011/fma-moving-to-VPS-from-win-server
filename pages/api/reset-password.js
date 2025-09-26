export default async function handler(req, res) {
  const wpBaseUrl = process.env.NEXT_PUBLIC_WP_URL;

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { token, newPassword } = req.body;

  try {
    const wpRes = await fetch(
      `${wpBaseUrl}/wp-json/mycustom/v1/reset-password`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
      },
    );

    const data = await wpRes.json();
    return res.status(wpRes.status).json(data);
  } catch (err) {
    return res.status(500).json({ error: "Failed to reset password" });
  }
}
