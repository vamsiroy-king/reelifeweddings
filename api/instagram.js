export default async function handler(req, res) {
    // 1. Get the token from Vercel Environment Variables (Secure!)
    const token = process.env.INSTAGRAM_TOKEN;

    if (!token) {
        return res.status(500).json({ error: "Missing INSTAGRAM_TOKEN in Vercel env vars" });
    }

    // 2. Initial URL to fetch user's media
    const fields = "id,media_type,media_url,thumbnail_url,permalink,caption,timestamp";
    const url = `https://graph.instagram.com/me/media?fields=${fields}&access_token=${token}&limit=8`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
            return res.status(400).json(data);
        }

        // 3. Return the clean data to our frontend
        // Set Cache-Control so we don't hit Instagram's limit (cache for 1 hour)
        res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=1800');
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: "Failed to fetch from Instagram", details: error.message });
    }
}
