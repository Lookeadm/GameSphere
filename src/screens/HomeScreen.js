import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import CardComponent from '../components/CardComponent';
import InputComponent from '../components/InputComponent';
import { ColumnComponent, RowComponent, SectionComponent, SeparatorComponent, SpaceComponent } from '../components';
import SearchInputComponent from '../components/SearchInputComponent';
import CategoryItem from '../components/CategoriesComponent';
import { globalStyles } from '../styles/globalStyles';
import AppItemComponent from '../components/AppItemComponent';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faGamepad, faFire, faClock, faStar, faBell } from '@fortawesome/free-solid-svg-icons';



const HomeScreen = ({ navigation }) => {
    const [games, setGames] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get('https://www.freetogame.com/api/games')
            .then(response => setGames(response.data))
            .catch(error => console.error(error));
    }, []);

    const renderHorizontalGames = ({ item }) => (
        <TouchableOpacity 
            onPress={() => navigation.navigate('Details', { game: item })}
            activeOpacity={1}
        >
            <AppItemComponent
                title={item.title}
                image={item.thumbnail}
            />
        </TouchableOpacity>
    );

    const renderGame = ({ item, index }) => {
        if (index % 4 === 3) {
            const horizontalGames = games.slice(index, index + 4); // Lấy 4 game tiếp theo
            return (
                <>
                <View>
                    <SpaceComponent height={20}/>
                    <FlatList
                        data={horizontalGames}
                        keyExtractor={(game) => game.id.toString()}
                        renderItem={renderHorizontalGames}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{
                            flexDirection: 'row',
                            gap: 3,
                        }}
                    />
                </View>
                <View style={globalStyles.divider} />
                </>
            );
        }
        return (
            <TouchableOpacity 
                onPress={() => navigation.navigate('Details', { game: item })}
                activeOpacity={1}
            >
                <CardComponent
                    title={item.title}
                    image={item.thumbnail}
                    rating={item.rating}
                    categories={item.genre}
                    flatform={item.platform}
                    video={item.video}
                />
            </TouchableOpacity>
        );
    };

    return (
        <View>
            <SectionComponent>
            <SpaceComponent height={40} />
                <RowComponent
                    justify="space-between"
                    styles={{
                        flexDirection: 'row'
                    }}
                >    
                    <SearchInputComponent placeholder="Search games..." />
                    <FontAwesomeIcon 
                        icon={faBell} 
                        style={{color: "#ffffff",}} 
                        size={24}
                    />
                </RowComponent>
            </SectionComponent>
            <View style={globalStyles.divider} />
            <SectionComponent
                styles={{
                    marginTop: '10'
                }}
            >
                <RowComponent
                    justify="space-between"
                >
                    <CategoryItem
                        iconName={faGamepad}
                        categoryName="Genres"
                    />
                    <CategoryItem
                        iconName={faFire}
                        categoryName="New Releases"
                    />
                    <CategoryItem
                        iconName={faClock}
                        categoryName="Upcoming"
                    />
                    <CategoryItem
                        iconName={faStar}
                        categoryName="Top Rated"
                    />
                </RowComponent>
            </SectionComponent>
            <FlatList
                data={games}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderGame}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

export default HomeScreen;