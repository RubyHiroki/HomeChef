import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  // 基本レイアウト
  container: {
    flex: 1,
    backgroundColor: "#FDFCFB", // background-light
  },
  
  // ヘッダー
  header: {
    height: 64,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    backgroundColor: "rgba(253, 252, 251, 0.9)", // background-light with opacity
    borderBottomWidth: 1,
    borderBottomColor: "rgba(226, 232, 240, 0.5)", // border-color-light with opacity
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  headerPlaceholder: {
    width: 40,
    height: 40,
  },
  
  // メインコンテンツ
  main: {
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 16,
  },
  
  // タイトルセクション
  titleSection: {
    marginBottom: 32,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    lineHeight: 36,
    letterSpacing: -0.5,
    color: "#2D3748", // text-light
  },
  subtitle: {
    fontSize: 16,
    marginTop: 8,
    color: "#A0AEC0", // text-muted-light
  },
  
  // 入力フォーム
  inputContainer: {
    flex: 1,
    flexDirection: "column",
  },
  inputList: {
    gap: 12,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  inputWrapper: {
    flex: 1,
    position: "relative",
  },
  input: {
    height: 56,
    width: "100%",
    borderWidth: 1,
    borderColor: "#E2E8F0", // border-color-light
    borderRadius: 12,
    backgroundColor: "#FFFFFF", // surface-light
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#2D3748", // text-light
  },
  inputFocused: {
    borderColor: "#FF6347", // primary
    shadowColor: "#FF6347",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  deleteButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#F7FAFC", // light gray
    alignItems: "center",
    justifyContent: "center",
  },
  deleteButtonHover: {
    backgroundColor: "#FED7D7", // light red
  },
  deleteIcon: {
    fontSize: 20,
    color: "#A0AEC0", // text-muted-light
  },
  deleteIconHover: {
    color: "#F56565", // red
  },
  
  // 追加ボタン
  addButtonContainer: {
    marginTop: 16,
  },
  addButton: {
    height: 56,
    width: "100%",
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#E2E8F0", // border-color-light
    borderRadius: 12,
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  addButtonHover: {
    borderColor: "#FF6347", // primary
    backgroundColor: "rgba(255, 99, 71, 0.05)", // primary with opacity
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#A0AEC0", // text-muted-light
  },
  addButtonTextHover: {
    color: "#FF6347", // primary
  },
  
  // 提案ボタン
  footerContainer: {
    marginTop: "auto",
    paddingHorizontal: 8,
    paddingTop: 24,
    paddingBottom: 16,
  },
  suggestButton: {
    height: 64,
    width: "100%",
    backgroundColor: "#FF6347", // primary
    borderRadius: 32, // full
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    shadowColor: "#FF6347",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 25,
    elevation: 8,
  },
  suggestButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF", // primary-content
  },
  
  // アニメーション
  fadeIn: {
    opacity: 0,
  },
});