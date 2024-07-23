// Filename: index.js
// Combined code from all files

import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TextInput, Button, ActivityIndicator, ScrollView } from 'react-native';
import axios from 'axios';

const API_URL = "http://apihub.p.appply.xyz:3300/chatgpt";

export default function App() {
    const [hero, setHero] = useState('');
    const [villain, setVillain] = useState('');
    const [plot, setPlot] = useState('');
    const [story, setStory] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const fetchStory = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post(API_URL, {
                messages: [
                    { role: "system", content: "You are a helpful assistant. Create a fairy tale based on given heroes, villains, and plot." },
                    { role: "user", content: `Hero: ${hero}. Villain: ${villain}. Plot: ${plot}` }
                ],
                model: "gpt-4o"
            });
            const resultString = response.data.response;
            setStory(resultString);
        } catch (error) {
            console.error("Error fetching the story:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <Text style={styles.title}>Fairy Tale Generator</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Hero"
                    value={hero}
                    onChangeText={setHero}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Enter Villain"
                    value={villain}
                    onChangeText={setVillain}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Enter Plot"
                    value={plot}
                    onChangeText={setPlot}
                />
                <Button title="Generate Fairy Tale" onPress={fetchStory} />
                
                {isLoading ? (
                    <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />
                ) : (
                    <Text style={styles.story}>{story}</Text>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        backgroundColor: '#FFFFFF',
        padding: 20,
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        marginBottom: 10,
    },
    loading: {
        marginTop: 20,
    },
    story: {
        marginTop: 20,
        fontSize: 16,
        color: '#333333',
        textAlign: 'justify',
    },
});