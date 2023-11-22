import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'

export default function SearchBar({ searchTerm, setSearchTerm }) {
    return (
        <View className>
            <TextInput
                placeholder='Search any food...'
                className="py-1 mx-2"
                value={searchTerm}
                onChangeText={setSearchTerm}
            />
        </View>

    )
}

const styles = StyleSheet.create({})