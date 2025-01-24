// import { View, Text } from 'react-native'
// import React from 'react'
// import * as Permissions from 'expo-permissions';
// import * as Linking from 'expo-linking';
// import { DownloadContext } from '../../context/DownloadContext';

// const FileInstall = () => {
//   const { downloadedFileUri } = useContext(DownloadContext);

//   const requestStoragePermission = async () => {
//     const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY_WRITE_ONLY);
//     if (status !== 'granted') {
//       alert('Quyền truy cập bộ nhớ bị từ chối!');
//       return false;
//     }
//     return true;
//   }
//   requestStoragePermission();

//   const openFile = async (fileUri) => {
//     try {
//       await Linking.openURL(fileUri);
//     } catch (error) {
//       console.error('Không thể mở file:', error);
//     }
//   };

//   return (
//     <View>
//       {downloadedFileUri && ( // Kiểm tra nếu có file đã tải về
//         <ButtonComponent
//           text="Mở file đã tải về"
//           onPress={() => openFile(downloadedFileUri)} // Mở file khi nhấn
//         />
//       )}
//     </View>
//   )
// }

// export default FileInstall