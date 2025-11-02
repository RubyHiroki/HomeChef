import { EXPO_PUBLIC_GEMINI_API_KEY } from "@env";

const API_KEY = EXPO_PUBLIC_GEMINI_API_KEY;

/**
 * 料理名から画像URLを取得する
 * Unsplash APIを使用して料理の画像を検索
 */
export async function getFoodImageUrl(dishName: string): Promise<string> {
  try {
    // Unsplash APIを使用して料理の画像を検索
    const query = encodeURIComponent(`${dishName} food dish cooking`);
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${query}&per_page=1`,
      {
        headers: {
          // Unsplash APIキーが必要です（無料で取得可能）
          // 実際のプロジェクトでは環境変数に保存してください
          "Authorization": "Client-ID YOUR_UNSPLASH_API_KEY"
        }
      }
    );

    if (!response.ok) {
      throw new Error("画像検索に失敗しました");
    }

    const data = await response.json();
    
    // 検索結果がある場合はその画像のURLを返す
    if (data.results && data.results.length > 0) {
      return data.results[0].urls.regular;
    }
    
    // 検索結果がない場合はデフォルト画像を返す
    return getDefaultFoodImage(dishName);
  } catch (error) {
    console.error("画像取得エラー:", error);
    // エラー時はデフォルト画像を返す
    return getDefaultFoodImage(dishName);
  }
}

/**
 * 料理名に基づいてデフォルト画像を返す
 */
export function getDefaultFoodImage(dishName: string): string {
  // 料理名のハッシュ値を計算して異なる画像を返す
  const hash = dishName.split("").reduce((acc, char) => {
    return acc + char.charCodeAt(0);
  }, 0);
  
  // 複数のデフォルト画像から選択
  const defaultImages = [
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1000",
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000",
    "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1000",
    "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1000",
    "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1000",
    "https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=1000",
    "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=1000",
  ];
  
  return defaultImages[hash % defaultImages.length];
}
