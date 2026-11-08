import { StyleSheet } from 'react-native';

export const colors = {
  primary: '#D9480F',
  background: '#FBF7F2',
  card: '#FFFFFF',
  text: '#262626',
  muted: '#757575',
  border: '#ECE4DA',
  white: '#FFFFFF',
};

export const globalStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
    width: '100%',
    maxWidth: 640, // keeps the layout tidy on wide web screens
    alignSelf: 'center',
  },
  button: {
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});
