import React, { forwardRef, useRef } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';

const CollectionBottomSheet = forwardRef((props, ref) => {
  const sheetRef = useRef(null);

  const CloseBtn = () => {
    return <Button title="Close" onPress={() => sheetRef.current.close()} />;
  };

  return (
    <BottomSheet
      ref={(bottomSheet) => {
        sheetRef.current = bottomSheet;
        if (ref) {
          ref.current = bottomSheet;
        }
      }}
      index={0}
      snapPoints={['25%', '50%', '50%']}
      enablePanDownToClose={true}
      handleIndicatorStyle={{ backgroundColor: '#fff' }}
      backgroundStyle={{ backgroundColor: '#1d0f4e' }}
    >
      <View style={styles.contentContainer}>
        <Text style={styles.containerHeadline}>{props.title}</Text>
        <CloseBtn />
      </View>
    </BottomSheet>
  );
});

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  containerHeadline: {
    fontSize: 24,
    fontWeight: '600',
    padding: 20,
    color: '#fff',
  },
});

export default CollectionBottomSheet;
