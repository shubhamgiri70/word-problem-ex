import "../App.css";

import React, { useState } from "react";

const WordCompounds = () => {
  const [longestCompoundWord, setLongestCompoundWord] = useState("");
  const [secondLongestCompoundWord, setSecondLongestCompoundWord] =
    useState("");
  const [processingTime, setProcessingTime] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const isCompoundWord = (word, wordSet) => {
    if (wordSet.has(word)) return false; // The word itself shouldn't be counted
    const dp = Array(word.length + 1).fill(false);
    dp[0] = true; // Empty prefix is always "valid"

    for (let i = 1; i <= word.length; i++) {
      for (let j = 0; j < i; j++) {
        if (dp[j] && word.slice(j, i) in wordSet) {
          dp[i] = true;
          break;
        }
      }
    }
    return dp[word.length];
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const startTime = performance.now();
    const reader = new FileReader();

    reader.onload = (event) => {
      const words = event.target.result
        .split("\n")
        .map((word) => word.trim())
        .filter(Boolean);
      const wordSet = new Set(words);

      let longestWord = "";
      let secondLongestWord = "";

      words.forEach((word) => {
        if (isCompoundWord(word, wordSet)) {
          if (word.length > longestWord.length) {
            secondLongestWord = longestWord;
            longestWord = word;
          } else if (word.length > secondLongestWord.length) {
            secondLongestWord = word;
          }
        }
      });

      const endTime = performance.now();
      const timeTaken = endTime - startTime;

      setLongestCompoundWord(longestWord);
      setSecondLongestCompoundWord(secondLongestWord);
      setProcessingTime(timeTaken.toFixed(2));
      setErrorMessage(null);
    };

    reader.onerror = () => {
      setErrorMessage("Error reading the file.");
    };

    reader.readAsText(file);
  };

  return (
    <div className="container">
      <h1>Word Composition Checker</h1>
      <input type="file" accept=".txt" onChange={handleFileUpload} />
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {processingTime && (
        <div>
          <p>
            <strong>Longest Compound Word:</strong> {longestCompoundWord}
          </p>
          <p>
            <strong>Second Longest Compound Word:</strong>{" "}
            {secondLongestCompoundWord}
          </p>
          <p>
            <strong>Time Taken:</strong> {processingTime} ms
          </p>
        </div>
      )}
    </div>
  );
};

export default WordCompounds;
