import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Animated,
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
  
  // アニメーション用の参照
  const cardAnimations = React.useRef<Animated.Value[]>([]).current;
  
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
      
      // アニメーション値を設定
      if (cardAnimations.length < withImages.length) {
        const newAnims = Array(withImages.length - cardAnimations.length)
          .fill(0)
          .map(() => new Animated.Value(0));
        cardAnimations.push(...newAnims);
      }
      
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
  
  // カードが表示されたらアニメーションを開始
  useEffect(() => {
    if (!loading && mealsWithImages.length > 0) {
      // 順番にカードをアニメーションさせる
      mealsWithImages.forEach((_, index) => {
        Animated.timing(cardAnimations[index], {
          toValue: 1,
          duration: 400,
          delay: index * 150,
          useNativeDriver: true,
        }).start();
      });
    }
  }, [loading, mealsWithImages]);

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
            <MaterialIcons name="arrow-back-ios" size={20} color="#424242" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>AIからの献立提案</Text>
          <View style={styles.emptyView} />
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FFA726" />
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
            <MaterialIcons name="arrow-back-ios" size={20} color="#424242" />
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
          <MaterialIcons name="arrow-back-ios" size={20} color="#424242" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>AIからの献立提案</Text>
        <View style={styles.emptyView} />
      </View>
      
      <ScrollView 
        style={styles.content}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.introText}>あなたのおうちの食材から、{"\n"}AIが3つのレシピを提案します。</Text>
        
        <View style={styles.cardList}>
          {mealsWithImages.map((meal, index) => {
            // インデックスに基づいて異なる装飾を表示
            const decorationType = index % 3;
            
            return (
              <Animated.View
                key={index}
                style={{
                  opacity: cardAnimations[index] || 0,
                  transform: [
                    { translateY: (cardAnimations[index] || new Animated.Value(0)).interpolate({
                      inputRange: [0, 1],
                      outputRange: [20, 0]
                    }) }
                  ]
                }}
              >
                <TouchableOpacity
                  style={styles.mealCard}
                  onPress={() => handleViewDetails(meal)}
                  activeOpacity={0.9}
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
                          d="M50.4,-61C65.5,-51.1,78.2,-36.5,81.8,-19.9C85.4,-3.3,79.9,15.2,70.1,32.3C60.2,49.4,46,65.1,29.3,72.9C12.6,80.8,-6.6,80.8,-24.5,74.7C-42.5,68.6,-59.2,56.5,-69.1,40.9C-79,25.3,-82.1,6.2,-78.7,-11.1C-75.3,-28.4,-65.4,-43.9,-51.9,-54.2C-38.4,-64.5,-21.3,-69.6,-5.3,-68.2C10.7,-66.9,21.3,-59.2,34.1,-55.8C46.8,-52.5,61.6,-53.5,50.4,-61Z"
                          fill="#FF8A65"
                          opacity={0.3}
                          transform="translate(100 100) scale(1.1) rotate(15)"
                        />
                      </Svg>
                    </View>
                  )}
                  
                  {/* 装飾3: ドット */}
                  {decorationType === 2 && (
                    <View style={styles.dotsContainer}>
                      <View style={styles.dot} />
                      <View style={styles.dot} />
                      <View style={styles.dot} />
                    </View>
                  )}
                  
                  <View style={styles.cardContent}>
                    <Text style={styles.mealTitle}>
                      {meal.name.includes("\n") ? meal.name : decorationType === 1 ? meal.name.replace(/(.{10})/, "$1\n") : meal.name}
                    </Text>
                    <View style={styles.viewMoreContainer}>
                      <Text style={styles.viewMoreText}>レシピを見る</Text>
                      <MaterialIcons name="arrow-forward" size={18} color="#F57C00" style={{ marginLeft: 6 }} />
                    </View>
                  </View>
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}