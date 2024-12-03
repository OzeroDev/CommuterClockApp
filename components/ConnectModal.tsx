import React, { FC, useCallback } from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  ListRenderItemInfo,
  Modal,
  FlatList
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Device } from "react-native-ble-plx";


type ConnectModalProps = {
    visible: boolean;
    closeModal: () => void;
    connectToPeripheral: (device: Device) => void;
    devices: Device[];
};

type DeviceListItemProps = {
  item: ListRenderItemInfo<Device>;
  connectToPeripheral: (device: Device) => void;
  closeModal: () => void;
};

const DeviceListItem: FC<DeviceListItemProps> = (props) => {
  const { item, connectToPeripheral, closeModal } = props;

  const connectAndCloseModal = useCallback(() => {
    connectToPeripheral(item.item);
    closeModal();
  }, [closeModal, connectToPeripheral, item.item]);

  return (
    <TouchableOpacity
      onPress={connectAndCloseModal}
      className='bg-blue-300 my-2 mx-2 px-5 py-1 rounded-lg'
    >
      <Text className='text-2xl'>{item.item.name ?? item.item.localName}</Text>
    </TouchableOpacity>
  );
};
  
const ConnectModal: FC<ConnectModalProps> = (props) => {
  const { devices, visible, connectToPeripheral, closeModal } = props;

  const renderDevice = useCallback(
    (item: ListRenderItemInfo<Device>) => {
      return (
        <DeviceListItem
          item={item}
          connectToPeripheral={connectToPeripheral}
          closeModal={closeModal}
        />
      );
    },
    [closeModal, connectToPeripheral]
  );

  return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={visible}
      >
        <SafeAreaView className='h-full w-full bg-slate-300 flex justify-center align-middle'>

          <View className='w-[80%] bg-white h-[60%] mx-auto p-3 rounded-3xl flex'>
            <Text className='text-xl pb-2 border-b-[1px] mb-2'>Tap on Your Device to Continue:</Text>

            <FlatList
              data={devices}
              renderItem={renderDevice}
            />
          </View>
        </SafeAreaView>
      </Modal>
  )
}

export default ConnectModal