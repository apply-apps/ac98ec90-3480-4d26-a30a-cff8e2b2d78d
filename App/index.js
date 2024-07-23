// Filename: index.js
// Combined code from all files

import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, Button, ScrollView, View, ActivityIndicator } from 'react-native';
import axios from 'axios';

const StoryDisplay = ({ story }) => {
  return (
    <View style={displayStyles.container}>
      {story ? <Text style={displayStyles.storyText}>{story}</Text> : <Text style={displayStyles.placeholder}>Your story will appear here...</Text>}
    </View>
  );
};

const displayStyles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  storyText: {
    fontSize: 16,
    lineHeight: 24,
  },
  placeholder: {
    fontSize: 16,
    lineHeight: 24,
    color: '#CCCCCC',
  },
});

export default function App() {
  const [heroes, setHeroes] = useState('');
  const [villains, setVillains] = useState('');
  const [plot, setPlot] = useState('');
  const [story, setStory] = useState('');
  const [loading, setLoading] = useState(false);

  const generateStory = async () => {
    setLoading(true);
    const API_URL = 'http://apihub.p.appply.xyz:3300/chatgpt';
    try {
      const response = await axios.post(API_URL, {
        messages: [
          { role: 'system', content: 'You are a helpful assistant. Please provide answers for given requests.' },
          {
            role: 'user',
            content: `Generate a fairy tale with the following details: 
                      Heroes: ${heroes}, 
                      Villains: ${villains}, 
                      Plot: ${plot}.`
          }
        ],
        model: 'gpt-4o'
      });
      const { data } = response;
      const resultString = data.response;
      setStory(resultString);
    } catch (error) {
      console.error(error);
      setStory('An error occurred while generating the story.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.title}>Fairy Tales Generator</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Heroes</Text>
          <TextInput
            style={styles.input}
            value={heroes}
            onChangeText={setHeroes}
            placeholder="Enter heroes"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Villains</Text>
          <TextInput
            style={styles.input}
            value={villains}
            onChangeText={setVillains}
            placeholder="Enter villains"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Plot</Text>
          <TextInput
            style={styles.input}
            value={plot}
            onChangeText={setPlot}
            placeholder="Enter plot"
          />
        </View>
        <Button title="Generate Story" onPress={generateStory} />
        {loading && <ActivityIndicator size="large" color="#0000ff" />}
        <StoryDisplay story={story} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    paddingTop: 50,
  },
  scrollViewContent: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});