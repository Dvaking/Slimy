import 'dotenv/config';

async function getOnDatabase(): Promise<string> {
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/`, {
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

export async function tryDatabase() {
  const data = await getOnDatabase();
  console.log("Data to save:", data);
  return data;
}
