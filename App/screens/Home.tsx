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
  Switch,
} from 'react-native';
import {colors} from '../utils/colors';
import {useAppDispatch, useAppSelector} from '../utils/hooks';
import {getProducts} from '../store/productsSlice';
import {changeTheme} from '../store/themeSlice';

const Home = ({navigation}) => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(state => state.products);
  const theme = useAppSelector(state => state.theme.theme);
  const [refresh, setRefresh] = useState(false);
  const [skip, setSkip] = useState(0);

  const toggleSwitch = () => {
    if (theme == 'light') {
      dispatch(changeTheme('dark'));
    } else {
      dispatch(changeTheme('light'));
    }
  };

  useEffect(() => {
    dispatch(getProducts({data: skip}));
    setRefresh(false);
  }, [skip, refresh]);

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <Header title="Products" backButton={false} />
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
          paddingHorizontal: 16,
        }}>
        <Text
          style={{
            color: colors.mainColor,
            fontWeight: 'bold',
            fontSize: 16,
          }}>
          Dark theme
        </Text>
        <Switch
          style={{transform: [{scaleX: 0.75}, {scaleY: 0.75}]}}
          trackColor={{false: '#767577', true: colors.white}}
          thumbColor={theme == 'dark' ? colors.mainColor : '#f4f3f4'}
          ios_backgroundColor="#767577"
          onValueChange={toggleSwitch}
          value={theme == 'dark'}
        />
      </View>
      <FlatList
        data={data.allProducts}
        refreshing={refresh}
        style={styles.flatList}
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
            return <ActivityIndicator color={colors.mainColor} />;
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
    color: colors.mainColor,
    fontWeight: 'bold',
  },
});
