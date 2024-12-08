import { StyleSheet, Text, View,Image, ScrollView, TextInput } from 'react-native'


import { useState,useEffect } from 'react'
import { useSession } from '@/ctx'
import { IconSymbol } from '@/components/ui/IconSymbol'

import Styles from '@/constants/Styles'
import Colors from '@/constants/Colors'
import Button from '@/components/ui/Button'

type Props = {
    session:string | null | undefined
}

type Profile = {
  profileImage: string,
  name: string,
  email: string,
  phone: string,
}

const AccountInfo = ({session}: Props) => {
  const {signOut} = useSession()
  const [Profile, setProfile] = useState<Profile | null>(null)
  const [NewProfile, setNewProfile] = useState<Profile | null>(null)
  const [EditProfile, setEditProfile] = useState<boolean>(false)
  
  const fetchUserData = async () => {
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URI}/api/user/me`, {
        headers: { Authorization: `Bearer ${session}` },
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setProfile(data)
      setNewProfile(data)
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData(); // Invoke the function
  }, [session]);

  
  
const updateUser = async () => {
  try {
    if (!NewProfile) {
      console.error("No profile data to update.");
      return;
    }
    const body = {
      name: NewProfile.name,
      email: NewProfile.email,
      phone: NewProfile.phone,
      profileImage: NewProfile.profileImage,
    };


    const response = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URI}/api/user/me`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${session}`,
        "Content-Type": "application/json", // Set the content type
      },
      body: JSON.stringify(body), // Convert body to JSON string
    });

    if (!response.ok) {
      throw new Error(`Failed to update user: ${response.statusText}`);
    }

    await fetchUserData();
    setEditProfile(false)

  } catch (error) {
    return console.log(error)
  }
};


  return (
    NewProfile && <View>
    
    <Text style={Styles.pageTitle}>
      Account Info
    </Text>

    <View style={Styles.card}>
    <Image
      source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg' }}
      style={styles.profileImage}
    />


    <View style={styles.infoContainer}>
      <Text style={Styles.smallText}>Name</Text>
      
      {EditProfile? (<TextInput
        style={Styles.inputField}
        placeholder="Enter your name"
        value={NewProfile.name}
        onChangeText={(changedText) =>
          setNewProfile((profile) => ({ ...profile as Profile, name: changedText }))
        }
      />): 
      (<Text style={Styles.normalText}>{NewProfile.name}</Text>)}

    </View>

    <View style={styles.infoContainer}>
      <Text style={Styles.smallText}>Email</Text>
      {EditProfile? (<TextInput
        style={Styles.inputField}
        placeholder="Enter your email"
        value={NewProfile.email}
        onChangeText={(changedText) =>
          setNewProfile((profile) => ({ ...profile as Profile, email: changedText }))
        }
      />): 
      (<Text style={Styles.normalText}>{NewProfile.email}</Text>)}
    </View>
    <View style={styles.infoContainer}>
      <Text style={Styles.smallText}>Phone number</Text>
      {EditProfile? (<TextInput
        style={Styles.inputField}
        placeholder="Enter your phone"
        value={NewProfile.phone}
        onChangeText={(changedText) =>
          setNewProfile((profile) => ({ ...profile as Profile, phone: changedText }))
        }
      />): 
      (<Text style={Styles.normalText}>{NewProfile.phone}</Text>)}
    </View>

    <View style={{marginBottom:30}}>
    {
      EditProfile? (<View style={styles.buttonsContainer}>
      <Button text="Confirm" onPress={()=>updateUser()}/>
      <Button text="Cancel" onPress={()=>{setNewProfile(Profile);setEditProfile(false)}} color={Colors.secondary} />
    </View>) : (
      <View>
         <Button text="Edit" onPress={()=>setEditProfile(true)}/> 
         <Button text="Sign out" color={Colors.secondary} onPress={()=>signOut()}/> 
    </View>)
    }
    </View>
    </View>
    
  </View>
  );
}
export default AccountInfo

const styles = StyleSheet.create({
  container: {
   'width':'100%'
  },
  infoContainer: {
    // flex:1,
    width:'100%',
    paddingVertical: 4,
    flexDirection:'column',
    marginBottom: 20,
  },
  profileImage: {
    margin:"auto",
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  buttonsContainer: {
    flexDirection:'row',
    gap:30,
    justifyContent:'center'

  }
});