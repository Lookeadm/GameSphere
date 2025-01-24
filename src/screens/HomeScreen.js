import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import CardComponent from '../components/CardComponent';
import { RowComponent, SectionComponent, SeparatorComponent, SpaceComponent, DividerComponent, TextComponent } from '../components';
import SearchInputComponent from '../components/SearchInputComponent';
import CategoryItem from '../components/CategoriesComponent';
import AppItemComponent from '../components/AppItemComponent';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import config from '../apis/config';
import { appColors } from '../constants/appColors';
import CategoriesComponent from './home/CategoriesComponent';
import SwiperGames from './home/SwiperGames';
import PagerView from 'react-native-pager-view';

const apiKey = config.API_KEY;
const url = config.API_URL;

const HomeScreen = ({ navigation }) => {
    const [games, setGames] = useState([]);
    const dispatch = useDispatch();
    const [selectedIndex, setSelectedIndex] = useState(0)

    useEffect(() => {
        fetch(`${url}?key=${apiKey}&page_size=20&platforms=3&`)
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
        if (index === 0) {
            return (
                <View>
                    <SectionComponent>
                        <SwiperGames />
                    </SectionComponent>
                </View>
            );
        }
        if (index % 4 === 3) {
            const horizontalGames = games.slice(index, index + 4); // Lấy 4 game tiếp theo
            return (
                <>
                    <View>
                        <CategoriesComponent />
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
                        <DividerComponent />
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

    const renderTopChart = ({ item, index }) => {
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate('Details', { game: item })}
                activeOpacity={1}
            >
                <CardComponent
                    topChart
                    number={index + 1}
                    title={item.name}
                    image={item.background_image}
                    rating={item.rating}
                    genres={item.genres.slice(0, 2).map((genre, index) => (
                        <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TextComponent
                                text={genre.name}
                                color={appColors.gray6}
                                size={12}
                            />
                            {index < item.genres.slice(0, 2).length - 1 && <SeparatorComponent />}
                        </View>
                    ))}
                // genres = {item.genres.slice(0, 3).map(genre=> genre.name).join(' • ')}
                />
            </TouchableOpacity>
        )
    }

    const renderPage = (type) => {
        const renderItem = type === 'topChart' ? renderTopChart : renderGame;
        return (
            <FlatList
                data={games}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <Text>No games available at the moment.</Text>
                }
            />
        );
    };

    const handlePageChange = (event) => {
        setSelectedIndex(event.nativeEvent.position); // Cập nhật trang hiện tại
    };

    return (
        <View>

            <SectionComponent>
                <SpaceComponent height={40} />
                <RowComponent justify="space-between">
                    <SearchInputComponent home />
                    <FontAwesomeIcon icon={faBell} size={24} />
                </RowComponent>
            </SectionComponent>

            <DividerComponent />

            <SectionComponent>
                <CategoryItem index={selectedIndex}/>
            </SectionComponent>

            <View style={{}}>
                <PagerView style={{ height: '100%', width: '100%' }} initialPage={0} onPageSelected={handlePageChange}>
                    <View key="1">{renderPage('game')}</View>
                    <View key="2">{renderPage('topChart')}</View>
                </PagerView>
            </View>
        </View>
    );
};

export default HomeScreen;