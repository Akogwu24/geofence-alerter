import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import { slides } from './extras';
import { useRouter } from 'expo-router';

type TFooterProps = {
  skip: () => void;
  goToNextSlide: () => void;
  currentSlideIndex: number;
};

export function Footer({ skip, goToNextSlide, currentSlideIndex }: TFooterProps) {
  const router = useRouter();

  return (
    <>
      {currentSlideIndex < slides.length - 1 ? (
        <>
          <View style={tw`h-[21%] gap-y-10 px-20 justify-between`}>
            {/* Indicator container */}
            <View style={tw`flex-row justify-center gap-x-2 mt-10`}>
              {slides.map((_, index) => (
                <View
                  key={index}
                  style={[
                    tw`h-[7px] w-[4] bg-neutral-500 rounded`,
                    currentSlideIndex == index && {
                      backgroundColor: 'white',
                      width: 40,
                    },
                  ]}
                />
              ))}
            </View>

            <View style={tw`flex-row gap-x-5 w-full flex-1`}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={tw`flex-1 h-[12] rounded bg-white justify-center items-center bg-transparent border-2 border-white`}
                onPress={skip}
              >
                <Text style={tw`font-bold text-base text-white`}>SKIP</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={goToNextSlide}
                style={tw`flex-1 h-[12] rounded bg-white justify-center items-center`}
              >
                <Text style={tw`font-bold text-base`}>NEXT</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      ) : (
        <View style={tw`flex-1 px-5`}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.replace('map')}
            style={tw` h-[50px]  rounded bg-white justify-center items-center`}
          >
            <Text style={tw`font-bold text-base`}>Get Started</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}
