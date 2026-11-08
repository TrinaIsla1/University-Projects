import React, { useRef, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import SongItem from './SongItem';
import styles, { colors } from './styles';

export default function App() {
  // State: the wishlist and the current text in each input
  const [songs, setSongs] = useState([]);
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const artistRef = useRef(null);

  const canAdd = title.trim().length > 0;

  const addSong = () => {
    const cleanTitle = title.trim();
    if (!cleanTitle) return;
    const newSong = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      title: cleanTitle,
      artist: artist.trim(),
      listened: false,
    };
    setSongs((prev) => [newSong, ...prev]);
    setTitle('');
    setArtist('');
  };

  const toggleSong = (id) => {
    setSongs((prev) =>
      prev.map((song) =>
        song.id === id ? { ...song, listened: !song.listened } : song
      )
    );
  };

  const deleteSong = (id) => {
    setSongs((prev) => prev.filter((song) => song.id !== id));
  };

  const clearListened = () => {
    setSongs((prev) => prev.filter((song) => !song.listened));
  };

  const listenedCount = songs.filter((song) => song.listened).length;
  const remaining = songs.length - listenedCount;

  const subtitle =
    songs.length === 0
      ? 'No songs saved yet'
      : remaining === 0
      ? 'You have heard everything on your list'
      : `${remaining} ${remaining === 1 ? 'song' : 'songs'} to listen to`;

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={colors.bg} />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Text style={styles.title}>Song wishlist</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Song title"
            placeholderTextColor={colors.muted}
            value={title}
            onChangeText={setTitle}
            returnKeyType="next"
            onSubmitEditing={() => artistRef.current && artistRef.current.focus()}
            blurOnSubmit={false}
          />
          <TextInput
            ref={artistRef}
            style={styles.input}
            placeholder="Artist (optional)"
            placeholderTextColor={colors.muted}
            value={artist}
            onChangeText={setArtist}
            returnKeyType="done"
            onSubmitEditing={addSong}
          />
          <TouchableOpacity
            style={[styles.addButton, !canAdd && styles.addButtonDisabled]}
            onPress={addSong}
            disabled={!canAdd}
          >
            <Text
              style={[
                styles.addButtonText,
                !canAdd && styles.addButtonTextDisabled,
              ]}
            >
              Add song
            </Text>
          </TouchableOpacity>
        </View>

        {listenedCount > 0 && (
          <TouchableOpacity style={styles.clearButton} onPress={clearListened}>
            <Text style={styles.clearText}>Clear {listenedCount} listened</Text>
          </TouchableOpacity>
        )}

        <FlatList
          data={songs}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <SongItem item={item} onToggle={toggleSong} onDelete={deleteSong} />
          )}
          contentContainerStyle={styles.listContent}
          keyboardShouldPersistTaps="handled"
          ListEmptyComponent={
            <View style={styles.emptyBox}>
              <Text style={styles.emptyTitle}>Your wishlist is empty</Text>
              <Text style={styles.emptyText}>
                Add a song you want to hear. Tap it once you have listened to
                mark it done.
              </Text>
            </View>
          }
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
