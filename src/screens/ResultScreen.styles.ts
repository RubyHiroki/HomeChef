import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f8f6",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0d1b0d",
  },
  content: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
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
    backgroundColor: "#13ec13",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  retryButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  mealCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  mealTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0d1b0d",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#3a4a3a",
    marginTop: 12,
    marginBottom: 6,
  },
  ingredientItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
  },
  bulletPoint: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#13ec13",
    marginRight: 8,
  },
  ingredientText: {
    fontSize: 14,
    color: "#0d1b0d",
  },
  stepItem: {
    flexDirection: "row",
    marginBottom: 8,
  },
  stepNumber: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#13ec13",
    marginRight: 8,
    width: 24,
  },
  stepText: {
    fontSize: 14,
    color: "#0d1b0d",
    flex: 1,
  },
  backButton: {
    padding: 8,
  },
});
