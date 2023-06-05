import BackgroundImage from '../../img/cropped_office_bg_opacity.jpg';
import { StyleSheet, Text, ImageBackground, View } from 'react-native';
import "../../styles/styles.css";

export default function BannerLayout() {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    coverImage: {
      width: '100%',
      height: 150,
      //   opacity: 0.7,
    },
    textView: {
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    imageText: {
      fontSize: 50,
      color: '#fff',
      fontWeight: 'bold',
    },
  });

  return (
    // <div className='about-banner'>
    //     <img src={BackgroundImage} style={{width: '100%', opacity: 0.7}}/>
    //     <h3>Test</h3>
    // </div>

    <View style={styles.container}>
      <ImageBackground style={styles.coverImage} source={BackgroundImage}>
        <View style={styles.textView}>
          <Text style={styles.imageText}>Welcome to SCverse</Text>
        </View>
      </ImageBackground>
    </View>
  )
}