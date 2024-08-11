import { View, Text, Image, useWindowDimensions, ImageSourcePropType } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import { ISlides } from './extras';

export function OnBoardingSlide({ item }: { item: ISlides }) {
  const { width } = useWindowDimensions();

  return (
    <View style={tw`w-[${width}px] gap-y-10`}>
      <View style={tw`w-full h-[50%] items-center justify-center`}>
        <Image
          style={{
            width: '80%',
            height: '100%',
            justifyContent: 'center',
            borderRadius: 20,
            resizeMode: 'cover',
          }}
          source={item?.image as ImageSourcePropType}
        />
      </View>

      <View style={tw`gap-y-4 px-4`}>
        <Text style={tw`text-white  text-3xl text-center font-bold`}>{item?.title}</Text>
        <Text style={tw`text-white text-lg text-center font-bold`}>{item?.subtitle}</Text>
      </View>
    </View>
  );
}
