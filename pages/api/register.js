export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const {
    username,
    password,
    confirmPassword,
    email,
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

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match!" });
  }

  // Retrieve the WordPress base URL from environment variables
  const wpBaseUrl = process.env.NEXT_PUBLIC_WP_URL;
  try {
    const response = await fetch(`${wpBaseUrl}/wp-json/custom/v1/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        login: username,
        password,
        email,
        first_name: firstName,
        last_name: lastName,
        church_name: churchName,
        phone,
        address,
        zip,
        city,
        state,
        country,
      }),
    });

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
