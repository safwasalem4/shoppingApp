import React from 'react';
import Header from '../components/Header';
import Card from '../components/Card';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Alert,
} from 'react-native';
import {colors} from '../utils/colors';
import {height} from '../utils/dimensions';
import {useAppDispatch, useAppSelector} from '../utils/hooks';
import {changeQuantity, clearCart, removeItem} from '../store/cartSlice';
import {useNavigation, useTheme} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import Specification from '../components/Specification';
type RootStackParamList = {
  Home: undefined;
};

const Cart = ({}) => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(state => state.cart);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const {colors: themeColors} = useTheme();

  return (
    <>
      <View>
        <SafeAreaView />
        <Header title="Cart" backButton cart={false} />
        {data.cart.length == 0 ? (
          <Text style={styles.emptyScreen}>Not Data Found :(</Text>
        ) : (
          <FlatList
            data={data.cart}
            keyExtractor={(item: any) => item.id}
            onEndReachedThreshold={0.2}
            showsVerticalScrollIndicator={false}
            style={{
              maxHeight: height * 0.67,
            }}
            renderItem={({item, index}) => (
              <Card otherStyle={styles.card}>
                <Image source={{uri: item.thumbnail}} style={styles.image} />
                <View style={styles.details}>
                  <Text style={styles.productTitle} numberOfLines={1}>
                    {item.title}
                  </Text>
                  <View style={styles.subContainer}>
                    <Text style={styles.price}>{item.price} $</Text>
                    <View style={styles.quantityContainer}>
                      <TouchableOpacity
                        onPress={() => {
                          if (item.quantity == 1) {
                            dispatch(removeItem(item));
                          } else {
                            dispatch(
                              changeQuantity({
                                ...item,
                                quantity: item.quantity - 1,
                              }),
                            );
                          }
                        }}>
                        <Image
                          source={require('../assets/minus.png')}
                          style={styles.addAndMinusView}
                        />
                      </TouchableOpacity>
                      <Text style={styles.quantity}>{item.quantity}</Text>
                      <TouchableOpacity
                        onPress={() => {
                          dispatch(
                            changeQuantity({
                              ...item,
                              quantity: item.quantity + 1,
                            }),
                          );
                        }}>
                        <Image
                          source={require('../assets/add-2.png')}
                          style={styles.addAndMinusView}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Card>
            )}
          />
        )}

        {data.cart.length !== 0 && (
          <>
            <View style={styles.separator} />

            <View style={styles.summeryContainer}>
              <Text style={styles.summeryTitle}>Summery</Text>
              <View style={styles.summery}>
                <Text style={[styles.title, {color: themeColors.text}]}>
                  Total Products:{' '}
                </Text>
                <Text style={[styles.value, {color: themeColors.text}]}>
                  {data.totalQuantity}
                </Text>
              </View>
              <View style={styles.summery}>
                <Text style={[styles.title, {color: themeColors.text}]}>
                  Total Price:{' '}
                </Text>
                <Text style={[styles.value, {color: themeColors.text}]}>
                  {data.totalPrice} $
                </Text>
              </View>
            </View>
          </>
        )}
      </View>

      <TouchableOpacity
        disabled={data.cart.length == 0}
        style={[
          styles.buttonStyle,
          {
            backgroundColor:
              data.cart.length == 0 ? colors.lightGray : colors.blue,
          },
        ]}
        onPress={() => {
          dispatch(clearCart(null));
          Alert.alert('Success', 'purchase Order Done', [
            {
              text: 'Ok',
              style: 'cancel',
              onPress: () =>
                navigation.reset({index: 1, routes: [{name: 'Home'}]}),
            },
          ]);
        }}>
        <Text style={styles.buttonText}>Check Out</Text>
      </TouchableOpacity>
    </>
  );
};

export default Cart;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignContent: 'center',
    margin: 10,
  },
  details: {
    flex: 1,
    paddingHorizontal: 16,
  },
  image: {
    width: 70,
    height: 70,
  },
  subContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
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
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  addAndMinusView: {
    tintColor: colors.mainColor,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9,
  },
  separator: {
    height: 0.5,
    width: '95%',
    backgroundColor: colors.lightGray,
    alignSelf: 'center',
    marginTop: 16,
  },
  summeryContainer: {
    paddingHorizontal: 16,
  },
  summeryTitle: {
    fontSize: 18,
    color: colors.mainColor,
    fontWeight: 'bold',
    marginVertical: 16,
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
  },
  specification: {
    fontSize: 16,
  },
  buttonStyle: {
    position: 'absolute',
    paddingTop: 25,
    paddingBottom: 32,
    bottom: 0,
    width: '100%',
  },
  buttonText: {
    color: colors.white,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  emptyScreen: {
    textAlign: 'center',
    marginTop: height * 0.4,
    color: colors.mainColor,
    fontSize: 20,
    fontWeight: 'bold',
  },
  quantity: {
    fontSize: 19,
    marginHorizontal: 13,
  },
  summery: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
});
