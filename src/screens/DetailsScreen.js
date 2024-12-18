import React from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import * as FileSystem from 'expo-file-system';

const DetailsScreen = ({ route }) => {
    const { game } = route.params;

    const handleDownload = async () => {
        const uri = game.downloadLink;
        const fileUri = `${FileSystem.documentDirectory}${game.name}.apk`;

        try {
            const { uri: downloadedFileUri } = await FileSystem.downloadAsync(uri, fileUri);
            alert(`Tệp đã được tải về: ${downloadedFileUri}`);
        } catch (error) {
            console.error(error);
            alert('Tải xuống thất bại!');
        }
    };

    return (
        <View style={styles.container}>
            <Image source={{ uri: game.thumbnail }} style={styles.image} />
            <Text style={styles.title}>{game.title}</Text>
            <Text style={styles.description}>{game.short_description}</Text>
            <Button title="Tải xuống" onPress={handleDownload} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    image: { width: '100%', height: 200, borderRadius: 10 },
    title: { fontSize: 20, fontWeight: 'bold', marginVertical: 10 },
    description: { fontSize: 16, color: '#666', marginBottom: 20 },
});

export default DetailsScreen;