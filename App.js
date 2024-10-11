import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export default function App() {
  const [result, setResult] = useState("");
  const [currentInput, setCurrentInput] = useState("");

  const handleButtonPress = (value) => {
    if (value === "=") {
      try {
        setResult(eval(currentInput).toString());
      } catch (error) {
        setResult("Error");
      }
    } else if (value === "C") {
      setCurrentInput("");
      setResult("");
    } else {
      setCurrentInput(currentInput + value);
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
