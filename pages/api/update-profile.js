export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const {
    userId,
    firstName,
    lastName,
    churchName,
    phone,
    address,
    zip,
    city,
    state,
    country,
  } = req.body;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  // Retrieve the WordPress base URL from environment variables
  const wpBaseUrl = process.env.NEXT_PUBLIC_WP_URL;

  try {
    const response = await fetch(
      `${wpBaseUrl}/wp-json/custom/v1/update-profile`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          first_name: firstName,
          last_name: lastName,
          church_name: churchName,
          phone,
          addr1: address,
          zip,
          city,
          state,
          country,
        }),
      },
    );

    const data = await response.json();

    if (response.ok) {
      res.status(200).json(data);
    } else {
      res.status(response.status).json({ message: data.message });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
