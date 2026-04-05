async function run() {
  const apiKey = process.env.BSCSCAN_API_KEY;
  console.log("API Key loaded?", !!apiKey);

  const url = new URL("https://api.bscscan.com/api");
  url.searchParams.set("module", "account");
  url.searchParams.set("action", "tokentx");
  url.searchParams.set("address", "0x8894E0a0c962CB723c1976a4421c95949bE2D4E3");
  url.searchParams.set("startblock", "0");
  url.searchParams.set("endblock", "99999999");
  url.searchParams.set("page", "1");
  url.searchParams.set("offset", "10");
  url.searchParams.set("sort", "desc");
  url.searchParams.set("apikey", apiKey || "");

  try {
    const res = await fetch(url.toString());
    const data = await res.json();
    console.log("STATUS:", data.status);
    console.log("MESSAGE:", data.message);
    if (data.result && Array.isArray(data.result)) {
      console.log("RESULT LENGTH:", data.result.length);
    } else {
      console.log("RESULT:", data.result);
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

run();
