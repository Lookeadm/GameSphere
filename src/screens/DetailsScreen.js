import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { ButtonComponent, ColumnComponent, ContainerComponent, DividerComponent, HeaderComponent, RowComponent, SectionComponent, SeparatorComponent, SpaceComponent, TextComponent } from '../components';
import { appColors } from '../constants/appColors';
import config from '../apis/config';
import { faBookmark, faStar, faArrowUpRightFromSquare, faApple, faAndroid } from '@fortawesome/free-solid-svg-icons';
import CategoryItem from '../components/CategoriesComponent'
import {RatingComponent, ScreenshotComponent, UserRatingComponent} from './details/index';

const apiKey = config.API_KEY;
const urlGame = config.API_URL;

const DetailsScreen = ({ route }) => {
    const { game } = route.params;
    const [details, setDetails] = useState([]);
    const gameId = game.id;
    const urlDev = `${urlGame}/${gameId}?key=${apiKey}`;
    const genres = () => {
        return game.genres.slice(0, 3).map((genre, index) => (
            <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TextComponent
                    text={genre.name}
                    color={appColors.gray6}
                    size={12}
                />
                {index < game.genres.slice(0, 3).length - 1 && <SeparatorComponent />}
            </View>
        ));
    }
    const screenshort = () => {
        try {
            const imageUrls = game.short_screenshots.map((screenshort) => {
                return screenshort.image; // Trả về URI hình ảnh
            });
            return imageUrls;
        } catch (error) {
            console.error('Error fetching screenshots:', error);
            return null;
        }
    }

    useEffect(() => {
        fetch(urlDev)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setDetails(data);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }, []);

    const developer = () => {
        try {
            return details.developers.slice(0, 1).map((developer, index) => (
                <View key={index}>
                    <TextComponent
                        text={developer.name}
                        color={appColors.gray6}
                        size={12}
                    />
                    {index < details.developers.slice(0, 1)}
                </View>
            ))
        } catch (error) {

        }
    }

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
        <>
            <HeaderComponent back detail navigation />
            <ContainerComponent
                isScroll
                back
                detail
            >
                <ScreenshotComponent images={screenshort()}/>
                <SpaceComponent height={15} />
                <SectionComponent>
                    <RowComponent
                        styles={{
                            marginBottom: 10
                        }}
                    >
                        <Image source={{ uri: game.background_image }} style={{ width: 70, height: 70, borderRadius: 15 }} />
                        <SpaceComponent width={15} />
                        <ColumnComponent>
                            <TextComponent
                                size={16}
                                text={game.name}
                                fontWeight='bold'
                                color={appColors.white}
                                numberOfLines={1}
                                styles={{
                                    width: '100%'
                                }}
                            />
                            <TextComponent
                                text={genres()}
                                color={appColors.gray6}
                                size={12}
                            />
                            <TextComponent
                                size={12}
                                text={developer()}
                                color={appColors.gray6}
                                numberOfLines={1}
                                styles={{
                                    width: 180
                                }}
                            />
                        </ColumnComponent>
                    </RowComponent>
                    <TextComponent
                        text={details.description_raw}
                        numberOfLines={2}
                        color={appColors.gray5}
                        size={15}
                    />
                </SectionComponent>
                <DividerComponent />
                <SectionComponent>
                    <ButtonComponent
                        text="Download"
                        textColor={appColors.black}
                        textWeigth='bold'
                        borderColor={appColors.green}
                        color={appColors.green}
                        border
                        styles={{
                            width: '100%',
                            borderRadius: 20
                        }}
                    />
                    <SpaceComponent height={10} />
                    <ButtonComponent
                        text="Download"
                        textColor={appColors.green}
                        borderColor={appColors.green}
                        border
                        styles={{
                            width: '100%'
                        }}
                    />
                </SectionComponent>

                <SectionComponent>
                    <RowComponent>
                        <CategoryItem
                            iconName={faBookmark}
                            categoryName="Whislist"
                            sizeIcon={24}
                        />
                        <SpaceComponent width={40} />
                        <CategoryItem
                            iconName={faStar}
                            categoryName="Played"
                            sizeIcon={24}
                        />
                        <SpaceComponent width={40} />
                        <CategoryItem
                            iconName={faArrowUpRightFromSquare}
                            categoryName="Share"
                            sizeIcon={24}
                        />
                    </RowComponent>
                </SectionComponent>
                <DividerComponent />
                <SectionComponent>
                    <RatingComponent />
                </SectionComponent>
                <SectionComponent>
                    <RowComponent
                        justify='space-between'
                    >
                        <TextComponent
                            text='My Rating'
                            color={appColors.white}
                        />
                        <UserRatingComponent/>
                    </RowComponent>
                </SectionComponent>
            </ContainerComponent>
        </>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    image: { width: '100%', height: 200, borderRadius: 10 },
    title: { fontSize: 20, fontWeight: 'bold', marginVertical: 10 },
    description: { fontSize: 16, color: '#666', marginBottom: 20 },
});

export default DetailsScreen;