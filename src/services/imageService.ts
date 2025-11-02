import { EXPO_PUBLIC_GEMINI_API_KEY } from "@env";

const API_KEY = EXPO_PUBLIC_GEMINI_API_KEY;

// 料理のカテゴリごとのキーワードマッピング
const FOOD_CATEGORIES = {
  // 肉料理
  meat: ["肉", "ステーキ", "豚", "牛", "鶏", "チキン", "ポーク", "ビーフ", "唐揚げ", "から揚げ", "焼肉", "ハンバーグ", "肉じゃが", "カツ", "とんかつ"],
  // 魚料理
  fish: ["魚", "鮭", "サーモン", "鯖", "さば", "刺身", "寿司", "すし", "マグロ", "まぐろ", "カツオ", "かつお", "ブリ", "ぶり", "アジ", "あじ", "煮魚", "焼き魚"],
  // 野菜料理
  vegetable: ["サラダ", "野菜", "ほうれん草", "ブロッコリー", "キャベツ", "レタス", "トマト", "なす", "ナス", "茄子", "きのこ", "キノコ", "じゃがいも", "ジャガイモ", "馬鈴薯"],
  // 麺類
  noodle: ["麺", "パスタ", "ラーメン", "うどん", "そば", "蕎麦", "そうめん", "素麺", "スパゲッティ", "焼きそば"],
  // ご飯もの
  rice: ["ご飯", "チャーハン", "炒飯", "オムライス", "カレー", "リゾット", "丼", "どんぶり", "おにぎり", "お握り", "寿司", "すし"],
  // スープ・汁物
  soup: ["スープ", "味噌汁", "みそ汁", "コンソメ", "ポタージュ", "シチュー", "豚汁", "けんちん汁"],
  // 卵料理
  egg: ["卵", "たまご", "オムレツ", "目玉焼き", "茶碗蒸し", "ちゃわんむし", "卵焼き", "玉子焼き"],
  // デザート・お菓子
  dessert: ["ケーキ", "プリン", "アイス", "クッキー", "チョコレート", "パフェ", "デザート", "スイーツ", "お菓子"],
};

// カテゴリごとの画像URL
const CATEGORY_IMAGES = {
  meat: [
    "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1000",
    "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?q=80&w=1000",
    "https://images.unsplash.com/photo-1432139509613-5c4255815697?q=80&w=1000"
  ],
  fish: [
    "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=1000",
    "https://images.unsplash.com/photo-1553659971-f01207815844?q=80&w=1000",
    "https://images.unsplash.com/photo-1579631542720-3a87824fff86?q=80&w=1000"
  ],
  vegetable: [
    "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=1000",
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000",
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1000"
  ],
  noodle: [
    "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=1000",
    "https://images.unsplash.com/photo-1552611052-33e04de081de?q=80&w=1000",
    "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?q=80&w=1000"
  ],
  rice: [
    "https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=80&w=1000",
    "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?q=80&w=1000",
    "https://images.unsplash.com/photo-1596560548464-f010549b84d7?q=80&w=1000"
  ],
  soup: [
    "https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=1000",
    "https://images.unsplash.com/photo-1605709303005-0fddfcbba9ce?q=80&w=1000",
    "https://images.unsplash.com/photo-1616501268209-edfff098fdd2?q=80&w=1000"
  ],
  egg: [
    "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=1000",
    "https://images.unsplash.com/photo-1607532941433-304659e8198a?q=80&w=1000",
    "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?q=80&w=1000"
  ],
  dessert: [
    "https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=1000",
    "https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=1000",
    "https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=1000"
  ],
  // デフォルト画像
  default: [
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1000",
    "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1000",
    "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1000"
  ]
};

/**
 * 料理名と材料から最適なカテゴリを判定する
 */
function determineFoodCategory(dishName: string, ingredients: string[]): string {
  // 料理名と材料を結合して検索対象にする
  const searchText = dishName + " " + ingredients.join(" ");
  
  // カテゴリごとにキーワードマッチングを行う
  for (const [category, keywords] of Object.entries(FOOD_CATEGORIES)) {
    for (const keyword of keywords) {
      if (searchText.includes(keyword)) {
        return category;
      }
    }
  }
  
  // マッチするカテゴリがない場合はデフォルト
  return "default";
}

/**
 * 料理名と材料から適切な画像URLを取得する
 */
export function getFoodImage(dishName: string, ingredients: string[]): string {
  // カテゴリを判定
  const category = determineFoodCategory(dishName, ingredients);
  
  // カテゴリに対応する画像配列を取得
  const images = CATEGORY_IMAGES[category as keyof typeof CATEGORY_IMAGES] || CATEGORY_IMAGES.default;
  
  // 料理名のハッシュ値を計算して画像をランダムに選択
  const hash = dishName.split("").reduce((acc, char) => {
    return acc + char.charCodeAt(0);
  }, 0);
  
  return images[hash % images.length];
}

/**
 * 料理名に基づいてデフォルト画像を返す
 * 下位互換性のために残す
 */
export function getDefaultFoodImage(dishName: string): string {
  return getFoodImage(dishName, []);
}