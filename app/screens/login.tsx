import React, { useContext, useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Alert,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { AuthContext } from "../../contexts/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { Linking } from "react-native";

import dentistImage from "../../assets/images/dentist.png";
import logoImage from "../../assets/images/logo.png";

const emailRegex =
  /^[a-zA-Z0-9._%+-]+@(gmail|hotmail|outlook|yahoo|live|uthh\.edu)\.(com|mx)$/;

export default function Login() {
  const router = useRouter();
  const auth = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  if (!auth) {
    return <Text>Error: Login debe estar dentro de AuthProvider</Text>;
  }

  // Abre URL externa
  const handleOpenUrl = async (url: string) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert("No se pudo abrir el enlace", "URL no soportada.");
      }
    } catch (err) {
      console.error("Error abriendo URL:", err);
      Alert.alert("Error", "No se pudo abrir el enlace. Verifica tu conexión.");
    }
  };

  const handleForgotPassword = () => {
    handleOpenUrl("https://odontologiacarol.com/recuperacion");
  };

  const handleRegister = () => {
    handleOpenUrl("https://odontologiacarol.com/register");
  };

  const { login } = auth;

  // Valida el correo
  const validateEmail = (email: string): boolean => {
    if (!email.trim()) {
      setEmailError("El correo es requerido");
      return false;
    }
    if (!emailRegex.test(email)) {
      setEmailError("El correo no es válido");
      return false;
    }
    setEmailError("");
    return true;
  };

  // Valida la contraseña
  const validatePassword = (password: string): boolean => {
    if (!password.trim()) {
      setPasswordError("La contraseña es requerida");
      return false;
    }
    setPasswordError("");
    return true;
  };

  // Maneja el inicio de sesión
  const handleLogin = async () => {
    setEmailError("");
    setPasswordError("");

    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isEmailValid || !isPasswordValid) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://back-end-4803.onrender.com/api/users/loginMovil",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim(),
            password: password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        if (!data.user?.id) {
          setPasswordError("Error en el servidor");
          return;
        }

        const token = data.user.id.toString();
        const userData = {
          id: data.user.id.toString(),
          name: data.user.name || data.user.nombre || "Usuario",
          email: data.user.email || email,
        };

        await login(token, userData);
        router.replace("/(tabs)");
      } else {
        if (data.message) {
          if (data.message.toLowerCase().includes("contraseña")) {
            setPasswordError("La contraseña es incorrecta");
          } else if (
            data.message.toLowerCase().includes("correo") ||
            data.message.toLowerCase().includes("email")
          ) {
            setEmailError("El correo no está registrado");
          } else {
            setPasswordError("Credenciales incorrectas");
          }
        } else {
          setPasswordError("Credenciales incorrectas");
        }
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      Alert.alert(
        "Error de conexión",
        "No se pudo conectar con el servidor. Verifica tu conexión a internet."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={{ flex: 1 }}>
              <View style={styles.logoContainer}>
                <Image source={logoImage} style={styles.logoImage} />
              </View>

              <View style={styles.centerContent} pointerEvents="none">
                <Image source={dentistImage} style={styles.dentistImage} />
              </View>

              <View style={styles.formContainer}>
                <Text style={styles.title}>Bienvenido a carol</Text>
                <Text style={styles.subtitle}>Accede a tu cuenta dental</Text>

                <View style={styles.inputContainer}>
                  <TextInput
                    style={[
                      styles.input,
                      emailError ? styles.inputError : null,
                    ]}
                    placeholder="correo electrónico"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholderTextColor="#888"
                    returnKeyType="next"
                    value={email}
                    onChangeText={(text) => {
                      setEmail(text);
                      if (emailError) setEmailError("");
                    }}
                    editable={!loading}
                  />
                  <Ionicons
                    name="mail-outline"
                    size={20}
                    color={emailError ? "#EF4444" : "#888"}
                    style={styles.inputIcon}
                  />
                </View>
                {emailError ? (
                  <Text style={styles.errorText}>{emailError}</Text>
                ) : null}

                <View style={styles.inputContainer}>
                  <TextInput
                    style={[
                      styles.input,
                      passwordError ? styles.inputError : null,
                    ]}
                    placeholder="contraseña"
                    secureTextEntry={!showPassword}
                    placeholderTextColor="#888"
                    returnKeyType="done"
                    value={password}
                    onChangeText={(text) => {
                      setPassword(text);
                      if (passwordError) setPasswordError("");
                    }}
                    onSubmitEditing={handleLogin}
                    editable={!loading}
                  />
                  <Ionicons
                    name="lock-closed-outline"
                    size={20}
                    color={passwordError ? "#EF4444" : "#888"}
                    style={styles.inputIcon}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    style={styles.eyeIcon}
                    disabled={loading}
                  >
                    <Ionicons
                      name={showPassword ? "eye-outline" : "eye-off-outline"}
                      size={20}
                      color="#888"
                    />
                  </TouchableOpacity>
                </View>
                {passwordError ? (
                  <Text style={styles.errorText}>{passwordError}</Text>
                ) : null}

                <TouchableOpacity
                  style={[
                    styles.loginButton,
                    loading && styles.loginButtonDisabled,
                  ]}
                  onPress={handleLogin}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator color="white" size="small" />
                  ) : (
                    <Text style={styles.loginButtonText}>Iniciar sesión</Text>
                  )}
                </TouchableOpacity>

                <View style={styles.linkRow}>
                  <TouchableOpacity
                    onPress={handleForgotPassword}
                    disabled={loading}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  >
                    <Text style={styles.linkText}>¿Olvidó su contraseña?</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={handleRegister}
                    disabled={loading}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  >
                    <Text style={[styles.linkText, styles.registerText]}>
                      Registrarse
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7BB7F2",
  },
  logoContainer: {
    position: "absolute",
    top: 35,
    left: 16,
    zIndex: 10,
  },
  logoImage: {
    width: 80,
    height: 48,
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  dentistImage: {
    width: 266,
    height: 266,
    position: "absolute",
    top: "30%",
    left: "50%",
    transform: [{ translateX: -133 }],
  },
  formContainer: {
    backgroundColor: "white",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 24,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 8,
    position: "relative",
  },
  input: {
    width: "100%",
    height: 48,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    paddingLeft: 48,
    paddingRight: 48,
    backgroundColor: "#F3F4F6",
  },
  inputError: {
    borderColor: "#EF4444",
    borderWidth: 2,
  },
  inputIcon: {
    position: "absolute",
    top: 14,
    left: 12,
  },
  eyeIcon: {
    position: "absolute",
    top: 14,
    right: 12,
  },
  errorText: {
    color: "#EF4444",
    fontSize: 12,
    marginBottom: 12,
    marginLeft: 4,
  },
  loginButton: {
    backgroundColor: "#1E3A8A",
    paddingVertical: 16,
    borderRadius: 24,
    width: "100%",
    marginTop: 8,
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
  loginButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
  linkRow: {
    marginTop: 12,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 4,
  },
  linkText: {
    fontSize: 14,
    color: "#1E40AF",
    textDecorationLine: "underline",
  },
  registerText: {
    fontWeight: "600",
  },
});
