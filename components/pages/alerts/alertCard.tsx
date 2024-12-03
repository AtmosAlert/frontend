import {StyleSheet, Text, View } from 'react-native'

import Styles from '@/constants/Styles'
import Colors from '@/constants/Colors';
import daysAgo from '@/utils/timeAgo'
import { Alert } from '@/constants/types';

import { Collapsible } from '@/components/misc/Collapsible';

const options:any = {
    timeZone: "America/New_York", // Time zone for UTC-5
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false // Use 24-hour format; set to true for 12-hour format
  };
  const formatter = new Intl.DateTimeFormat("en-US", options);


type Props = {
    alert:Alert
}
const AlertCard = ({alert}: Props) => {
  return (
    <View style={Styles.card} key={alert.id}>
    <Collapsible title={alert.event} text={daysAgo(alert.sent)} titleColor={Colors[alert.severity]} >

    {/*Sent Time */}
    
    <View style={styles.alertInfoEntry}>
      <Text style={Styles.cardText2}>Sent: </Text>
      <Text style={[Styles.cardText]}>{formatter.format(new Date(alert.sent))}</Text>
    </View>

    {/*Expires */}

    <View style={styles.alertInfoEntry}>
      <Text style={Styles.cardText2}>Expires: </Text>
      <Text style={[Styles.cardText]}>{formatter.format(new Date(alert.expires))}</Text>
    </View>

    {/*Event Start Time */}


    <View style={styles.alertInfoEntry}>
      <Text style={Styles.cardText2}>Event Start Time: </Text>
      <Text style={[Styles.cardText]}>{formatter.format(new Date(alert.eventStartTime))}</Text>
    </View>

    {/*Event End Time */}

    <View style={styles.alertInfoEntry}>
      <Text style={Styles.cardText2}>Event End Time: </Text>
      <Text style={[Styles.cardText]}>{formatter.format(new Date(alert.eventEndTime))}</Text>
    </View>

      {/*Severity */}

    <View style={styles.alertInfoEntry}>
      <Text style={Styles.cardText2}>Severity: </Text>
      <Text style={[Styles.cardText]}>{alert.severity}</Text>
    </View>

    {/*Sender */}

    <View style={styles.alertInfoEntry}>
      <Text style={Styles.cardText2}>Sender: </Text>
      <Text style={[Styles.cardText]}>{alert.sender}</Text>
    </View>

    </Collapsible>
  </View>
  )
}
export default AlertCard
const styles = StyleSheet.create({
    alertInfoEntry: {
        flexDirection:'row'
      }
})