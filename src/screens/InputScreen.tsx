import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
    Alert,
    Animated,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import { styles } from "./InputScreen.styles";
import ResultScreen from "./ResultScreen";

export default function InputScreen() {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  // 食材追加ボタンのフェードアニメーション
  const addButtonOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(addButtonOpacity, {
      toValue: ingredients.length >= 5 ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [ingredients]);

  // 献立提案ボタンのスケールアニメーション
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
      friction: 3,
      tension: 40,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      friction: 3,
      tension: 40,
    }).start();
  };

  // 食材追加（最大5つ）
  const handleAddIngredient = () => {
    if (ingredients.length >= 5) {
      Alert.alert("制限", "食材は5つまで追加できます");
      return;
    }
    setIngredients([...ingredients, ""]);
  };

  const handleRemoveIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleSuggestMeals = () => {
    // 空の入力がある場合は除外
    const validIngredients = ingredients.filter(item => item.trim() !== "");
    
    if (validIngredients.length === 0) {
      Alert.alert("入力エラー", "少なくとも1つの食材を入力してください");
      return;
    }
    
    // 結果画面を表示
    setShowResults(true);
  };

  // 結果画面から戻る処理
  const handleBackFromResults = () => {
    setShowResults(false);
  };

  // 結果画面を表示
  if (showResults) {
    return <ResultScreen ingredients={ingredients} onBack={handleBackFromResults} />;
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>食材を入力</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Main content */}
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>家にある食材を教えてください</Text>
        <Text style={styles.description}>
          パントリー、冷蔵庫、冷凍庫など、全ての食材を追加してください（最大5つ）
        </Text>

        {/* 食材入力欄 */}
        {ingredients.map((item, index) => (
          <View key={index} style={styles.inputRow}>
            <TextInput
              style={styles.input}
              value={item}
              placeholder="例：たまご"
              placeholderTextColor="#8aa08a"
              onChangeText={(text) => {
                const newList = [...ingredients];
                newList[index] = text;
                setIngredients(newList);
              }}
            />
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleRemoveIngredient(index)}
            >
              <MaterialIcons name="delete" size={22} color="#0d1b0d" />
            </TouchableOpacity>
          </View>
        ))}

        {/* 食材追加ボタン（フェードアウト） */}
        <Animated.View style={{ opacity: addButtonOpacity }}>
          {ingredients.length < 5 && (
            <TouchableOpacity style={styles.addButton} onPress={handleAddIngredient}>
              <MaterialIcons name="add-circle" size={22} color="#13ec13" />
              <Text style={styles.addButtonText}>食材を追加</Text>
            </TouchableOpacity>
          )}
        </Animated.View>
      </ScrollView>

      {/* 立体感＆アニメーション付き献立提案ボタン */}
      <View style={styles.footer}>
        <TouchableWithoutFeedback
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={handleSuggestMeals}
        >
          <Animated.View style={[styles.stylishButton, { transform: [{ scale: scaleAnim }] }]}>
            <Text style={styles.submitText}>献立を提案してもらう</Text>
            <MaterialIcons name="arrow-forward" size={24} color="#fff" />
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}
