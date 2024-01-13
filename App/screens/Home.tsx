import React from 'react';
import Container from '../components/Container';
import Header from '../components/Header';
import Card from '../components/Card';
import {Text, View, Image, StyleSheet} from 'react-native';
import {colors} from '../utils/colors';

const Home = () => {
  return (
    <Container cart backButton={false} headerTitle="Products">
      <Card otherStyle={style.card}>
        <Image
          source={{uri: 'https://via.placeholder.com/150'}}
          style={style.image}
        />
        <View style={style.details}>
          <View style={style.detailsContainer}>
            <Text style={style.title}>Title</Text>
            <Text style={style.price}>100 $</Text>
          </View>
          <Text style={style.subTitle} numberOfLines={1}>
            subTitlesubTitlesubTitlesubTitlesubTitlesubTitlesubTitlesubTitlesubTitlesubTitlesubTitlesubTitle
          </Text>
        </View>
      </Card>
    </Container>
  );
};

export default Home;

const style = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignContent: 'center',
  },
  detailsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  details: {
    flex: 1,
    paddingHorizontal: 16,
  },
  image: {
    width: 70,
    height: 70,
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 8,
  },
  subTitle: {
    fontSize: 16,
    color: colors.font,
  },
  price: {
    fontSize: 22,
    color: colors.darkGreen,
    fontWeight: 'bold',
  },
});
