import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react';
import { useWarmUpBrowser } from '@/hooks/useWarmUpBrowser';
import { DefaultStyles } from '@/constants/Styles';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useOAuth } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';

enum Strategy {
    Apple = 'oauth_apple',
    Google = 'oauth_google',
    Facebook = 'oauth_facebook'
}

const Login = () => {
    useWarmUpBrowser();
    const router = useRouter();

    const { startOAuthFlow: appleAuth } = useOAuth({ strategy: 'oauth_apple' });
    const { startOAuthFlow: googleAuth } = useOAuth({ strategy: 'oauth_google' });
    const { startOAuthFlow: facebookAuth } = useOAuth({ strategy: 'oauth_facebook' });

    const onSelectAuth = async (strategy: Strategy) => {
        const SelectedAuth = {
            [Strategy.Google]: googleAuth,
            [Strategy.Apple]: appleAuth,
            [Strategy.Facebook]: facebookAuth
        }[strategy];

        try {
            const { createdSessionId, setActive } = await SelectedAuth();
            console.log(" ~ file: login.tsx:31 ~ onSelectAuth ~ createdSessionId: ", createdSessionId);

            if (createdSessionId) {
                setActive!({ session: createdSessionId });
                router.back();
            }
        } catch (error) {
            console.error("OAuth Error: ", error);
        }
    }

    return (
        <View style={DefaultStyles.container}>
            <TextInput
                autoCapitalize='none'
                placeholder='Email'
                style={[
                    DefaultStyles.inputField,
                    { marginBottom: 10, }
                ]}
            />
            <Pressable style={DefaultStyles.btn}>
                <Text style={DefaultStyles.btnText}>Continue</Text>
            </Pressable>

            <View style={styles.seeratorView}>
                <View style={{
                    flex: 1,
                    borderBottomColor: "#101010",
                    borderBottomWidth: StyleSheet.hairlineWidth,
                }} />
                <Text style={styles.seerator}>or</Text>
                <View style={{
                    flex: 1,
                    borderBottomColor: "#101010",
                    borderBottomWidth: StyleSheet.hairlineWidth,
                }} />
            </View>

            <View style={{ gap: 20 }}>
                <Pressable style={styles.btnOutline}>
                    <Ionicons name='call-outline' size={26} color={Colors.dark.background} style={DefaultStyles.btnIcon} />
                    <Text style={styles.btnOulineText}>Continue with Phone</Text>
                </Pressable>
                <Pressable style={styles.btnOutline} onPress={() => onSelectAuth(Strategy.Apple)}>
                    <Ionicons name='logo-apple' size={26} color={Colors.dark.background} style={DefaultStyles.btnIcon} />
                    <Text style={styles.btnOulineText}>Continue with Apple</Text>
                </Pressable>
                <Pressable style={styles.btnOutline} onPress={() => onSelectAuth(Strategy.Google)}>
                    <Ionicons name='logo-google' size={26} color={Colors.dark.background} style={DefaultStyles.btnIcon} />
                    <Text style={styles.btnOulineText}>Continue with Google</Text>
                </Pressable>
                <Pressable style={styles.btnOutline} onPress={() => onSelectAuth(Strategy.Facebook)}>
                    <Ionicons name='logo-facebook' size={26} color={Colors.dark.background} style={DefaultStyles.btnIcon} />
                    <Text style={styles.btnOulineText}>Continue with Facebook</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        padding: 16,
    },
    seeratorView: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        marginVertical: 30
    },
    seerator: {
        fontFamily: 'OutfitSemiBold',
        color: Colors.black
    },
    btnOutline: {
        flexDirection: 'column',
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: Colors.grey,
        height: 50,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    btnOulineText: {
        color: "#101011",
        fontSize: 16,
        fontFamily: "OutfitSemiBold",
    }
});
