import React from 'react';
import { Text, View, StyleSheet, TextInput, Alert, TouchableOpacity, Modal, ScrollView, KeyboardAvoidingView } from 'react-native';
import * as firebase from "firebase";
import db from "../config.js";

export default class SignupLoginScreen extends React.Component {
    constructor(){
        super();
        this.state = {
            emailId: "",
            password: "",
            isModalVisible: false, 
            firstName: '',
            lastName: '',
            address: '',
            contact: '',
            confirmPassword: '',

        }
    }
    
    userSignUp = (emailId, password,confirmPassword) =>{
        if(password !== confirmPassword){
          
          return Alert.alert("password doesn't match\nCheck your password.")
        }else{
          firebase.auth().createUserWithEmailAndPassword(emailId, password)
          .then(()=>{
            db.collection('users').add({
              first_name:this.state.firstName,
              last_name:this.state.lastName,
              contact:this.state.contact,
              email_id:this.state.emailId,
              address:this.state.address,
              IsToyRequestActive:false
            })
            return  Alert.alert(
                 'User Added Successfully',
                 '',
                 [
                   {text: 'OK', onPress: () => this.setState({"isModalVisible" : false})},
                 ]
             );
          })
          .catch((error)=> {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            return Alert.alert(errorMessage)
          });
        }
    }

    userLogin = (emailId, password) => {
        firebase.auth().signInWithEmailAndPassword(emailId, password)
        .then(() => {
            this.props.navigation.navigate('Home');
            return Alert.alert("Successfully Logged In");
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            return Alert.alert(errorMessage);
        });
    }
    
    showModal = ()=> {
        return(
            <Modal
            animationType ='fade'
            transparent = {true}
            visible = {this.state.isModalVisible}
            >
              <View style={styles.modalContainer}>
                <ScrollView style={{width:'100%'}}>
                  <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
                    <Text style={styles.modalTitle}> Registration </Text>
                    <TextInput
                    style={styles.formTextInput}
                    placeholder={"First name"}
                    maxLength={8}
                    onChangeText={(text) => {
                      this.setState ({firstName: text})}}
                    />
                    <TextInput
                    style={styles.formTextInput}
                    placeholder={"Last name"}
                    maxLength={8}
                    onChangeText={(text) => {
                      this.setState ({lastName: text})}}
                    />
                    <TextInput
                    style={styles.formTextInput}
                    keyboardType = {'numeric'}
                    placeholder={"Contact"}
                    maxLength={10}
                    onChangeText={(text) => {
                      this.setState ({contact: text})}}
                    />
                    <TextInput
                    style={styles.formTextInput}
                    placeholder={"Address"}
                    multiline={true}
                    
                    onChangeText={(text) => {
                      this.setState ({address: text})}}
                    />
                    <TextInput
                    style={styles.formTextInput}
                    placeholder={"Email"}
                    keyboardType={'email-address'}
                    onChangeText={(text) => {
                      this.setState ({emailId: text})}}
                    />
                    <TextInput
                    style={styles.formTextInput}
                    placeholder={"Password"}
                    secureTextEntry={true}
                    onChangeText={(text) => {
                      this.setState ({password: text})}}
                    />
                    <TextInput
                    style={styles.formTextInput}
                    placeholder={"Confirm Password"}
                    secureTextEntry={true}
                    onChangeText={(text) => {
                      this.setState ({confirmPassword: text})}}
                    /> 
                    <View style={styles.modalBackButton}>
                      <TouchableOpacity style={styles.registerButton}
                      onPress={()=>{this.userSignUp(this.state.emailId, this.state.password, this.state.confirmPassword)}}>
                        <Text style={styles.registerButtonText}> Register </Text>
                      </TouchableOpacity>
                    </View>
    
                    <View style={styles.modalBackButton}>
                      <TouchableOpacity style={styles.cancelButton}
                      onPress={()=> {this.setState ({'isModalVisible': false}) }}>
                        <Text style={{color: '#02FF88'}}> Back </Text>
                      </TouchableOpacity>
                    </View>
                  </KeyboardAvoidingView>
                </ScrollView>
              </View>
            </Modal>
        );
      }
    
    
    
    render(){
        return(
            <View style={styles.container}> 
                <View style={styles.profileContainer}>
                    <Text style={styles.title}> Toys Exchange </Text>
                </View>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    {
                        this.showModal()
                    }
                </View>
                <View>
                    <TextInput style={styles.loginBox} 
                        keyboardType='email-address' 
                        placeholder='abc@hotmail.com'
                        onChangeText={(text) => 
                            this.setState ({emailId: text})
                        }/>
                    
                   
                    
                    <TextInput style={styles.loginBox} 
                        secureTextEntry= {true}
                        placeholder='Enter password'
                        onChangeText={(text) => 
                            this.setState ({password: text})
                        }/>
            
                   
                    <TouchableOpacity style={[styles.button, {marginBottom: 20, marginTop: 20}]}
                        onPress={() => {this.userLogin(this.state.emailId, this.state.password)}}
                    >
                        <Text style={styles.buttonText}> Login </Text> 
                    </TouchableOpacity>
                   
                    <TouchableOpacity style={styles.button}
                        onPress={()=>{this.setState({ isModalVisible:true})}}
                    >
                        <Text style={styles.buttonText}> Sign Up </Text> 
                    </TouchableOpacity>

                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:'#4E4C4C'
    },
    profileContainer:{
      flex:0.6,
      justifyContent:'center',
      alignItems:'center',
    },
    title :{
      fontSize:65,
      fontWeight:'300',
      color : '#02FF88'
    },
    loginBox:{
      width: 300,
      height: 40,
      borderBottomWidth: 1.5,
      borderColor : '#ff8a65',
      fontSize: 20,
      margin:10,
      paddingLeft:10
    },
    KeyboardAvoidingView:{
      flex:1,
      justifyContent:'center',
      alignItems:'center'
    },
    modalTitle :{
      justifyContent:'center',
      alignSelf:'center',
      fontSize:30,
      color:'#02FF88',
    },
    modalContainer:{
      flex:1,
      borderRadius:20,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:"#ffff",
      marginRight:30,
      marginLeft : 30,
      marginTop:80,
      marginBottom:80,
    },
    formTextInput:{
      width:"75%",
      height:35,
      alignSelf:'center',
      borderColor:'#02FF88',
      borderRadius:10,
      borderWidth:1,
      marginTop:20,
      padding:10
    },
    registerButton:{
      width:200,
      height:40,
      alignItems:'center',
      justifyContent:'center',
      borderWidth:1,
      borderRadius:10,
      marginTop:30
    },
    registerButtonText:{
      color:'#02FF88',
      fontSize:15,
      fontWeight:'bold'
    },
    cancelButton:{
      width:200,
      height:40,
      alignItems:'center',
      justifyContent:'center',
      borderWidth:1,
      borderRadius:10,
      marginTop:30
    },
    button:{
      width:300,
      height:50,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:25,
      backgroundColor:"#858585",
      shadowColor: "#02FF88",
      shadowOffset: {
         width: 20,
         height: 10,
      },
      shadowOpacity: 0.30,
      shadowRadius: 10.32,
      elevation: 5,
    },
    buttonText:{
      color:'#02FF88',
      fontWeight:'200',
      fontSize:20
    },
    buttonContainer:{
      flex:1,
      alignItems:'center'
    }
  })
  