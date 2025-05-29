export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const { code } = req.body;
  if (!code)
    return res.status(400).json({ error: "Missing code" });

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyCiYvufgWOPiF8hJF76AYeJOqP-e0AS8bs",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Analyze this Roblox Lua script for anti-cheat logic or suspicious behavior. Explain in detail:\n\n${code}`,
                },
              ],
            },
          ],
        }),
      }
    );

    const json = await response.json();
    const result =
      json.candidates?.[0]?.content?.parts?.[0]?.text || "No response.";

    res.status(200).json({ analysis: result });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
                  }
