import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import typeColor from '../utils/getTypeColors';

interface TypeBadgeProps {
    type: string;
}

const TypeBadge: React.FC<TypeBadgeProps> = ({ type }: TypeBadgeProps) => {
    return (
        <Text key={type} style={{ ...styles.typeName, backgroundColor: typeColor[type].color }}>
            {type}
        </Text>
    );
};

const styles = StyleSheet.create({
  
    typeName: {
        paddingHorizontal: 9,
        marginTop: 35,
        borderWidth: 1,
        borderRadius: 10,
        marginHorizontal: 3,
        color: 'white',
        fontWeight: 'bold',
        textShadowColor: 'black',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
    },
});

export default React.memo(TypeBadge)
;