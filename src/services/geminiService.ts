import { EXPO_PUBLIC_GEMINI_API_KEY } from "@env";

const API_KEY = EXPO_PUBLIC_GEMINI_API_KEY;

if (!API_KEY) {
  console.error("APIキーが設定されていません。.envファイルを確認してください。");
}

export interface MealSuggestion {
  meals: {
    name: string;
    ingredients: string[];
    steps: string[];
  }[];
}

/**
 * 食材リストから献立を提案する（Gemini 2.5 Pro対応・長文対応版）
 */
export async function suggestMeals(ingredients: string[]): Promise<MealSuggestion> {
  try {
    const validIngredients = ingredients.filter(i => i.trim() !== "");
    if (validIngredients.length === 0) {
      throw new Error("食材が入力されていません");
    }

    const prompt = `
あなたは料理のエキスパートです。
次の食材を使った簡単な料理を3つ提案してください: ${validIngredients.join(", ")}
必ずJSON形式で {"meals":[{"name":"料理名","ingredients":["材料1","材料2"],"steps":["手順1","手順2"]}]} を返してください。
`;

    console.log("APIリクエスト開始...");

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=${API_KEY}`;

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 32,
          topP: 1,
          candidateCount: 1,
          maxOutputTokens: 4096 // 長い手順にも対応
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_NONE"
          }
        ]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API応答エラー:", response.status, errorText);
      throw new Error(`API応答エラー: ${response.status}`);
    }

    const data = await response.json();
    console.log("Full API response:", JSON.stringify(data, null, 2));

    // ネスト構造に柔軟対応してテキスト抽出
    const candidate = data.candidates?.[0];
    const text =
      candidate?.content?.[0]?.parts?.[0]?.text ||
      candidate?.content?.[0]?.text ||
      candidate?.output?.[0]?.content?.[0]?.text ||
      "";

    if (!text) {
      throw new Error("AIから有効な応答が得られませんでした。候補が空です。");
    }

    // JSONブロック抽出（余計な文章やマークダウンを除去）
    const jsonMatch =
      text.match(/```json\s*([\s\S]*?)```/) || // ```json ... ```
      text.match(/```[\s\S]*?```/) ||         // ``` ... ```
      text.match(/{[\s\S]*}/);                // {...}

    if (!jsonMatch) {
      console.error("JSON部分が見つかりません:", text);
      throw new Error("AIの応答にJSON形式が含まれていません。");
    }

    const jsonText = jsonMatch[1] || jsonMatch[0];

    try {
      const result = JSON.parse(jsonText);

      if (!result.meals || !Array.isArray(result.meals) || result.meals.length === 0) {
        throw new Error("有効な献立データが含まれていません");
      }

      return result;
    } catch (parseError) {
      console.error("JSONパースエラー:", parseError, "テキスト:", jsonText);
      throw new Error("レスポンスのJSON解析に失敗しました");
    }

  } catch (error: any) {
    console.error("Gemini API エラー:", error);
    throw new Error(error.message || "献立提案に失敗しました");
  }
}
