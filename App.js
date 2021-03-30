import React, {useRef} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import {RNCamera} from 'react-native-camera';
export default function App() {
  const activeAlert = useRef(false);
  return (
    <RNCamera
      style={styles.preview}
      type={RNCamera.Constants.Type.front}
      flashMode={RNCamera.Constants.FlashMode.on}
      androidCameraPermissionOptions={{
        title: 'Permission to use camera',
        message: 'We need your permission to use your camera',
        buttonPositive: 'Ok',
        buttonNegative: 'Cancel',
      }}
      androidRecordAudioPermissionOptions={{
        title: 'Permission to use audio recording',
        message: 'We need your permission to use your audio',
        buttonPositive: 'Ok',
        buttonNegative: 'Cancel',
      }}
      onFacesDetected={res => {
        res.faces.forEach(face => {
          if (face.smilingProbability > 0.9 && !activeAlert.current) {
            Alert.alert('Always smile 🙂', '', [
              {text: 'OK', onPress: () => (activeAlert.current = false)},
            ]);
            activeAlert.current = true;
          }
        });
      }}
      onFaceDetectionError={err => console.log('Error: ', err)}
      faceDetectionClassifications={
        RNCamera.Constants.FaceDetection.Classifications.all
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
