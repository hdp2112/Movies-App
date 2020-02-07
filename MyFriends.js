import React from 'react';
import { StyleSheet, View, Text, ScrollView, Modal, } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import ProfileCard from './ProfileCard'
import MovieCard from './MovieCard'



export default class Profile extends React.Component{

    state={
        friends: [],
        selectedFriend: {}
    }

    //fetch to get all follows where follower_id is this.props.screenProps.userId 
    getFreindsMovies=()=>{
        fetch("http://localhost:3000/follows/find_my_followees",{
            method:"POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ follower_id: this.props.screenProps.userId })
        })
        .then(resp=> resp.json())
        .then(friends => this.setState({
            friends: friends
        }))
    }

    componentDidMount(){
        this.getFreindsMovies()
    }

    selectFriend=(friend)=>{
        this.setState({
            selectedFriend: friend
        },()=> console.log(this.state.selectedFriend.movies))
    }

    clearFriend=()=>{
        this.setState({
            selectedFriend: {}
        })
    }

    render(){

        return(
            <View style={styles.container}>
                <Text style={{fontSize: 28, fontWeight: '600', color: '#ff414e', marginBottom: 9}}>Friends</Text>
                <View style={{borderBottomWidth: 1.5, borderBottomColor: '#ff414e', width: 400, }}></View>
                <ScrollView>
                    {this.state.friends.map(friend=> {
                        return(
                            <ProfileCard
                            key={friend.id}
                            username={friend.username}
                            friend={friend}
                            selectFriend={this.selectFriend}
                            />
                        )
                    })}
                    <Modal 
                    style={{backgroundColor: '#333'}}
                    animationType= "slide"
                    transparent={false}
                    visible={this.state.selectedFriend.username !== undefined ? true : false}
                    >
                    <View style={styles.popup}>
                        <Ionicons
                        name='ios-arrow-dropleft'
                        size={32}
                        style={styles.homeIcon}
                        onPress={()=> this.clearFriend()}

                        />
                        <Text style={{marginTop: 50, fontSize: 30, textAlign: 'center', fontWeight: '600', color: '#fff'}}>{this.state.selectedFriend.username}'s Watch Later</Text>
                        <View style={{borderBottomWidth: 1.5, borderBottomColor: '#ff414e', marginBottom: 10, marginTop: 10, }}></View>
                        <ScrollView style={styles.results}>
                        {this.state.selectedFriend.movies ? 
                            this.state.selectedFriend.movies.map(movie=> {
                                return(
                                    <MovieCard
                                        key={movie.imdbID}
                                        movie={movie}
                                    />
                                )
                            })

                            : 
                            
                            null}
                        </ScrollView>
                    </View>
                    </Modal>
                </ScrollView>
                
            </View>
        )
    }

}


const styles= StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor: '#333',
      alignItems: "center",
      justifyContent: 'flex-start',
      paddingTop: 35,
    },
    results:{
        flex: 1,
    },
    popup: {
        backgroundColor: '#333',
        flex:1,
    },
    popTitle:{
        fontSize: 29,
        fontWeight: '600',
        color: '#ff414e',
    },
    closeBtn:{
        padding: 20,
        fontSize: 24,
        fontWeight: '600',
        color: '#fff',
        backgroundColor: '#ff414e'
    },
    backButton:{
        width: '100%',
        height: 45,
        backgroundColor: '#ff414e'
    },
    homeIcon:{
        zIndex: 9,
        position: 'absolute',
        color: '#ff414e',
        marginTop: 55,
        marginLeft: 11
    },
})