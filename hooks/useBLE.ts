/* eslint-disable no-bitwise */
import { useState } from "react";
import { PermissionsAndroid, Platform } from "react-native";

import * as ExpoDevice from "expo-device";

//import base64 from "react-native-base64";
import {
  BleManager,
  Device,
} from "react-native-ble-plx";

const SERVICE_1_UUID = "46a914b6-427a-4065-b538-d45cf7856901";
const WIFI_SSID_UUID = "01c66ecc-dcf7-4343-95eb-b4f83f4775a4";
const WIFI_PASSWORD_UUID = "f8cd9aa8-b682-4f3d-868f-c5e9bf2019fb";

const SERVICE_2_UUID = "2a6db749-544d-4e20-865a-7952e6916cd5";
const START_COORDS_UUID = "65a9743f-d233-4d5c-a672-5c7b52dd2d63";
const END_COORDS_UUID = "cb9fbb6a-b19e-484a-8fde-4745e27f544f";

const SERVICE_3_UUID = "67624b74-95bf-47ae-8878-9c8cd35d4e34";
const MON_TIME_UUID = "9730f332-d2a0-420a-93de-fd300be3259c";
const TUE_TIME_UUID = "b7b2e8df-3417-4936-ae76-54387b7c8fc9";
const WEN_TIME_UUID = "ace410db-cc42-4624-a3ad-10f6f9516a0b";

const SERVICE_4_UUID = "7bf6c76c-b88e-4588-8c7c-af3925bd3753";
const THU_TIME_UUID = "6e71f1a1-9147-401c-a55c-d730013e4bd1";
const FRI_TIME_UUID = "fe2503d9-5809-4d1c-88c8-54997c154ebe";

const SERVICE_5_UUID = "6bbf26c8-0398-41c2-a3bb-8282950c2c33";
const API_UUID = "b1d0e060-4d4e-4a74-a1c9-eb1c362245a8";

const SERVICE_6_UUID = "9cd08e17-e180-4ec2-a970-d5788ac2ce40";
const SIGNAL_END_UUID = "19b10001-e8f2-537e-4f6c-d104768a1217";


const bleManager = new BleManager();

function useBLE() {
  const [allDevices, setAllDevices] = useState<Device[]>([]);
  const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);


  const updateCharacteristic = async (serviceUUID: string, characteristicUUID: string, value: string) => {
    try {
        await connectedDevice?.writeCharacteristicWithResponseForService(
          serviceUUID,
          characteristicUUID,
          value
        );
        console.log('Characteristic value written successfully');
    } catch (error) {
        console.error('Error writing characteristic value:', error);
    }
  }

  const [wifiSSID, setWifiSSIDState] = useState<string>("");
  const [wifiPassword, setWifiPasswordState] = useState<string>("");
  const [startCoords, setStartCoordsState] = useState<string>("");
  const [endCoords, setEndCoordsState] = useState<string>("");

  const [mondayTime, setMondayTimeState] = useState<string | null>(null);
  const [tuesdayTime, setTuesdayTimeState] = useState<string | null>(null);
  const [wednesdayTime, setWednesdayTimeState] = useState<string | null>(null);
  const [thursdayTime, setThursdayTimeState] = useState<string | null>(null);
  const [fridayTime, setFridayTimeState] = useState<string | null>(null);

  const [apiKey, setApiKeyState] = useState<string>("");

  const setWifiSSID = async (newVal: string) => {
    setWifiSSIDState(newVal);
    if (connectedDevice){
        updateCharacteristic(SERVICE_1_UUID,WIFI_SSID_UUID,newVal);
    }
  }

  const setWifiPassword = async (newVal: string) => {
    setWifiPasswordState(newVal);
    if (connectedDevice){
        updateCharacteristic(SERVICE_1_UUID,WIFI_PASSWORD_UUID,newVal);
    } 
  }

  const setStartCoords = async (newVal: string) => {
    setStartCoordsState(newVal);
    if (connectedDevice){
        updateCharacteristic(SERVICE_2_UUID,START_COORDS_UUID,newVal);
    } 
  }
  const setEndCoords = async (newVal: string) => {
    setEndCoordsState(newVal);
    if (connectedDevice){
        updateCharacteristic(SERVICE_2_UUID,END_COORDS_UUID,newVal);
    } 
  }


  const setMondayTime = async (newVal: string) => {
    setMondayTimeState(newVal);
    if (connectedDevice){
        updateCharacteristic(SERVICE_3_UUID,MON_TIME_UUID,newVal);
    } 
  }
  const setTuesdayTime = async (newVal: string) => {
    setTuesdayTimeState(newVal);
    if (connectedDevice){
        updateCharacteristic(SERVICE_3_UUID,TUE_TIME_UUID,newVal);
    } 
  }
  const setWednesdayTime = async (newVal: string) => {
    setWednesdayTimeState(newVal);
    if (connectedDevice){
        updateCharacteristic(SERVICE_3_UUID,WEN_TIME_UUID,newVal);
    } 
  }
  const setThursdayTime = async (newVal: string) => {
    setThursdayTimeState(newVal);
    if (connectedDevice){
        updateCharacteristic(SERVICE_4_UUID,THU_TIME_UUID,newVal);
    } 
  }
  const setFridayTime = async (newVal: string) => {
    setFridayTimeState(newVal);
    if (connectedDevice){
        updateCharacteristic(SERVICE_4_UUID,FRI_TIME_UUID,newVal);
    } 
  }
  const setApiKey = async (newVal: string) => {
    setApiKeyState(newVal);
    if (connectedDevice){
        updateCharacteristic(SERVICE_5_UUID,API_UUID,newVal);
    } 
  }
  


  const disconnectFromDevice = () => {
    if (connectedDevice) {
        updateCharacteristic(SERVICE_6_UUID,SIGNAL_END_UUID,"end");
        bleManager.cancelDeviceConnection(connectedDevice.id);
        setConnectedDevice(null);
    }
  };

  const requestAndroid31Permissions = async () => {
    const bluetoothScanPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      {
        title: "Location Permission",
        message: "Bluetooth Low Energy requires Location",
        buttonPositive: "OK",
      }
    );
    const bluetoothConnectPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      {
        title: "Location Permission",
        message: "Bluetooth Low Energy requires Location",
        buttonPositive: "OK",
      }
    );
    const fineLocationPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Location Permission",
        message: "Bluetooth Low Energy requires Location",
        buttonPositive: "OK",
      }
    );

    return (
      bluetoothScanPermission === "granted" &&
      bluetoothConnectPermission === "granted" &&
      fineLocationPermission === "granted"
    );
  };

  const requestPermissions = async () => {
    if (Platform.OS === "android") {
      if ((ExpoDevice.platformApiLevel ?? -1) < 31) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Permission",
            message: "Bluetooth Low Energy requires Location",
            buttonPositive: "OK",
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } else {
        const isAndroid31PermissionsGranted =
          await requestAndroid31Permissions();

        return isAndroid31PermissionsGranted;
      }
    } else {
      return true;
    }
  };

  const connectToDevice = async (device: Device) => {
    try {
      const deviceConnection = await bleManager.connectToDevice(device.id);
      setConnectedDevice(deviceConnection);
      await deviceConnection.discoverAllServicesAndCharacteristics();
      bleManager.stopDeviceScan();

      readInitialData(deviceConnection);
    } catch (e) {
      console.log("FAILED TO CONNECT", e);
    }
  };

  const isDuplicteDevice = (devices: Device[], nextDevice: Device) =>
    devices.findIndex((device) => nextDevice.id === device.id) > -1;

  const scanForPeripherals = () =>
    bleManager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.log(error);
      }

      if (
        device &&
        (device.localName === "Commuter Clock" || device.name === "Commuter Clock")
      ) {
        setAllDevices((prevState: Device[]) => {
          if (!isDuplicteDevice(prevState, device)) {
            return [...prevState, device];
          }
          return prevState;
        });
      }
    });

  

  const readInitialData = async (device: Device) => {

    var characteristicRes = await device.readCharacteristicForService(SERVICE_1_UUID,WIFI_SSID_UUID);
    setWifiSSIDState((characteristicRes.value?characteristicRes.value:''));
    characteristicRes = await device.readCharacteristicForService(SERVICE_1_UUID,WIFI_PASSWORD_UUID);
    setWifiPasswordState((characteristicRes.value?characteristicRes.value:''));

    characteristicRes = await device.readCharacteristicForService(SERVICE_2_UUID,START_COORDS_UUID);
    setStartCoordsState((characteristicRes.value?characteristicRes.value:''));
    characteristicRes = await device.readCharacteristicForService(SERVICE_2_UUID,END_COORDS_UUID);
    setEndCoordsState((characteristicRes.value?characteristicRes.value:''));

    characteristicRes = await device.readCharacteristicForService(SERVICE_3_UUID,MON_TIME_UUID);
    setMondayTimeState(characteristicRes.value);
    characteristicRes = await device.readCharacteristicForService(SERVICE_3_UUID,TUE_TIME_UUID);
    setTuesdayTimeState(characteristicRes.value);
    characteristicRes = await device.readCharacteristicForService(SERVICE_3_UUID,WEN_TIME_UUID);
    setWednesdayTimeState(characteristicRes.value);
    characteristicRes = await device.readCharacteristicForService(SERVICE_4_UUID,THU_TIME_UUID);
    setThursdayTimeState(characteristicRes.value);
    characteristicRes = await device.readCharacteristicForService(SERVICE_4_UUID,FRI_TIME_UUID);
    setFridayTimeState(characteristicRes.value);

    characteristicRes = await device.readCharacteristicForService(SERVICE_5_UUID,API_UUID);
    setApiKeyState((characteristicRes.value?characteristicRes.value:''));
  };

  return {
    connectToDevice,
    allDevices,
    connectedDevice,
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
  };
}

export default useBLE;