import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

const HomeScreen = ({navigation})=>{
    const [games, setGames] = useState([]);

    useEffect(()=>{
        axios.get('https://www.freetogame.com/api/games')
        .then(response => setGames(response.data))
        .catch(error => console.error(error)
        );
    }, []);

    const renderGame = ({item})=>(
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Details', { game: item })}>
            <Image source={{ uri: item.thumbnail }} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList 
                data={games}
                keyExtractor={(item) => item.id}
                renderItem={renderGame}
            />

        </View>
    );
};
const styles = StyleSheet.create({
    container: { flex: 1, padding: 10 },
    card: { marginBottom: 10, borderRadius: 10, overflow: 'hidden', backgroundColor: '#fff', elevation: 2 },
    image: { width: '100%', height: 150 },
    title: { padding: 10, fontSize: 16, fontWeight: 'bold' },
});

export default HomeScreen;