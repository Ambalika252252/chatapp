import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, TextInput, Text, TouchableOpacity, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { auth } from '../config/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { AntDesign } from "@expo/vector-icons";

const Register = ({navigation}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [avatar, setAvatar] = useState(null);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setAvatar(result.uri);
        }
    };

    const register = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                updateProfile(user, {
                    displayName: name,
                    photoURL: avatar ? avatar : 'https://gravatar.com/avatar/94d45dbdba988afacf30d916e7aaad69?s=200&d=mp&r=x',
                })
                    .then(() => {
                        alert('Registered, please login.');
                    })
                    .catch((error) => Alert.alert("Signup Failed!!", error.message));
            })
            .catch((error) => {
                const errorMessage = error.message;
                alert(errorMessage);
            });
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Login')}>
                <AntDesign name="leftcircle" size={30} color="#54BAB9" />
            </TouchableOpacity>

            <SafeAreaView style={styles.form}>
                <Text style={styles.login}>Register</Text>

                <TextInput
                    style={styles.input}
                    placeholder='Enter your name'
                    value={name}
                    onChangeText={text => setName(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Enter your email'
                    value={email}
                    onChangeText={text => setEmail(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Enter your password'
                    value={password}
                    onChangeText={text => setPassword(text)}
                    secureTextEntry
                />

                <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
                    <Text style={styles.imagePickerText}>Pick an image</Text>
                </TouchableOpacity>

                {avatar && <Image source={{ uri: avatar }} style={styles.avatar} />}

                <TouchableOpacity style={styles.button} onPress={register}>
                    <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 24 }}>
                        Register
                    </Text>
                </TouchableOpacity>
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FBF8F1",
    },
    form: {
        flex: 1,
        justifyContent: "center",
        marginHorizontal: 30,
    },
    button: {
        backgroundColor: "#E9DAC1",
        height: 50,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
        elevation: 5,
        borderColor: '#54BAB9',
        borderBottomWidth: 2,
        borderLeftWidth: 2
    },
    input: {
        backgroundColor: "#F7ECDE",
        height: 58,
        marginBottom: 20,
        fontSize: 16,
        borderRadius: 8,
        padding: 12,
        borderWidth: 2,
        borderColor: "#E9DAC1",
    },
    login: {
        fontSize: 36,
        fontWeight: "bold",
        color: '#54BAB9',
        alignSelf: "center",
        paddingBottom: 24,
    },
    backButton: {
        top: '2%',
        left: '2%',
    },
    imagePicker: {
        backgroundColor: '#E9DAC1',
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
        elevation: 5,
        borderColor: '#54BAB9',
        borderBottomWidth: 2,
        borderLeftWidth: 2
    },
    imagePickerText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        alignSelf: 'center',
        marginBottom: 20,
    },
});

export default Register;
