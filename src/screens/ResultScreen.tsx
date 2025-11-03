import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import { MealSuggestion, suggestMeals } from "../services/geminiService";
import RecipeDetailScreen from "./RecipeDetailScreen";
import { styles } from "./ResultScreen.styles";

interface ResultScreenProps {
  ingredients: string[];
  onBack: () => void;
}

interface MealWithImage {
  name: string;
  ingredients: string[];
  steps: string[];
  imageUrl?: string;
  description?: string;
}

export default function ResultScreen({ ingredients, onBack }: ResultScreenProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mealSuggestion, setMealSuggestion] = useState<MealSuggestion | null>(null);
  const [mealsWithImages, setMealsWithImages] = useState<MealWithImage[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<MealWithImage | null>(null);

  const fetchMealSuggestions = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // 献立提案を取得
      const result = await suggestMeals(ingredients);
      setMealSuggestion(result);
      
      // 料理データを整形
      const withImages = result.meals.map(meal => ({
        ...meal,
        // 説明文を追加（APIから返ってこない場合はundefined）
        description: undefined
      }));
      setMealsWithImages(withImages);
    } catch (err) {
      setError(err instanceof Error ? err.message : "献立の提案に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMealSuggestions();
  }, []);

  // 詳細を表示する処理
  const handleViewDetails = (meal: MealWithImage) => {
    setSelectedRecipe(meal);
  };
  
  // 詳細画面から戻る処理
  const handleBackFromDetails = () => {
    setSelectedRecipe(null);
  };

  // 選択されたレシピがある場合は詳細画面を表示
  if (selectedRecipe) {
    return (
      <RecipeDetailScreen 
        recipe={selectedRecipe} 
        onBack={handleBackFromDetails} 
      />
    );
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <MaterialIcons name="arrow-back" size={24} color="#333333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>AIからの献立提案</Text>
          <View style={styles.emptyView} />
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#81C784" />
          <Text style={styles.loadingText}>
            あなたの食材から最適な献立を考えています...
          </Text>
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <MaterialIcons name="arrow-back" size={24} color="#333333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>エラー</Text>
          <View style={styles.emptyView} />
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={fetchMealSuggestions}>
            <Text style={styles.retryButtonText}>再試行する</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <MaterialIcons name="arrow-back" size={24} color="#333333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>AIからの献立提案</Text>
        <View style={styles.emptyView} />
      </View>
      
      <ScrollView 
        style={styles.content}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.introText}>入力された食材から、こちらの{mealsWithImages.length}つのレシピを提案します。</Text>
        
        <View style={styles.cardList}>
          {mealsWithImages.map((meal, index) => {
            // インデックスに基づいて異なる装飾を表示
            const decorationType = index % 3;
            
            return (
              <TouchableOpacity
                key={index}
                style={styles.mealCard}
                onPress={() => handleViewDetails(meal)}
              >
                {/* 装飾1: 円形 */}
                {decorationType === 0 && (
                  <View style={styles.circleDecoration} />
                )}
                
                {/* 装飾2: SVG波形 */}
                {decorationType === 1 && (
                  <View style={styles.svgDecoration}>
                    <Svg height="100%" width="100%" viewBox="0 0 200 200">
                      <Path
                        d="M48.2,-64.1C62.4,-54.6,73.8,-40.4,79.8,-24.1C85.7,-7.8,86.1,10.7,79.5,26.2C72.8,41.7,59,54.2,44.2,64.2C29.5,74.2,14.7,81.7,-0.3,82.1C-15.3,82.4,-30.7,75.6,-44.7,66.1C-58.7,56.6,-71.4,44.4,-77.7,29.8C-84,15.2,-84,-1.8,-78.6,-16.4C-73.2,-31,-62.4,-43.3,-49.6,-52.7C-36.8,-62.1,-22,-68.6,-6.5,-70.7C9,-72.8,18,-70.5,28.6,-67.9C39.1,-65.2,51.1,-62.1,48.2,-64.1Z"
                        fill="#81C784"
                        opacity={0.2}
                        transform="translate(100 100) scale(1.1)"
                      />
                    </Svg>
                  </View>
                )}
                
                {/* 装飾3: ドット */}
                {decorationType === 2 && (
                  <View style={styles.dotsDecoration}>
                    <View style={styles.dot} />
                    <View style={[styles.dot, { marginTop: 8 }]} />
                    <View style={styles.dot} />
                  </View>
                )}
                
                <View style={styles.cardContent}>
                  <Text style={styles.mealTitle}>{meal.name}</Text>
                  <View style={styles.viewMoreContainer}>
                    <Text style={styles.viewMoreText}>詳細を見る</Text>
                    <MaterialIcons name="arrow-forward" size={18} color="#81C784" style={{ marginLeft: 4 }} />
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}