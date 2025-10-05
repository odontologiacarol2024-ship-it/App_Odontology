import React, { useContext, useState, useEffect } from "react";
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
const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail|hotmail|outlook|yahoo|live|uthh\.edu)\.(com|mx)$/;

export default function Login() {
  const router = useRouter();
  const auth = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    loadSavedEmail();
  }, []);

  if (!auth) {
    return <Text>Error: Login debe estar dentro de AuthProvider</Text>;
  }

  const { login } = auth;

  // Carga el email guardado
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
      Alert.alert("Error", "No se pudo abrir el enlace. Verifica tu conexión.");
    }
  };

  const handleForgotPassword = () => {
    handleOpenUrl("https://odontologiacarol.com/recuperacion");
  };

  const handleRegister = () => {
    handleOpenUrl("https://odontologiacarol.com/register");
  };

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

    if (!isEmailValid || !isPasswordValid) return;

    setLoading(true);

    try {
      const response = await fetch(
        "https://back-end-4803.onrender.com/api/users/loginMovil",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
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
        
        if (rememberMe) {
          await AsyncStorage.setItem("savedEmail", email.trim());
        } else {
          await AsyncStorage.removeItem("savedEmail");
        }
        
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
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.innerContainer}>
              <View style={styles.logoContainer}>
                <Image source={logoImage} style={styles.logoImage} />
              </View>

              <View style={styles.imageContainer}>
                <Image source={dentistImage} style={styles.dentistImage} />
              </View>

              <View style={styles.formContainer}>
                <View style={styles.headerContainer}>
                  <Text style={styles.title}>Bienvenido</Text>
                  <Text style={styles.subtitle}>
                    Odontología Carol
                  </Text>
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: height * 0.05,
    minHeight: height * 0.4,
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