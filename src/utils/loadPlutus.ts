import { PlutusJSON } from "../types/aiken"

export async function loadPlutusJSON(
  filePath: string,
): Promise<PlutusJSON | undefined> {
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error('Failed to fetch file');
    }
    const data = await response.text();
    return JSON.parse(data)
    // const plutusJsonText = await fs.readFile(filePath);
    // return JSON.parse(plutusJsonText);
  } catch (error) {
    console.error("Error reading or parsing plutus.json:", error);
  }
  return undefined;
}