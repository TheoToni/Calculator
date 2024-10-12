import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function App() {
  const [result, setResult] = useState("");
  const [currentInput, setCurrentInput] = useState("");
  const [lastInputWasOperator, setLastInputWasOperator] = useState(false);

  // Funktion zur Berechnung ohne eval
  const calculate = () => {
    try {
      const operators = ["+", "-", "*", "/"];
      let numbers = [];
      let operations = [];
      let tempNum = "";

      for (let i = 0; i < currentInput.length; i++) {
        const char = currentInput[i];
        if (operators.includes(char)) {
          numbers.push(parseFloat(tempNum));
          operations.push(char);
          tempNum = "";
        } else {
          tempNum += char;
        }
      }
      numbers.push(parseFloat(tempNum)); // Füge die letzte Zahl hinzu

      let total = numbers[0];
      for (let i = 0; i < operations.length; i++) {
        const nextNum = numbers[i + 1];
        switch (operations[i]) {
          case "+":
            total += nextNum;
            break;
          case "-":
            total -= nextNum;
            break;
          case "*":
            total *= nextNum;
            break;
          case "/":
            total /= nextNum;
            break;
          default:
            throw new Error("Ungültiger Operator");
        }
      }

      setResult(total.toString());
    } catch (error) {
      setResult("Error");
    }
  };

  const handleButtonPress = (value) => {
    const operators = ["+", "-", "*", "/"];

    if (value === "=") {
      if (!lastInputWasOperator) {
        calculate();
      }
    } else if (value === "C") {
      setCurrentInput("");
      setResult("");
      setLastInputWasOperator(false);
    } else {
      if (operators.includes(value)) {
        if (!lastInputWasOperator && currentInput.length > 0) {
          setCurrentInput(currentInput + value);
          setLastInputWasOperator(true);
        }
      } else {
        setCurrentInput(currentInput + value);
        setLastInputWasOperator(false);
      }
    }
  };

  const renderButton = (value) => (
    <TouchableOpacity
      key={value}
      style={styles.button}
      onPress={() => handleButtonPress(value)}
    >
      <Text style={styles.buttonText}>{value}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.result}>{result || currentInput || "0"}</Text>
      <View style={styles.row}>{["1", "2", "3", "+"].map(renderButton)}</View>
      <View style={styles.row}>{["4", "5", "6", "-"].map(renderButton)}</View>
      <View style={styles.row}>{["7", "8", "9", "*"].map(renderButton)}</View>
      <View style={styles.row}>{["C", "0", "=", "/"].map(renderButton)}</View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F3B4D",
    justifyContent: "center",
    padding: 20,
  },
  result: {
    fontSize: 40,
    textAlign: "right",
    marginBottom: 10,
    color: "white",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#FF5F1F", // grüne Farbe für Buttons
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 5,
    minWidth: 80,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 20,
    color: "#fff", // weiße Schriftfarbe
  },
});
