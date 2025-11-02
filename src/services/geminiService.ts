import { EXPO_PUBLIC_GEMINI_API_KEY } from "@env";

const API_KEY = EXPO_PUBLIC_GEMINI_API_KEY;

if (!API_KEY) {
  console.error("APIキーが設定されていません。.envファイルを確認してください。");
}

/**
 * 食材リストから献立を提案する
 */
export async function suggestMeals(ingredients: string[]): Promise<MealSuggestion> {
  try {
    const validIngredients = ingredients.filter(i => i.trim() !== "");
    if (validIngredients.length === 0) {
      throw new Error("食材が入力されていません");
    }

    const prompt = `
あなたは料理のエキスパートです。次の食材を使った簡単な料理を3つ提案してください: ${validIngredients.join(", ")}

必ず以下のJSON形式だけで回答してください。説明文は不要です:
{"meals":[{"name":"料理名","ingredients":["材料1","材料2"],"steps":["手順1","手順2"]}]}

マークダウン記法は使わず、純粋なJSONだけを返してください。
`;

    console.log("APIリクエスト開始...");

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/text-bison-001:generateContent?key=${API_KEY}`;

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              { text: prompt }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 32,
          topP: 1,
          candidateCount: 1,
          maxOutputTokens: 1024
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
    const text = data.candidates?.[0]?.content?.[0]?.parts?.[0]?.text;

    if (!text) throw new Error("AIから有効な応答が得られませんでした");

    // JSONパース
    try {
      const jsonMatch =
        text.match(/```json\n([\s\S]*?)\n```/) ||
        text.match(/```\n([\s\S]*?)\n```/) ||
        text.match(/{[\s\S]*}/);

      const jsonText = jsonMatch ? jsonMatch[1] || jsonMatch[0] : text;
      const result = JSON.parse(jsonText);

      if (!result.meals || !Array.isArray(result.meals) || result.meals.length === 0) {
        throw new Error("有効な献立データが含まれていません");
      }

      return result;
    } catch (parseError) {
      console.error("JSONパースエラー:", parseError, "テキスト:", text);
      throw new Error("レスポンスの解析に失敗しました");
    }

  } catch (error: any) {
    console.error("Gemini API エラー:", error);
    throw new Error(error.message || "献立提案に失敗しました");
  }
}

// 献立提案の型定義
export interface MealSuggestion {
  meals: {
    name: string;
    ingredients: string[];
    steps: string[];
  }[];
}
