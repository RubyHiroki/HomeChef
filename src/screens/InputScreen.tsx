import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "./InputScreen.styles";

export default function InputScreen() {
  const [ingredients, setIngredients] = useState<string[]>(["豚肉", "玉ねぎ"]);
  const [newIngredient, setNewIngredient] = useState("");

  const handleAddIngredient = () => {
    if (newIngredient.trim() === "") return;
    setIngredients([...ingredients, newIngredient.trim()]);
    setNewIngredient("");
  };

  const handleRemoveIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <MaterialIcons name="arrow-back" size={24} color="#0d1b0d" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>食材を入力</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Main content */}
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>家にある食材を教えてください</Text>
        <Text style={styles.description}>
          パントリー、冷蔵庫、冷凍庫など、全ての食材を追加してください。
        </Text>

        {ingredients.map((item, index) => (
          <View key={index} style={styles.inputRow}>
            <TextInput
              style={styles.input}
              value={item}
              placeholder="例：豚肉"
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

        {/* 新しい食材入力欄 */}
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            value={newIngredient}
            onChangeText={setNewIngredient}
            placeholder="例：卵"
            placeholderTextColor="#8aa08a"
          />
          <TouchableOpacity style={styles.deleteButton} onPress={() => setNewIngredient("")}>
            <MaterialIcons name="delete" size={22} color="#0d1b0d" />
          </TouchableOpacity>
        </View>

        {/* 食材追加ボタン */}
        <TouchableOpacity style={styles.addButton} onPress={handleAddIngredient}>
          <MaterialIcons name="add-circle" size={22} color="#13ec13" />
          <Text style={styles.addButtonText}>食材を追加</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* 献立提案ボタン */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitText}>献立を提案してもらう</Text>
          <MaterialIcons name="arrow-forward" size={22} color="#0d1b0d" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
