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
        const uri = 'https://apk.nestvui.com/BANDISHARE/TikTok_MOD/TikTok_v38.1.1_MOD_BANDISHARE.apk';

        const fileUri = `${FileSystem.documentDirectory}.apk`;

        let previousProgress = -1

        const callback = (downloadProgress) => {
            const progressDownload = downloadProgress.totalBytesExpectedToWrite > 0
                ? Math.min((downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite) * 100, 100)
                : 0;

            const roundedProgress = Math.round(progressDownload * 100) / 100; // Làm tròn đến 2 chữ số thập phân
            setProgress(roundedProgress / 100); // Chuyển đổi về dạng phần trăm
            
            setIsLoading(false);

            if (roundedProgress !== previousProgress * 100) { // Kiểm tra tiến trình có thay đổi không
                console.log(roundedProgress / 100);  // Log giá trị tiến trình đã làm tròn và chia cho 100
                previousProgress = roundedProgress / 100; // Cập nhật giá trị tiến trình trước đó
            }
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
            try {
                await downloadResumable.cancelAsync();
                setProgress(0);
                setDownloadResumable(null);
                console.log('Hủy tải thành công');
            } catch (error) {
                console.error('Lỗi khi hủy tải:', error);
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
                        progress={parseFloat(Math.round(progress*100)/100)} 
                        color={appColors.green}
                        style={{
                            height: 35,
                            borderRadius: 10
                        }}
                    />
                    <Text style={{ color: appColors.green }}>{(progress)*100}%</Text>
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