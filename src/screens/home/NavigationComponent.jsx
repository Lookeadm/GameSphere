import { View, Text, StyleSheet, ScrollView, SafeAreaView, Animated } from 'react-native'
import React, { useRef } from 'react'
import { appColors } from '../../constants/appColors';
import { appInfo } from '../../constants/appInfos';
import SearchInputComponent from '../../components/SearchInputComponent';
import { faGamepad, faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

const NavigationComponent = () => {

  const AnimatedTextInput = Animated.createAnimatedComponent(Text);

  const animatedValue = useRef(new Animated.Value(0)).current;

  const featureInputAnimation = {
    transform: [
      {
        scaleX: animatedValue.interpolate({
          inputRange: [0, 30],
          outputRange: [1, 0],
          extrapolate: 'clamp',
        }),
      },
    ],
    opacity: animatedValue.interpolate({
      inputRange: [0, 25],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    }),
  }

  const depositViewAnimation = {
    transform: [
      {
        translateX: animatedValue.interpolate({
          inputRange: [0, 80],
          outputRange: [0, 36],
          extrapolate: 'clamp',
        }),
      },
      {
        translateY: animatedValue.interpolate({
          inputRange: [0, 100],
          outputRange: [0, -50],
          extrapolate: 'clamp',
        }),
      }
    ]
  }

  const featureIconCircleAnimation = {
    transform: [
      {
        opacityY: animatedValue.interpolate({
          inputRange: [0, 25],
          outputRange: [1, 0],
          extrapolate: 'clamp',
        }),
      }
    ]
  }

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.upperHeaderPlaceholder} />
      </SafeAreaView>
      <SafeAreaView style={styles.header}>
        <View style={styles.upperHeader}>
          
        </View>
        <View style={styles.lowerHeader}>
          <Animated.View style={[styles.feature, depositViewAnimation]}>
            <FontAwesomeIcon
              icon={faGamepad}
              size={30}
            />
            <FontAwesomeIcon
              icon={faGamepad}
              size={20}
            />
            <Animated.Text style={[styles.featureName, featureInputAnimation]}>Genres</Animated.Text>
          </Animated.View>
          <View style={styles.feature}>
            <FontAwesomeIcon
              icon={faGamepad}
              size={30}
            />
            <FontAwesomeIcon
              icon={faGamepad}
              size={20}
            />
            <Animated.Text style={[styles.featureName, featureInputAnimation]}>Genres</Animated.Text>
          </View>
          <View style={styles.feature}>
            <FontAwesomeIcon
              icon={faGamepad}
              size={30}
            />
            <FontAwesomeIcon
              icon={faGamepad}
              size={20}
            />
            <Animated.Text style={[styles.featureName, featureInputAnimation]}>Genres</Animated.Text>
          </View>
          <View style={styles.feature}>
            <FontAwesomeIcon
              icon={faGamepad}
              size={30}
            />
            <FontAwesomeIcon
              icon={faGamepad}
              size={20}
            />
            <Animated.Text style={[styles.featureName, featureInputAnimation]}>Genres</Animated.Text>
          </View>
        </View>
      </SafeAreaView>
      <ScrollView
        onScroll={e => {
          const offsetY = e.nativeEvent.contentOffset.y;
          animatedValue.setValue(offsetY);
        }}
        scrollEventThrottle={16}
      >
        <View style={styles.paddingForHeader} />
        <View style={styles.scrollView} />
      </ScrollView>
    </View>
  )
}

export default NavigationComponent;

const UPPER_HEADER_HEIGHT = 90;
const LOWER_HEADER_HEIGHT = 90;

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    borderRadius: 18,
    borderColor: appColors.gray3,
    width: 330,
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#2A2A2A',
    height: 40,
  },
  searchInput: {
    flex: 1,
    color: '#787878',
    fontSize: 14,
  },
  container: {
    flex: 1
  },
  upperHeaderPlaceholder: {
    height: UPPER_HEADER_HEIGHT,
  },
  header: {
    position: 'absolute',
    width: '100%',
    backgroundColor: appColors.white,
  },
  scrollView: {
    height: appInfo.sizes.HEIGHT * 2,
    backgroundColor: appColors.gray,
  },
  upperHeader: {
    marginTop: 40,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  lowerHeader: {
    height: LOWER_HEADER_HEIGHT,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 16,
  },
  feature: {
    alignItems: 'center',
  },
  featureIconCircle: {
    width: 40,
    height: 40,
  },
  featureName: {
    fontWeight: 'bold',
    fontSize: 12,
    lineHeight: 14,
    color: appColors.black,
  },
  paddingForHeader: {
    height: LOWER_HEADER_HEIGHT,
  },

})