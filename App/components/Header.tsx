import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../utils/colors';
import {HeaderProps} from './IComponents';
import {useAppSelector} from '../utils/hooks';
import {useNavigation, useTheme} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
type RootStackParamList = {
  Cart: undefined;
};

const Header = ({
  title,
  backgroundColor,
  backButton = true,
  cart = true,
}: HeaderProps) => {
  const cartLength = useAppSelector(state => state.cart.totalQuantity);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const {colors: themeColors} = useTheme();

  return (
    <View style={[style.container, {backgroundColor}]}>
      <View style={style.subContainer}>
        {backButton && (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign
              name="arrowleft"
              style={[style.backIcon, {color: themeColors.text}]}
            />
          </TouchableOpacity>
        )}
        <Text
          numberOfLines={1}
          style={[style.title, {color: themeColors.text}]}>
          {title}
        </Text>
        {cart && (
          <TouchableOpacity
            onPress={() => navigation.navigate('Cart')}
            style={style.cartContainer}>
            <AntDesign
              name="shoppingcart"
              style={[style.cartIcon, {color: themeColors.text}]}
            />
            <View style={style.cartBadge}>
              <Text style={style.badge}>{cartLength}</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Header;

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    padding: 16,
  },
  title: {
    flex: 1,
    fontSize: 20,
    marginHorizontal: 8,
    color: colors.font,
    fontWeight: 'bold',
    alignSelf: 'center',
    textAlign: 'center',
  },
  backIcon: {
    flex: 1,
    fontSize: 25,
    color: colors.font,
  },
  cartContainer: {},
  cartIcon: {
    flex: 1,
    fontSize: 27,
    color: colors.font,
  },
  cartBadge: {
    backgroundColor: colors.mainColor,
    position: 'absolute',
    right: -10,
    top: -10,
    width: 20,
    height: 20,
    borderRadius: 100,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    color: colors.white,
  },
});
