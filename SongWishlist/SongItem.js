import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';

export default function SongItem({ item, onToggle, onDelete }) {
  const label = item.artist ? `${item.title} by ${item.artist}` : item.title;

  return (
    <View style={[styles.row, item.listened && styles.rowDone]}>
      {/* Tap the record or the song to mark it as listened */}
      <TouchableOpacity
        style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}
        onPress={() => onToggle(item.id)}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: item.listened }}
        accessibilityLabel={`Mark ${label} as listened`}
      >
        <View style={[styles.disc, item.listened && styles.discDone]}>
          <View
            style={[styles.discLabel, item.listened && styles.discLabelDone]}
          >
            <View style={styles.discHole} />
          </View>
        </View>

        <View style={styles.textWrap}>
          <Text
            style={[styles.songTitle, item.listened && styles.textDone]}
            numberOfLines={1}
          >
            {item.title}
          </Text>
          {!!item.artist && (
            <Text
              style={[styles.songArtist, item.listened && styles.textDone]}
              numberOfLines={1}
            >
              {item.artist}
            </Text>
          )}
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => onDelete(item.id)}
        accessibilityLabel={`Delete ${label}`}
      >
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
}
