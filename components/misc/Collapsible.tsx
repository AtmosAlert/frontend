import { PropsWithChildren, useState } from 'react';
import { StyleSheet, TouchableOpacity, View,Text } from 'react-native';

import { IconSymbol } from '@/components/ui/IconSymbol';
import Colors from '@/constants/Colors';
import Styles from '@/constants/Styles';

type CollapsibleProps = PropsWithChildren & {
  title: string;
  text?: string | null; // Optional text prop
  titleColor?: string; // Optional title color
};

export function Collapsible({ children, title,text=null,titleColor=Colors.primary }: CollapsibleProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View>
      <TouchableOpacity
        style={styles.heading}
        onPress={() => setIsOpen((value) => !value)}
        activeOpacity={0.8}>
        <IconSymbol
          name="chevron.right"
          size={18}
          weight="medium"
          color={titleColor}
          style={{ transform: [{ rotate: isOpen ? '90deg' : '0deg' }] }}
        />

        <View>
          <Text style={[Styles.cardText,{color:titleColor, fontWeight:'600'}]}>{title}</Text>
          <Text style={[Styles.smallText]}>{text}</Text>
        </View>
      </TouchableOpacity>
      {isOpen && <View style={styles.content}>{children}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  content: {
    marginTop: 6,
    marginLeft: 24,
  },
});