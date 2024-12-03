import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { openBrowserAsync } from "expo-web-browser";
import ConnectModal from "@/components/ConnectModal"
import useBLE from "@/hooks/useBLE"

export default function Index() {
  const {
    allDevices,
    connectedDevice,
    connectToDevice,
    wifiSSID,
    setWifiSSID,
    wifiPassword,
    setWifiPassword,
    startCoords,
    setStartCoords,
    endCoords,
    setEndCoords,
    mondayTime,
    setMondayTime,
    tuesdayTime,
    setTuesdayTime,
    wednesdayTime,
    setWednesdayTime,
    thursdayTime,
    setThursdayTime,
    fridayTime,
    setFridayTime,
    apiKey,
    setApiKey,
    requestPermissions,
    scanForPeripherals,
    disconnectFromDevice
  } = useBLE();

  const scanForDevices = async () => {
    const isPermissionsEnabled = await requestPermissions();
    if (isPermissionsEnabled) {
      scanForPeripherals();
    }
  };

  function isoToLocalTime(iso: any){
    // Convert the UTC time to a Date object
    const date = new Date(iso);

    // Format the time in local timezone with AM/PM
    const localTime = date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true // This enables the AM/PM format
    });

    return localTime
  }

  var [isConnectModalVisible, setConnectModalVisibility] = useState<boolean>(false);

  function showConnectModal(){
    scanForDevices();
    setConnectModalVisibility(true)
  }

  function hideConnectModal(){
    setConnectModalVisibility(false)
  }
  const [isMondayTimePickerVisible, setMondayTimePickerVisibility] = useState<boolean>(false);
  const handleMonConfirm = (time: any) => {
    setMondayTime(time)
    setMondayTimePickerVisibility(false);
  };

  const [isTuesdayTimePickerVisible, setTuesdayTimePickerVisibility] = useState<boolean>(false);
  const handleTuesConfirm = (time: any) => {
    setTuesdayTime(time)
    setTuesdayTimePickerVisibility(false);
  };

  const [isWednesdayTimePickerVisible, setWednesdayTimePickerVisibility] = useState<boolean>(false);
  const handleWendConfirm = (time: any) => {
    setWednesdayTime(time)
    setWednesdayTimePickerVisibility(false);
  };

  const [isThursdayTimePickerVisible, setThursdayTimePickerVisibility] = useState<boolean>(false);
  const handleThurConfirm = (time: any) => {
    setThursdayTime(time)
    setThursdayTimePickerVisibility(false);
  };

  const [isFridayTimePickerVisible, setFridayTimePickerVisibility] = useState<boolean>(false);
  const handleFriConfirm = (time: any) => {
    setFridayTime(time)
    setFridayTimePickerVisibility(false);
  };



  return (
    <View className="bg-slate-900">
      {connectedDevice ? (
        <SafeAreaView className="h-full w-full">
          <View className="bg-white w-full h-full flex-col">
            <KeyboardAwareScrollView className="grow bg-gray-100 pb-14 px-5">
              <Text className="text-3xl text-center my-8">
                Commuter Clock Setup
              </Text>

              <Text className="text-2xl">WiFi SSID:</Text>
              <TextInput
                placeholder="Enter your WiFi SSID here"
                placeholderTextColor="gray"
                value={wifiSSID}
                onChangeText={setWifiSSID}
                className="border rounded-md h-10 mt-2 mb-4 px-3"
              />

              <Text className="text-2xl">WiFi Password:</Text>
              <TextInput
                placeholder="Enter your WiFi password here"
                placeholderTextColor="gray"
                value={wifiPassword}
                onChangeText={setWifiPassword}
                className="border rounded-md h-10 mt-2 mb-4 px-3"
              ></TextInput>

              <Text className="text-2xl">Starting Coordinates:</Text>
              <TextInput
                placeholder="Enter your starting coordinates here"
                placeholderTextColor="gray"
                value={startCoords}
                onChangeText={setStartCoords}
                className="border rounded-md h-10 mt-2 mb-4 px-3"
              />

              <Text className="text-2xl">Ending Coordinates:</Text>
              <TextInput
                placeholder="Enter your ending coordinates here"
                placeholderTextColor="gray"
                value={endCoords}
                onChangeText={setEndCoords}
                className="border rounded-md h-10 mt-2 mb-6 px-3"
              ></TextInput>

              <Text className="text-2xl">Monday Time to Arrive:</Text>
              <TouchableOpacity
                onPress={() => {
                  setMondayTimePickerVisibility(true);
                }}
                className="mb-4 mt-2 mx-auto bg-gray-200 rounded-lg w-min p-1 px-4"
              >
                <Text className="text-center text-xl w-min">{mondayTime?`Update Time (${isoToLocalTime(mondayTime)})`:"Set Time"}</Text>
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={isMondayTimePickerVisible}
                mode="time"
                onConfirm={handleMonConfirm}
                onCancel={() => {setMondayTimePickerVisibility(false)}}
                className="border rounded-md h-10 mt-2 mb-6 px-3"
              />

              <Text className="text-2xl">Tuesday Time to Arrive:</Text>
              <TouchableOpacity
                onPress={() => {
                  setTuesdayTimePickerVisibility(true);
                }}
                className="mb-4 mt-2 mx-auto bg-gray-200 rounded-lg w-min p-1 px-4"
              >
                <Text className="text-center text-xl w-min">{tuesdayTime?`Update Time (${isoToLocalTime(tuesdayTime)})`:"Set Time"}</Text>
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={isTuesdayTimePickerVisible}
                mode="time"
                onConfirm={handleTuesConfirm}
                onCancel={() => {setTuesdayTimePickerVisibility(false)}}
                className="border rounded-md h-10 mt-2 mb-6 px-3"
              />

              <Text className="text-2xl">Wednesday Time to Arrive:</Text>
              <TouchableOpacity
                onPress={() => {
                  setWednesdayTimePickerVisibility(true);
                }}
                className="mb-4 mt-2 mx-auto bg-gray-200 rounded-lg w-min p-1 px-4"
              >
                <Text className="text-center text-xl w-min">{wednesdayTime?`Update Time (${isoToLocalTime(wednesdayTime)})`:"Set Time"}</Text>
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={isWednesdayTimePickerVisible}
                mode="time"
                onConfirm={handleWendConfirm}
                onCancel={() => {setWednesdayTimePickerVisibility(false)}}
                className="border rounded-md h-10 mt-2 mb-6 px-3"
              />

              <Text className="text-2xl">Thursday Time to Arrive:</Text>
              <TouchableOpacity
                onPress={() => {
                  setThursdayTimePickerVisibility(true);
                }}
                className="mb-4 mt-2 mx-auto bg-gray-200 rounded-lg w-min p-1 px-4"
              >
                <Text className="text-center text-xl w-min">{thursdayTime?`Update Time (${isoToLocalTime(thursdayTime)})`:"Set Time"}</Text>
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={isThursdayTimePickerVisible}
                mode="time"
                onConfirm={handleThurConfirm}
                onCancel={() => {setThursdayTimePickerVisibility(false)}}
                className="border rounded-md h-10 mt-2 mb-6 px-3"
              />

              <Text className="text-2xl">Friday Time to Arrive:</Text>
              <TouchableOpacity
                onPress={() => {
                  setFridayTimePickerVisibility(true);
                }}
                className="mb-4 mt-2 mx-auto bg-gray-200 rounded-lg w-min p-1 px-4"
              >
                <Text className="text-center text-xl w-min">{fridayTime?`Update Time (${isoToLocalTime(fridayTime)})`:"Set Time"}</Text>
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={isFridayTimePickerVisible}
                mode="time"
                onConfirm={handleFriConfirm}
                onCancel={() => {setFridayTimePickerVisibility(false)}}
                className="border rounded-md h-10 mt-2 mb-6 px-3"
              />

              <Text className="text-2xl">API Key:</Text>
              <View className="flex flex-row">
              <Text className="text-sm my-0">Can obtain one for free from </Text>
              <TouchableOpacity  onPress={() => openBrowserAsync("https://distancematrix.ai/")}>
                <Text className="text-sm color-blue-600">distancematrix.ai</Text>
              </TouchableOpacity>
              </View>
              <TextInput
                placeholder="Enter your API key here"
                placeholderTextColor="gray"
                value={apiKey}
                onChangeText={setApiKey}
                className="border rounded-md h-10 mt-2 mb-20 px-3"
              />


            </KeyboardAwareScrollView>
            <TouchableOpacity
              onPress={() => {
                disconnectFromDevice();
              }}
              className="my-4 bg-blue-300 w-[90%] ml-[5%] rounded-lg  flex justify-center p-3"
            >
              <Text className="text-center text-2xl">End Setup</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      ) : (
        <SafeAreaView className="h-full w-full">
          <View className="flex flex-col justify-center align-center  w-full h-full bg-white">
            <Text className="text-4xl text-center">Connect to your</Text>
            <Text className="text-4xl text-center">Commuter Clock</Text>

            <TouchableOpacity
              onPress={showConnectModal}
              className="absolute bottom-10 bg-blue-300 w-[80%] ml-[10%] rounded-3xl  flex justify-center p-3"
            >
              <Text className="text-center text-2xl">Connect</Text>
            </TouchableOpacity>
          </View>

          <ConnectModal
            closeModal={hideConnectModal}
            visible={isConnectModalVisible}
            connectToPeripheral={connectToDevice}
            devices={allDevices}
          />
        </SafeAreaView>
      )}
    </View>
  );
}
