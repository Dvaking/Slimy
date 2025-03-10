import "dotenv/config";

async function getOnDatabase(): Promise<string> {
  try {
    const response = await fetch(`http://backend:8801/discord/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    return data.message || "No message found";
  } catch (error) {
    console.error("Error fetching data:", error);
    return "Get on memory failed";
  }
}

export async function tryDiscordDatabase(): Promise<string> {
  const data = await getOnDatabase();
  return data;
}
