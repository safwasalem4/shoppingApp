import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../utils/colors';
import {HeaderProps} from './IComponents';

const Header = ({
  title,
  backgroundColor,
  backButton = true,
  cart = true,
}: HeaderProps) => {
  return (
    <View style={[style.container, {backgroundColor}]}>
      <View style={style.subContainer}>
        {backButton && (
          <TouchableOpacity>
            <AntDesign name="arrowleft" style={style.backIcon} />
          </TouchableOpacity>
        )}
        <Text numberOfLines={1} style={style.title}>
          {title}
        </Text>
        {cart && (
          <TouchableOpacity style={style.cartContainer}>
            <AntDesign name="shoppingcart" style={style.cartIcon} />
            <View style={style.cartBadge}>
              <Text style={style.badge}>2</Text>
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
    backgroundColor: colors.maincolor,
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
