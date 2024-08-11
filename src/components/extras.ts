export interface ISlides {
  id: string;
  image: string;
  title: string;
  subtitle: string;
}

export const slides: ISlides[] = [
  {
    id: '1',
    image: require('../../assets/images/africa.jpg'),
    title: 'Built with Love For ETAP',
    subtitle:
      'Get instant cover, make instant claims, pay flexibly and get rewarded for driving safely',
  },
  {
    id: '2',
    image: require('../../assets/images/point.jpg'),
    title: 'Select you desired zone on the map',
    subtitle: 'The App let you know if you are with 500m from the center of the selected point',
  },
  {
    id: '3',
    image: require('../../assets/images/3d.jpg'),
    title: 'Allow the app to use your location',
    subtitle: 'Without you location is the app knows where you are in real time',
  },
];
