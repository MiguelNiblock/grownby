import { StyleSheet, Text, View, FlatList, Platform, ScrollView } from "react-native"
import React, { useEffect, useState } from "react"
import { db } from "../screens/firebase"
import { collection, onSnapshot, query } from "firebase/firestore"
import FarmCard from "./FarmCard"
import { useNavigation } from "@react-navigation/core"
import type { StackNavigationProp } from "@react-navigation/stack"
import { RootStackParamList } from "../App"
import { Button } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"

const Farms = () => {
  const [farmsData, setFarmsData] = useState([])

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()
  useEffect(() => {
    const farmsCollection = query(collection(db, "Farms"))

    onSnapshot(farmsCollection, (querySnapshot) => {
      setFarmsData(querySnapshot.docs.map((doc) => doc.data()))

      console.log("farms in useffect???: ", farmsData)
    })
  }, [])

  const navigateToAddFarm = () => {
    navigation.navigate("AddFarm")
  }

  return (
    <>
      <ScrollView>
        <View style={styles.farmsContainer}>
          <View style={styles.buttonContainer}>
            <Button style={styles.button} onPress={navigateToAddFarm}>
              <Text style={styles.buttonText}>Add A Farm</Text>
            </Button>
          </View>

          <FlatList
            data={farmsData}
            renderItem={({ item }) => <FarmCard key={item.displayName} farm={item} />}
          />
        </View>
      </ScrollView>
    </>
  )
}

export default Farms

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 20,
  },
  farmsContainer: {
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer:
    Platform.OS === "web"
      ? {
          justifyContent: "center",
          alignItems: "flex-end",
          marginTop: 40,
        }
      : {
          justifyContent: "center",
          alignItems: "center",
          marginTop: 40,
        },
  button: {
    backgroundColor: "#0782F9",
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
})
