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
システム: あなたは料理のエキスパートAIです。与えられた食材を使った料理のレシピをJSON形式で提供します。
マークダウン記法は使わず、純粋なJSONオブジェクトのみを返してください。
説明文や前置きは一切不要です。

ユーザー: 次の食材を使った簡単な料理を3つ提案してください: ${validIngredients.join(", ")}

出力形式:
{
  "meals": [
    {
      "name": "料理名",
      "ingredients": ["材料1", "材料2"],
      "steps": ["手順1", "手順2"]
    }
  ]
}
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
    
    // ログに出ているレスポンス構造に合わせて修正
    const text = candidate?.content?.parts?.[0]?.text || "";
    
    console.log("抽出されたテキスト:", text);

    if (!text) {
      throw new Error("AIから有効な応答が得られませんでした。候補が空です。");
    }

    // JSONブロック抽出（余計な文章やマークダウンを除去）
    console.log("JSONパターン検索開始");
    
    // 正規表現を個別に試して詳細なログを出力
    const jsonPattern1 = /```json\s*([\s\S]*?)```/;
    const jsonPattern2 = /```([\s\S]*?)```/;
    const jsonPattern3 = /{[\s\S]*}/;
    
    const match1 = text.match(jsonPattern1);
    const match2 = text.match(jsonPattern2);
    const match3 = text.match(jsonPattern3);
    
    console.log("パターン1(```json)マッチ:", !!match1);
    console.log("パターン2(```)マッチ:", !!match2);
    console.log("パターン3({})マッチ:", !!match3);
    
    // 最初に見つかったマッチを使用
    let jsonMatch = match1 || match2 || match3;
    
    if (!jsonMatch) {
      console.error("JSON部分が見つかりません:", text);
      throw new Error("AIの応答にJSON形式が含まれていません。");
    }
    
    // マッチしたパターンに応じて適切に抽出
    let jsonText;
    if (match1) {
      jsonText = match1[1]; // ```json ... ``` の中身
      console.log("パターン1でJSON抽出");
    } else if (match2) {
      jsonText = match2[1]; // ``` ... ``` の中身
      console.log("パターン2でJSON抽出");
    } else {
      jsonText = match3[0]; // { ... } そのもの
      console.log("パターン3でJSON抽出");
    }

    try {
      // JSONテキストをクリーンアップ（余分な空白や改行を削除）
      const cleanedJsonText = jsonText.trim();
      console.log("パース前のJSONテキスト:", cleanedJsonText);
      
      // 最後の手段として、JSONっぽいテキストから直接オブジェクトを作成
      let result;
      try {
        result = JSON.parse(cleanedJsonText);
      } catch (initialError) {
        console.error("最初のパース失敗:", initialError);
        
        // 余分な文字を取り除いて再試行
        const extractedJson = cleanedJsonText.match(/{[\s\S]*}/);
        if (extractedJson) {
          console.log("抽出されたJSONテキスト:", extractedJson[0]);
          result = JSON.parse(extractedJson[0]);
        } else {
          throw initialError;
        }
      }
      
      console.log("パース結果:", result);

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
