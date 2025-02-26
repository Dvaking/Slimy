async function getOnDatabase(): Promise<string> {
  try {
    const response = await fetch("http://localhost:8523/", {
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

export async function saveOnFiles(str: string) {
  const data = await getOnDatabase();
  console.log("Data to save:", data);
  return data || "No data to save";
}
