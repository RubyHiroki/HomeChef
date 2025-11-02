import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  // 基本レイアウト
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  
  // ヘッダー
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "rgba(245, 245, 245, 0.8)",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
    color: "#333333",
  },
  backButton: {
    padding: 8,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyView: {
    width: 40,
  },
  
  // コンテンツ
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  introText: {
    fontSize: 14,
    color: "#666666",
    marginVertical: 16,
    paddingHorizontal: 2,
  },
  
  // 料理カード
  cardList: {
    gap: 24,
  },
  mealCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    position: "relative",
    height: 160,
  },
  mealImage: {
    width: "100%",
    height: "100%",
  },
  imageFade: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // 上から下へのグラデーションを設定
    // React Nativeでは線形グラデーションを直接スタイルとして設定できないため、
    // LinearGradientコンポーネントを使用します（コード内で実装）
  },
  cardContent: {
    padding: 16,
  },
  mealTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333333",
  },
  viewMoreContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  viewMoreText: {
    fontSize: 14,
    color: "#81C784",
    fontWeight: "500",
  },
  
  // ローディング
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    marginTop: 16,
    color: "#666666",
  },
  
  // エラー
  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: "#d32f2f",
    textAlign: "center",
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: "#81C784",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  retryButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});