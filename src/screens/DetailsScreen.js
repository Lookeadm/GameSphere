import React, { useEffect, useState } from 'react';
import { View, Image, } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { ButtonComponent, ColumnComponent, ContainerComponent, DividerComponent, HeaderComponent, RowComponent, SectionComponent, SeparatorComponent, SpaceComponent, TextComponent } from '../components';
import { appColors } from '../constants/appColors';
import config from '../apis/config';
import { faBookmark, faStar, faArrowUpRightFromSquare,  } from '@fortawesome/free-solid-svg-icons';
import CategoryItem from '../components/CategoriesComponent'
import { DownloadComponent, RatingComponent, ScreenshotComponent, UserRatingComponent } from './details/index';


const apiKey = config.API_KEY;
const urlGame = config.API_URL;

const DetailsScreen = ({ route }) => {
    const { game } = route.params;
    const [details, setDetails] = useState([]);
    const [progress, setProgress] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
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
        const uri = 'https://dw.uptodown.net/dwn/-0nWzQe3EtXCaSnQMxRr3V0-slrfB-m4R8FjbP5Jp2eUX7SvZrXEev2HggrvRe35V8WnNoUXkw5dOFKbmzIDAewS6diX1GQ2aPClDjMzh-pd6rP-sa9KM2OS8A29QPu-/ZCyXPFt4XRNhBnFZdfHdFyWU6-lGLLVcxaFIiAy0x5R3_QZgHMJGu_Yhht7RRhfhuRKNUm5ik5DG59xZ4QHcRWg29XfnJNqTFF3Xtd3jLy3o9Zaa-Z43FERgzvZLEwgp/v-xJ_MFvobTU3PMzpJK1mumbOw5fkH6LuRjG_YnnDSVB0vQ9BFBb2nx9Bd6QRSvjB5elt6y_CUPHh_A3HJdNx8pKNBuoQ7aF0ajcyjO4MPKU-2pIEJQuky7GBVhHSujy/genshin-impact-5-3-0-29183395-29332470.apk';

        const fileUri = `${FileSystem.documentDirectory}.apk`;

        const callback = (downloadProgress) => {
            const progress =
                downloadProgress.totalBytesExpectedToWrite > 0 ? // Kiểm tra xem tổng số byte có lớn hơn 0 không
                    downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite : 0; // Tính toán tiến trình
            setProgress(progress);

        };

        try {
            const downloadResumable = FileSystem.createDownloadResumable(uri, fileUri, {}, callback);
            const { uri: downloadedFileUri } = await downloadResumable.downloadAsync();
            alert(`Tệp đã được tải về: ${downloadedFileUri}`);
        } catch (error) {
            console.error(error);
            alert('Tải xuống thất bại!');
        }
    };

    const handlePauseResume = async () => {
    if (isPaused) {
        await downloadResumable.resumeAsync();
    } else {
        await downloadResumable.pauseAsync();
    }
    setIsPaused(prev => !prev); // Sử dụng hàm callback để cập nhật trạng thái
    };

    return (
        <>
            <HeaderComponent back detail navigation />
            <ContainerComponent
                isScroll
                back
                detail
            >
                <ScreenshotComponent images={screenshort()} />
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
                    <DownloadComponent/>
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
                        <UserRatingComponent />
                    </RowComponent>
                </SectionComponent>
            </ContainerComponent>
        </>
    );
};

export default DetailsScreen;