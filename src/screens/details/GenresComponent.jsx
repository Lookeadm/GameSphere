import React from 'react';
import { View } from 'react-native';
import { SeparatorComponent, TextComponent } from '../../components';
import { appColors } from '../../constants/appColors';


const GenresComponent = (genres) => {
    return (
        <View>
            {genres.slice(0, 3).map((genre, index) => (
                <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TextComponent
                        text={genre.name}
                        color={appColors.gray6}
                        size={12}
                    />
                    {index < 2 && <SeparatorComponent />}
                </View>
            ))}
        </View>
    );
};

export default GenresComponent;