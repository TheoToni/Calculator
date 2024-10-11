import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";

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
        // Überprüfen, ob der letzte eingegebene Wert ein Operator war
        if (!lastInputWasOperator && currentInput.length > 0) {
          setCurrentInput(currentInput + value);
          setLastInputWasOperator(true); // Markiere, dass der letzte Input ein Operator war
        }
      } else {
        // Wenn eine Zahl eingegeben wird, zurücksetzen
        setCurrentInput(currentInput + value);
        setLastInputWasOperator(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.result}>{result || currentInput || "0"}</Text>
      <View style={styles.row}>
        {["1", "2", "3", "+"].map((value) => (
          <Button
            key={value}
            title={value}
            onPress={() => handleButtonPress(value)}
          />
        ))}
      </View>
      <View style={styles.row}>
        {["4", "5", "6", "-"].map((value) => (
          <Button
            key={value}
            title={value}
            onPress={() => handleButtonPress(value)}
          />
        ))}
      </View>
      <View style={styles.row}>
        {["7", "8", "9", "*"].map((value) => (
          <Button
            key={value}
            title={value}
            onPress={() => handleButtonPress(value)}
          />
        ))}
      </View>
      <View style={styles.row}>
        {["C", "0", "=", "/"].map((value) => (
          <Button
            key={value}
            title={value}
            onPress={() => handleButtonPress(value)}
          />
        ))}
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  result: {
    fontSize: 32,
    textAlign: "right",
    margin: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 10,
  },
});
