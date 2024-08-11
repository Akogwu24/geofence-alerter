import {
  SafeAreaView,
  FlatList,
  useWindowDimensions,
  StatusBar,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Platform,
} from 'react-native';
import React, { useRef, useState } from 'react';
import tw from 'twrnc';
import { ISlides, slides } from '../components/extras';
import { OnBoardingSlide } from '../components/OnboardingSlide';
import { COLORS, GOOGLE_PLACES_API_KEY } from '../utils/constatnts';
import { Footer } from '../components/Footer';

const Onboarding = () => {
  const { height, width } = useWindowDimensions();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const flatListRef = useRef<FlatList<ISlides> | null>(null);

  const updateCurrentSlideIndex = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const skip = () => {
    const lastSlideIndex = slides.length - 1;
    const offset = lastSlideIndex * width;
    flatListRef?.current?.scrollToOffset({ offset });
    setCurrentSlideIndex(lastSlideIndex);
  };

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex != slides.length) {
      const offset = nextSlideIndex * width;
      flatListRef?.current?.scrollToOffset({ offset });
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  return (
    <SafeAreaView
      style={[
        tw`flex-1 bg-[${COLORS.primary}]`,
        { marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : null },
        { paddingTop: Platform.OS === 'android' ? 14 : 0 },
      ]}
    >
      <StatusBar barStyle='light-content' />
      <FlatList
        ref={flatListRef}
        data={slides || []}
        renderItem={({ item }) => <OnBoardingSlide item={item} />}
        contentContainerStyle={{ height: height * 0.75 }}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        pagingEnabled
        onMomentumScrollEnd={updateCurrentSlideIndex}
      />
      <Footer skip={skip} goToNextSlide={goToNextSlide} currentSlideIndex={currentSlideIndex} />
    </SafeAreaView>
  );
};

export default Onboarding;
