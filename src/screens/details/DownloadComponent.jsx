import React, { useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { appColors } from '../../constants/appColors';
import { ButtonComponent, SpaceComponent, TextComponent } from '../../components';
import { ProgressBar } from 'react-native-paper';

const DownloadButton = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [downloadResumable, setDownloadResumable] = useState(null);


    const handleDownload = async () => {
        setIsLoading(true);
        const uri = 'https://d-e02.winudf.com/b/XAPK/Y29tLm5ldG1hcmJsZS5zb2xvbHZfMTg5X2NkOTkwMmEz?_fn=U29sbyBMZXZlbGluZzpBcmlzZV8xLjIuMDVfQVBLUHVyZS54YXBr&_p=Y29tLm5ldG1hcmJsZS5zb2xvbHY%3D&download_id=otr_1610505076665999&is_hot=true&k=c6a29d4d6887dc639189242a3f98edd867873333&uu=https%3A%2F%2Fd-14.winudf.com%2Fb%2FXAPK%2FY29tLm5ldG1hcmJsZS5zb2xvbHZfMTg5X2NkOTkwMmEz%3Fk%3D9605d1cb5b400e118d17e839af23bd5767873333';

        const fileUri = `${FileSystem.documentDirectory}.apk`;

        const callback = (downloadProgress) => {
            const progressDownload =
                downloadProgress.totalBytesExpectedToWrite > 0 ? // Kiểm tra xem tổng số byte có lớn hơn 0 không
                    (downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite) * 100 : 0; // Tính toán tiến trình
            setProgress(Math.min(progressDownload, 100));
            setIsLoading(false);
        };

        try {
            const resumable = FileSystem.createDownloadResumable(uri, fileUri, {}, callback);
            setDownloadResumable(resumable); // Lưu `resumable` vào state để sử dụng lại

            await resumable.downloadAsync();

        } catch (error) {
            console.error('Lỗi trong quá trình tải xuống:', error);
        }
    };

    const handlePauseResume = async () => {
        if (!downloadResumable) return;

        if (isPaused) {
            await downloadResumable.resumeAsync();
        } else {
            await downloadResumable.pauseAsync();
        }
        setIsPaused((prev) => !prev);
    };

    const handleCancel = async () => {
        if (downloadResumable) {
            try {
                await downloadResumable.cancelAsync();
                setProgress(0);
                setDownloadResumable(null);
            } catch (error) {
                console.error('Lỗi khi hủy tải:', error);
            }
        }
    };

    return (
        <View>
            {progress <= 0 ? (
                <ButtonComponent
                    text="Download"
                    textColor={appColors.black}
                    textWeigth='bold'
                    borderColor={appColors.green}
                    color={appColors.green}
                    border
                    styles={{
                        width: '100%',
                        borderRadius: 10
                    }}
                    onPress={handleDownload}
                />
            ) : isLoading ? (
                <ActivityIndicator size="large" color={appColors.green} />
            ) : (
                <View style={{ width: '100%' }}>
                    <ProgressBar
                        progress={Math.round(progress) / 100}
                        color={appColors.green}
                        style={{
                            height: 35,
                            borderRadius: 10
                        }}
                    />
                    <Text style={{ color: appColors.green }}>{Math.round(progress)}%</Text>
                    <ButtonComponent
                        text="Hủy tải"
                        textColor={appColors.danger}
                        borderColor={appColors.danger}
                        border
                        styles={{
                            width: '100%',
                            borderRadius: 10,
                        }}
                        onPress={handleCancel}
                    />
                </View>
            )}

            <SpaceComponent height={10} />

            <ButtonComponent
                text="Download"
                textColor={appColors.green}
                borderColor={appColors.green}
                border
                styles={{
                    width: '100%',
                    orderRadius: 10,
                }}
            />
        </View>
    );
};

export default DownloadButton;