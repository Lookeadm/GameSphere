import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import CardComponent from '../components/CardComponent';
import InputComponent from '../components/InputComponent';
import { ColumnComponent, RowComponent, SectionComponent, SeparatorComponent, SpaceComponent, DividerComponent, TextComponent } from '../components';
import SearchInputComponent from '../components/SearchInputComponent';
import CategoryItem from '../components/CategoriesComponent';
import { globalStyles } from '../styles/globalStyles';
import AppItemComponent from '../components/AppItemComponent';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faGamepad, faFire, faClock, faStar, faBell } from '@fortawesome/free-solid-svg-icons';
import config from '../apis/config';
import { appColors } from '../constants/appColors';

const apiKey = config.API_KEY;
const url = config.API_URL;

const HomeScreen = ({ navigation }) => {
    const [games, setGames] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        // axios.get('https://www.freetogame.com/api/games')
        //     .then(response => setGames(response.data))
        //     .catch(error => console.error(error));
        fetch(`${url}?key=${apiKey}&page_size=10&platforms=3&`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setGames(data.results) // In ra dữ liệu JSON
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });

    }, []);

    const renderHorizontalGames = ({ item }) => (
        <TouchableOpacity
            onPress={() => navigation.navigate('Details', { game: item })}
            activeOpacity={1}
        >
            <AppItemComponent
                title={item.name}
                image={item.background_image}
            />
        </TouchableOpacity>
    );

    const renderGame = ({ item, index }) => {
        if (index % 4 === 3) {
            const horizontalGames = games.slice(index, index + 4); // Lấy 4 game tiếp theo
            return (
                <>
                    <View>
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
                        <DividerComponent/>
                    </View>
                </>
            );
        }
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate('Details', { game: item })}
                activeOpacity={1}
            >
                <CardComponent
                    title={item.name}
                    image={item.background_image}
                    rating={item.rating}
                    genres={item.genres.slice(0, 3).map((genre, index) => (
                        <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TextComponent
                                text={genre.name}
                                color={appColors.gray6}
                                size={12}
                                />
                            {index < item.genres.slice(0, 3).length - 1 && <SeparatorComponent />}
                        </View>
                    ))}
                    // genres = {item.genres.slice(0, 3).map(genre=> genre.name).join(' • ')}
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
                        style={{ color: "#ffffff", }}
                        size={24}
                    />
                </RowComponent>
            </SectionComponent>
            <DividerComponent/>
            <SectionComponent>
                <RowComponent
                    justify="space-between"
                >
                    <CategoryItem
                        iconName={faGamepad}
                        categoryName="Genres"
                        sizeIcon={34}
                        sizeText={14}
                    />
                    <CategoryItem
                        iconName={faFire}
                        categoryName="New Releases"
                        sizeIcon={34}
                        sizeText={14}
                    />
                    <CategoryItem
                        iconName={faClock}
                        categoryName="Upcoming"
                        sizeIcon={34}
                        sizeText={14}
                    />
                    <CategoryItem
                        iconName={faStar}
                        categoryName="Top Rated"
                        sizeIcon={34}
                        sizeText={14}
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