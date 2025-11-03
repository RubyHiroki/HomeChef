import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
    Alert,
    Animated,
    Keyboard,
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
  const [ingredients, setIngredients] = useState<string[]>([""]); // 最初は1つだけ
  const [showResults, setShowResults] = useState(false);
  const [focusedInput, setFocusedInput] = useState<number | null>(null);
  
  // アニメーション用の参照
  const fadeAnims = useRef([new Animated.Value(0)]).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  
  // 初期表示時のアニメーション
  useEffect(() => {
    // 最初の入力フィールドのフェードインアニメーション
    Animated.timing(fadeAnims[0], {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);
  
  // 入力フィールドの数とアニメーション配列の同期を維持
  useEffect(() => {
    // 入力フィールドが削除された場合、アニメーション配列も調整
    if (fadeAnims.length > ingredients.length) {
      // 余分なアニメーション値を削除
      fadeAnims.splice(ingredients.length);
    }
  }, [ingredients.length]);

  // ボタンのプレスアニメーション
  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.98,
      useNativeDriver: true,
      friction: 8,
      tension: 40,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      friction: 8,
      tension: 40,
    }).start();
  };

  // 食材追加（最大5つ）
  const handleAddIngredient = () => {
    if (ingredients.length >= 5) {
      Alert.alert("制限", "食材は5つまで追加できます");
      return;
    }
    
    // 新しいアニメーション値を作成
    const newAnim = new Animated.Value(0);
    fadeAnims.push(newAnim);
    
    // 入力欄を追加
    setIngredients([...ingredients, ""]);
    
    // キーボードを閉じる
    Keyboard.dismiss();
    
    // 新しい入力欄のアニメーションを開始
    Animated.timing(newAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  // 食材削除
  const handleRemoveIngredient = (index: number) => {
    if (ingredients.length <= 1) {
      // 最低1つは残す
      setIngredients([""]);
      return;
    }
    
    // 入力欄を削除
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
    
    // アニメーション配列も更新
    fadeAnims.splice(index, 1);
  };

  // 献立提案
  const handleSuggestMeals = () => {
    // 空の入力を除外
    const validIngredients = ingredients.filter(item => item.trim() !== "");
    
    if (validIngredients.length === 0) {
      Alert.alert("入力エラー", "少なくとも1つの食材を入力してください");
      return;
    }
    
    // 結果画面を表示
    setShowResults(true);
  };

  // 結果画面から戻る
  const handleBackFromResults = () => {
    setShowResults(false);
  };

  // 結果画面を表示
  if (showResults) {
    return <ResultScreen ingredients={ingredients.filter(i => i.trim() !== "")} onBack={handleBackFromResults} />;
  }

  return (
    <View style={styles.container}>
      {/* ヘッダー */}
      <View style={styles.header}>
        <View style={styles.headerPlaceholder} />
        <Text style={styles.headerTitle}>食材の入力</Text>
        <View style={styles.headerPlaceholder} />
      </View>

      {/* メインコンテンツ */}
      <View style={styles.main}>
        {/* タイトルセクション */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>家にある食材は？</Text>
          <Text style={styles.subtitle}>食材を追加して、今日の献立を決めましょう</Text>
        </View>

        {/* 入力フォーム */}
        <View style={styles.inputContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.inputList}>
              {ingredients.map((item, index) => (
                <Animated.View 
                  key={index} 
                  style={[
                    styles.inputRow,
                    { opacity: fadeAnims[index] || 0, transform: [{ translateY: fadeAnims[index].interpolate({
                      inputRange: [0, 1],
                      outputRange: [-10, 0]
                    }) }] }
                  ]}
                >
                  <View style={styles.inputWrapper}>
                    <TextInput
                      style={[
                        styles.input,
                        focusedInput === index && styles.inputFocused
                      ]}
                      value={item}
                      placeholder={index === 0 ? "例：豚肉" : index === 1 ? "例：卵" : "例：玉ねぎ"}
                      placeholderTextColor="#A0AEC0"
                      onFocus={() => setFocusedInput(index)}
                      onBlur={() => setFocusedInput(null)}
                      onChangeText={(text) => {
                        const newList = [...ingredients];
                        newList[index] = text;
                        setIngredients(newList);
                      }}
                    />
                  </View>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleRemoveIngredient(index)}
                  >
                    <MaterialIcons name="remove" size={20} color="#A0AEC0" />
                  </TouchableOpacity>
                </Animated.View>
              ))}
            </View>

            {/* 食材追加ボタン */}
            {ingredients.length < 5 && (
              <View style={styles.addButtonContainer}>
                <TouchableOpacity 
                  style={styles.addButton}
                  onPress={handleAddIngredient}
                >
                  <MaterialIcons name="add-circle" size={20} color="#A0AEC0" />
                  <Text style={styles.addButtonText}>食材を追加する</Text>
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>
        </View>

        {/* 献立提案ボタン */}
        <View style={styles.footerContainer}>
          <TouchableWithoutFeedback
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={handleSuggestMeals}
          >
            <Animated.View 
              style={[
                styles.suggestButton, 
                { transform: [{ scale: scaleAnim }] }
              ]}
            >
              <Text style={styles.suggestButtonText}>献立を提案</Text>
              <MaterialIcons name="arrow-forward" size={24} color="#FFFFFF" />
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  );
}