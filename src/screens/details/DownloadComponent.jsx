import React,  {useState} from 'react';
import { View } from 'react-native';

import { appColors } from '../../constants/appColors';
import { ButtonComponent, SpaceComponent, TextComponent } from '../../components';

const DownloadButton = () => {
    const [progress, setProgress] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

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
        <View>
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
                onPress={handleDownload}
            />
            <SpaceComponent height={10} />
            {progress > 0 && (
                <View style={{ marginTop: 20, width: '100%' }}>
                    <Text>Tiến trình: {Math.round(progress * 100)}%</Text>
                </View>
            )}
            <SpaceComponent height={10} />
            <ButtonComponent
                text={isPaused ? "Tiếp tục tải" : "Tạm dừng tải"}
                textColor={appColors.green}
                borderColor={appColors.green}
                border
                styles={{
                    width: '100%'
                }}
                onPress={handlePauseResume}
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
        </View>
    );
};

export default DownloadButton;