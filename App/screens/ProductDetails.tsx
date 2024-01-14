import React, {useState} from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import ImageSlider from 'react-native-image-slider';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {colors} from '../utils/colors';
import {useAppDispatch} from '../utils/hooks';
import {addCart} from '../store/cartSlice';
import Container from '../components/Container';
import Specification from '../components/Specification';
import {useTheme} from '@react-navigation/native';

const ProductDetails = ({route}) => {
  const {colors: themeColors} = useTheme();
  const [quantity, setQuantity] = useState(1);
  const dispatch = useAppDispatch();
  const {
    brand,
    category,
    description,
    discountPercentage,
    images,
    price,
    rating,
    stock,
    title,
  } = route.params.item;

  return (
    <>
      <Container headerTitle="Product Details">
        <View style={styles.sliderContainer}>
          <ImageSlider images={images} />
        </View>

        <View style={styles.detailsContainer}>
          <View>
            <Text style={[styles.title, {color: themeColors.text}]}>
              {title + ' '}
              <Text style={[styles.rate, {color: themeColors.text}]}>
                {'(' + rating.toFixed(1) + ' '}
                <FontAwesome name="star" size={15} color={colors.orange} />
                {')'}
              </Text>
            </Text>
          </View>
          <Text style={[styles.price, , {color: themeColors.text}]}>
            {price} $
          </Text>
        </View>
        <Text style={[styles.description, {color: themeColors.text}]}>
          {description}
        </Text>
        <Text style={styles.specifications}>Specifications:</Text>
        <Specification title={'Brand'} value={brand} />
        <Specification title={'Category'} value={category} />
        <Specification
          title={'Discount'}
          value={`${discountPercentage.toFixed(1)}%`}
        />
        <Specification title={'In Stock'} value={stock} />
      </Container>

      <View style={styles.buttonStyle}>
        <View style={styles.counterContainer}>
          <TouchableOpacity
            onPress={() => setQuantity(quantity > 1 ? quantity - 1 : quantity)}>
            <Image
              source={require('../assets/minus.png')}
              style={styles.addAndMinusView}
            />
          </TouchableOpacity>
          <Text style={{fontSize: 19, marginHorizontal: 13}}>{quantity}</Text>
          <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
            <Image
              source={require('../assets/add-2.png')}
              style={styles.addAndMinusView}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => {
            dispatch(addCart({...route.params.item, quantity: quantity}));
          }}>
          <AntDesign name="shoppingcart" size={28} color={colors.mainColor} />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  sliderContainer: {
    width: '100%',
    height: '50%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  rate: {
    fontSize: 18,
    fontWeight: 'normal',
    color: colors.lightGray,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.mainColor,
  },
  description: {
    fontSize: 16,
  },
  specifications: {
    marginTop: 16,
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.mainColor,
  },
  detailsContainer: {
    marginVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  counterContainer: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 8,
    alignItems: 'center',
  },
  addAndMinusView: {
    tintColor: colors.mainColor,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9,
  },
  image: {
    width: 250,
    height: 250,
  },
  buttonStyle: {
    backgroundColor: colors.blue,
    padding: 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 25,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  cartButton: {
    borderRadius: 30,
    backgroundColor: colors.white,
    padding: 10,
  },
});
