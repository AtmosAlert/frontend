import { StyleSheet, Text, View,Image, ScrollView, Button, TextInput } from 'react-native'
import { useSession } from '@/ctx'
import AccountInfo from '@/components/pages/profile/AccountInfo'
import Styles from '@/constants/Styles'

type Props = {}

type Profile = {
  profileImage: string,
  name: string,
  email: string,
  phone: string,
}

const profile = (props: Props) => {
  const {session} = useSession()

  return (
    <ScrollView contentContainerStyle={Styles.pageContainer}>

    <AccountInfo session={session} />
  </ScrollView>
  );
}
export default profile

const styles = StyleSheet.create({
});