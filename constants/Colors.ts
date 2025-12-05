const tintColorDark = "#81d8e5";
const tintColorLight = "#8461f4";
const primaryColor = "#f12f32";
const secondaryColor = "#ff9800";
const placeholderLight = "#999";
const placeholderDark = "#666";
const borderLight = "#ccc";
const borderDark = "#333";
const cardLight = "#f5f5f5"; // fond des cartes en clair
const cardDark = "#1c1c1c"; // fond des cartes en sombre
const modalLight = "#f5f5f5"; // fond des cartes en clair
const modalDark = "#1c1c1c"; // fond des cartes en sombre
const textSecondaryLight = "#999";
const textSecondaryDark = "#666";
const gradientFromLight = "#8461f4";
const gradientToLight = "#ff9800";
const gradientFromDark = "#81d8e5";
const gradientToDark = "#764ba2";

export default {
  light: {
    text: "#000",
    textForeground: "#fff",
    background: "#fff",
    foreground: "#000",
    tint: tintColorLight,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorLight,
    primary: primaryColor,
    secondary: secondaryColor,
    border: borderLight,
    placeholder: placeholderLight,
    card: cardLight,
    modal: modalLight,
    textSecondary: textSecondaryLight,
    gradientFrom: gradientFromLight,
    gradientTo: gradientToLight,
  },
  dark: {
    text: "#fff",
    textForeground: "#000",
    background: "#000",
    foreground: "#fff",
    tint: tintColorDark,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorDark,
    primary: primaryColor,
    secondary: secondaryColor,
    border: borderDark,
    placeholder: placeholderDark,
    card: cardDark,
    modal: modalDark,
    textSecondary: textSecondaryDark,
    gradientFrom: gradientFromDark,
    gradientTo: gradientToDark,
  },
};
