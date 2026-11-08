import { StyleSheet } from 'react-native';

export const colors = {
  bg: '#1A1530',
  surface: '#2A2145',
  surfaceAlt: '#352A58',
  ink: '#F4EFFA',
  muted: '#9C93B8',
  amber: '#F2A541',
  amberDark: '#C98424',
  line: '#3E3363',
  coral: '#FF7A6B',
  done: '#6F6690',
  onAmber: '#2A1B05',
};

export default StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.ink,
    letterSpacing: -0.5,
  },
  subtitle: {
    marginTop: 4,
    fontSize: 15,
    color: colors.muted,
  },
  form: {
    marginTop: 20,
    marginBottom: 16,
  },
  input: {
    height: 50,
    paddingHorizontal: 16,
    fontSize: 16,
    color: colors.ink,
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.line,
    borderRadius: 12,
    marginBottom: 10,
  },
  addButton: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.amber,
    borderRadius: 12,
  },
  addButtonDisabled: {
    backgroundColor: colors.line,
  },
  addButtonText: {
    color: colors.onAmber,
    fontSize: 16,
    fontWeight: '800',
  },
  addButtonTextDisabled: {
    color: colors.muted,
  },
  clearButton: {
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  clearText: {
    color: colors.amber,
    fontSize: 14,
    fontWeight: '700',
  },
  listContent: {
    paddingBottom: 32,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 10,
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.line,
  },
  rowDone: {
    backgroundColor: colors.bg,
  },
  disc: {
    width: 38,
    height: 38,
    marginRight: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 19,
    backgroundColor: '#0F0B1F',
    borderWidth: 2,
    borderColor: colors.surfaceAlt,
  },
  discDone: {
    borderColor: colors.done,
  },
  discLabel: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.amber,
    alignItems: 'center',
    justifyContent: 'center',
  },
  discLabelDone: {
    backgroundColor: colors.done,
  },
  discHole: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#0F0B1F',
  },
  textWrap: {
    flex: 1,
  },
  songTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.ink,
  },
  songArtist: {
    marginTop: 2,
    fontSize: 14,
    color: colors.muted,
  },
  textDone: {
    color: colors.done,
    textDecorationLine: 'line-through',
  },
  deleteButton: {
    marginLeft: 10,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.coral,
  },
  deleteText: {
    color: colors.coral,
    fontSize: 14,
    fontWeight: '600',
  },
  emptyBox: {
    marginTop: 40,
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.ink,
  },
  emptyText: {
    marginTop: 6,
    fontSize: 15,
    textAlign: 'center',
    color: colors.muted,
  },
});
