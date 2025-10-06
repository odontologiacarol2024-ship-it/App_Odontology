import React, { useContext, useState, useEffect, useRef } from "react";
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
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { AuthContext } from "../../contexts/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { Linking } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import dentistImage from "../../assets/images/dentist.png";
import logoImage from "../../assets/images/logo.png";

const { width, height } = Dimensions.get("window");
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@(gmail|hotmail|outlook|yahoo|live|uthh\.edu)\.(com|mx)$/;
const API_URL = "https://back-end-4803.onrender.com/api/users/loginMovil";

export default function Login() {
  const router = useRouter();
  const auth = useContext(AuthContext);
  const scrollViewRef = useRef<ScrollView>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    loadSavedEmail();

    const keyboardWillShow = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      () => setKeyboardVisible(true)
    );
    const keyboardWillHide = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
        scrollViewRef.current?.scrollTo({ y: 0, animated: true });
      }
    );

    return () => {
      keyboardWillShow.remove();
      keyboardWillHide.remove();
    };
  }, []);

  if (!auth) {
    return <Text>Error: Login debe estar dentro de AuthProvider</Text>;
  }

  const { login } = auth;

  // Carga email guardado
  const loadSavedEmail = async () => {
    try {
      const savedEmail = await AsyncStorage.getItem("savedEmail");
      if (savedEmail) {
        setEmail(savedEmail);
        setRememberMe(true);
      }
    } catch (error) {
      console.error("Error cargando email:", error);
    }
  };

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
      Alert.alert("Error", "No se pudo abrir el enlace.");
    }
  };

  const handleForgotPassword = () => {
    handleOpenUrl("https://odontologiacarol.com/recuperacion");
  };

  const handleRegister = () => {
    handleOpenUrl("https://odontologiacarol.com/register");
  };

  // Valida campo con mensaje personalizado
  const validateField = (value: string, fieldName: string, regex?: RegExp) => {
    if (!value.trim()) {
      return `${fieldName} es requerido`;
    }
    if (regex && !regex.test(value)) {
      return `${fieldName} no es válido`;
    }
    return "";
  };

  // Valida formulario completo
  const validateForm = () => {
    const emailErr = validateField(email, "El correo", EMAIL_REGEX);
    const passErr = validateField(password, "La contraseña");

    setEmailError(emailErr);
    setPasswordError(passErr);

    return !emailErr && !passErr;
  };

  // Procesa respuesta del servidor
  const handleServerResponse = async (response: Response, data: any) => {
    if (response.ok) {
      if (!data.user?.id) {
        setPasswordError("Error en el servidor");
        return;
      }

      const userData = {
        id: data.user.id.toString(),
        name: data.user.name || data.user.nombre || "Usuario",
        email: data.user.email || email,
      };

      await login(data.user.id.toString(), userData);
      
      if (rememberMe) {
        await AsyncStorage.setItem("savedEmail", email.trim());
      } else {
        await AsyncStorage.removeItem("savedEmail");
      }
      
      router.replace("/(tabs)");
    } else {
      handleLoginError(data.message);
    }
  };

  // Maneja errores de login
  const handleLoginError = (message?: string) => {
    if (!message) {
      setPasswordError("Credenciales incorrectas");
      return;
    }

    const msg = message.toLowerCase();
    if (msg.includes("contraseña")) {
      setPasswordError("La contraseña es incorrecta");
    } else if (msg.includes("correo") || msg.includes("email")) {
      setEmailError("El correo no está registrado");
    } else {
      setPasswordError("Credenciales incorrectas");
    }
  };

  // Maneja inicio de sesión
  const handleLogin = async () => {
    setEmailError("");
    setPasswordError("");

    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          password: password,
        }),
      });

      const data = await response.json();
      await handleServerResponse(response, data);
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
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={[
            styles.scrollContent,
            keyboardVisible && { flexGrow: 0 }
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={[
              styles.innerContainer,
              keyboardVisible && { minHeight: undefined }
            ]}>
              <View style={styles.logoContainer}>
                <Image source={logoImage} style={styles.logoImage} />
              </View>

              <View style={[
                styles.imageContainer,
                {
                  flex: keyboardVisible ? 0 : 1,
                  paddingTop: keyboardVisible ? 35 : height * 0.05,
                  minHeight: keyboardVisible ? 0 : height * 0.4,
                }
              ]}>
                {!keyboardVisible && (
                  <Image source={dentistImage} style={styles.dentistImage} />
                )}
              </View>

              <View style={styles.formContainer}>
                <View style={styles.headerContainer}>
                  <Text style={styles.title}>Bienvenido</Text>
                  <Text style={styles.subtitle}>Odontología Carol</Text>
                  <Text style={styles.description}>Accede a tu cuenta dental</Text>
                </View>

                <View style={styles.formContent}>
                  <View style={styles.inputWrapper}>
                    <View style={styles.inputContainer}>
                      <Ionicons
                        name="mail-outline"
                        size={20}
                        color={emailError ? "#EF4444" : "#6B7280"}
                        style={styles.inputIcon}
                      />
                      <TextInput
                        style={[styles.input, emailError && styles.inputError]}
                        placeholder="Correo electrónico"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        placeholderTextColor="#9CA3AF"
                        returnKeyType="next"
                        value={email}
                        onChangeText={(text) => {
                          setEmail(text);
                          if (emailError) setEmailError("");
                        }}
                        editable={!loading}
                      />
                    </View>
                    {emailError ? (
                      <Text style={styles.errorText}>{emailError}</Text>
                    ) : null}
                  </View>

                  <View style={styles.inputWrapper}>
                    <View style={styles.inputContainer}>
                      <Ionicons
                        name="lock-closed-outline"
                        size={20}
                        color={passwordError ? "#EF4444" : "#6B7280"}
                        style={styles.inputIcon}
                      />
                      <TextInput
                        style={[styles.input, passwordError && styles.inputError]}
                        placeholder="Contraseña"
                        secureTextEntry={!showPassword}
                        placeholderTextColor="#9CA3AF"
                        returnKeyType="done"
                        value={password}
                        onChangeText={(text) => {
                          setPassword(text);
                          if (passwordError) setPasswordError("");
                        }}
                        onSubmitEditing={handleLogin}
                        editable={!loading}
                      />
                      <TouchableOpacity
                        onPress={() => setShowPassword(!showPassword)}
                        style={styles.eyeIcon}
                        disabled={loading}
                      >
                        <Ionicons
                          name={showPassword ? "eye-outline" : "eye-off-outline"}
                          size={20}
                          color="#6B7280"
                        />
                      </TouchableOpacity>
                    </View>
                    {passwordError ? (
                      <Text style={styles.errorText}>{passwordError}</Text>
                    ) : null}
                  </View>

                  <View style={styles.optionsRow}>
                    <TouchableOpacity
                      style={styles.checkboxContainer}
                      onPress={() => setRememberMe(!rememberMe)}
                      disabled={loading}
                      activeOpacity={0.7}
                    >
                      <Ionicons
                        name={rememberMe ? "checkbox" : "square-outline"}
                        size={22}
                        color="#1E40AF"
                      />
                      <Text style={styles.checkboxLabel}>Recordar usuario</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={handleForgotPassword}
                      disabled={loading}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.forgotText}>¿Olvidó su contraseña?</Text>
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity
                    style={[styles.loginButton, loading && styles.loginButtonDisabled]}
                    onPress={handleLogin}
                    disabled={loading}
                    activeOpacity={0.8}
                  >
                    {loading ? (
                      <ActivityIndicator color="white" size="small" />
                    ) : (
                      <Text style={styles.loginButtonText}>Iniciar sesión</Text>
                    )}
                  </TouchableOpacity>

                  <View style={styles.registerContainer}>
                    <Text style={styles.registerQuestion}>¿No tienes cuenta?</Text>
                    <TouchableOpacity
                      onPress={handleRegister}
                      disabled={loading}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.registerLink}>Regístrate aquí</Text>
                    </TouchableOpacity>
                  </View>
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
  scrollContent: {
    flexGrow: 1,
  },
  innerContainer: {
    flex: 1,
    minHeight: height,
  },
  logoContainer: {
    position: "absolute",
    top: Platform.OS === "ios" ? 40 : 30,
    left: 20,
    zIndex: 10,
  },
  logoImage: {
    width: width * 0.22,
    height: width * 0.132,
    resizeMode: "contain",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  dentistImage: {
    width: width * 0.65,
    height: width * 0.65,
    resizeMode: "contain",
  },
  formContainer: {
    backgroundColor: "white",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: 40,
    paddingBottom: 32,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  headerContainer: {
    paddingHorizontal: 24,
    marginBottom: 32,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1E40AF",
    marginBottom: 8,
  },
  description: {
    fontSize: 15,
    color: "#6B7280",
  },
  formContent: {
    paddingHorizontal: 24,
  },
  inputWrapper: {
    marginBottom: 20,
  },
  inputContainer: {
    position: "relative",
    width: "100%",
  },
  input: {
    width: "100%",
    height: 52,
    borderWidth: 1.5,
    borderColor: "#D1D5DB",
    borderRadius: 12,
    paddingLeft: 48,
    paddingRight: 48,
    backgroundColor: "#F9FAFB",
    fontSize: 15,
    color: "#1F2937",
  },
  inputError: {
    borderColor: "#EF4444",
    backgroundColor: "#FEF2F2",
  },
  inputIcon: {
    position: "absolute",
    top: 16,
    left: 14,
    zIndex: 1,
  },
  eyeIcon: {
    position: "absolute",
    top: 16,
    right: 14,
    zIndex: 1,
    padding: 4,
  },
  errorText: {
    color: "#EF4444",
    fontSize: 13,
    marginTop: 6,
    marginLeft: 4,
    fontWeight: "500",
  },
  optionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxLabel: {
    fontSize: 14,
    color: "#374151",
    marginLeft: 8,
  },
  forgotText: {
    fontSize: 13,
    color: "#1E40AF",
    fontWeight: "500",
  },
  loginButton: {
    backgroundColor: "#1E3A8A",
    paddingVertical: 16,
    borderRadius: 12,
    width: "100%",
    shadowColor: "#1E3A8A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  loginButtonDisabled: {
    opacity: 0.6,
  },
  loginButtonText: {
    color: "white",
    fontWeight: "700",
    textAlign: "center",
    fontSize: 17,
    letterSpacing: 0.5,
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
    gap: 6,
  },
  registerQuestion: {
    fontSize: 14,
    color: "#6B7280",
  },
  registerLink: {
    fontSize: 14,
    color: "#1E40AF",
    fontWeight: "600",
  },
});