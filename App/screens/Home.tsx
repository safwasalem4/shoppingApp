import React, {useEffect, useState} from 'react';
import Header from '../components/Header';
import Card from '../components/Card';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import {colors} from '../utils/colors';
import {useAppDispatch, useAppSelector} from '../utils/hooks';
import {insertProducts} from '../store/productsSlice';

const Home = ({navigation}) => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(state => state.products);
  const [refresh, setRefresh] = useState(false);
  const [skip, setSkip] = useState(0);

  useEffect(() => {
    dispatch(insertProducts({data: skip}));
    setRefresh(false);
  }, [skip, refresh]);

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <Header title="Products" backButton={false} />
      <FlatList
        refreshing={refresh}
        style={styles.flatList}
        data={data.allProducts}
        onEndReachedThreshold={0.2}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item: any) => item.id}
        renderItem={({item, index}) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ProductDetails', {
                item: item,
              })
            }>
            <Card otherStyle={styles.card}>
              <Image source={{uri: item.thumbnail}} style={styles.image} />
              <View style={styles.detailsContainer}>
                <View style={styles.details}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.price}>{item.price} $</Text>
                </View>
                <Text style={styles.subTitle} numberOfLines={2}>
                  {item.description}
                </Text>
              </View>
            </Card>
          </TouchableOpacity>
        )}
        ListFooterComponent={() => {
          if (data?.skip < data?.total || data?.loading)
            return <ActivityIndicator color={colors.maincolor} />;
          else return null;
        }}
        onEndReached={() => {
          if (data?.skip < data?.total) {
            setSkip(skip + 10);
          }
        }}
        onRefresh={() => {
          setRefresh(true);
          setSkip(0);
        }}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatList: {
    height: '100%',
    width: '100%',
  },
  card: {
    flexDirection: 'row',
    alignContent: 'center',
    margin: 8,
  },
  detailsContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  image: {
    width: 90,
    height: 90,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
  },
  subTitle: {
    fontSize: 16,
    color: colors.font,
  },
  price: {
    fontSize: 18,
    color: colors.maincolor,
    fontWeight: 'bold',
  },
});
