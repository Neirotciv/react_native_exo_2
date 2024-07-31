import React, { useState } from 'react';
import { View, Pressable, Image, StyleSheet, ScrollView, Text, TouchableOpacity, Modal, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Toast from 'react-native-root-toast';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [tag, setTag] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      if (checkIfImagePresent(result.assets[0].assetId)) {
        setShowToast(true);
        return;
      }

      const image = {
        id: result.assets[0].assetId,
        uri: result.assets[0].uri,
        tags: [],
      }
      setImages([...images, image]);
    }
  }

  const checkIfImagePresent = (id) => {
    return images.some(image => image.id === id);
  }

  const handleImageTag = (id) => {
    console.log('Image Tag', id);
    console.log(tag)
    setSelectedImage(id);
    setModalVisible(true);
  }

  const handleToast = () => {
    setShowToast(false);
  }

  const addTagToImage = () => {
    const formatTag = tag.startsWith('#') ? tag : `#${tag}`;
    const updatedImages = images.map(image => {
      if (image.id === selectedImage) {
        return {
          ...image,
          tags: [...image.tags, formatTag]
        }
      }
      return image;
    });

    setImages(updatedImages);
    setTag('');
    setModalVisible(false);
  }

  return (
    <>
      <View style={styles.container}>
        <Toast visible={showToast} position={1} onHide={handleToast}>Image déjà ajouté !</Toast>

        <ScrollView style={styles.gallery} horizontal={true}>
          {images.map((image, index) => {
            return (
              <TouchableOpacity
                style={styles.imageWrapper}
                key={index}
                onPress={() => handleImageTag(image.id)}
              >
                <Image source={{ uri: image.uri }} style={styles.image} />
                <Text style={styles.tags}>{image.tags.join(', ')}</Text>
              </TouchableOpacity>
            )
          })}
        </ScrollView>
      </View>
      <View>
        <Pressable style={styles.button} onPress={pickImage}>
          <Text style={styles.text}>Ajouter une image</Text>
        </Pressable>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.horizontalWrapper}>
              <Text style={styles.modalText}>Ajouter un tag à l'image</Text>
              <TextInput style={styles.textInput} value={tag} onChangeText={text => setTag(text)} placeholder='#' />
            </View>
            <View style={styles.horizontalWrapper}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.text}>Annuler</Text>
              </Pressable>
              <Pressable style={styles.button} onPress={addTagToImage}>
                <Text style={styles.text}>Ajouter</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    width: '100%',
    height: 300,
  },
  tags: {
    textAlign: 'center',
  },
  image: {
    height: 250,
    margin: 5,
    aspectRatio: 3 / 2,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    backgroundColor: 'black',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  horizontalWrapper: {
    width: '100%',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textInput: {
    height: 40,
    width: 100,
    borderColor: 'gray',
    borderWidth: 1,
  },
});

export default Gallery;