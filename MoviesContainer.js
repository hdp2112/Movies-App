import React from 'react';
import { StyleSheet, Button, View, Text, TextInput, ScrollView, Image, TouchableHighlight, Modal, Dimensions } from 'react-native';

import MovieCard from './MovieCard'

const apiUrl = "http://www.omdbapi.com/?apikey=a0514b1a"

export default class MovieContainer extends React.Component{

    state={
        selectedMovie: {}
    }

    openPopup = id => {
        fetch(apiUrl+ "&i=" + id)
        .then(resp=>resp.json())
        .then(data=> {
          this.setState({
            selectedMovie: data
          })
        })
    }

    render(){

        return (
            <View style={styles.container}>
                <ScrollView style={styles.results}>

                {this.props.movies.map(movie=> (
                    <MovieCard
                    key={movie.imdbID}
                    movie={movie}
                    onPress={this.openPopup}
                    />)
                )}
                 {this.props.movies.length !==0 &&
                 <View>
                    
                </View>}
                <View style={{height: 110}}></View>

                </ScrollView>
                <Modal 
                    style={styles.modal}
                    animationType= "slide"
                    transparent={false}
                    visible={(typeof this.state.selectedMovie.Title != "undefined") ? true : false}
                >
                    <ScrollView>
                    <View style={styles.popup}>
                        <Text style={styles.popTitle}>{this.state.selectedMovie.Title}</Text>
                        <Text style={{color: "#fff", fontSize: 20 }}>Rating: {this.state.selectedMovie.imdbRating}</Text>

                        <Image
                            source={{uri: this.state.selectedMovie.Poster}}
                            style={{width: '100%', height: 465, marginTop: 49}}
                            resizeMode= "cover"
                        />
                        <Text style={{color: "#fff", fontSize: 18, fontWeight: '400', marginTop: 20}}>{this.state.selectedMovie.Plot}</Text>
        
                        <TouchableHighlight onPress={()=>this.props.watchLater(this.state.selectedMovie)} style={styles.watchLater}>
                            <Text style={{textAlign: "center", fontSize: 19, fontWeight:'500', color: "#fff"}}>Watch Later</Text>
                        </TouchableHighlight>

                    </View>
                    </ScrollView>

                    <TouchableHighlight
                        onPress={()=> this.setState({ selectedMovie : {} })}
                    >
                        <Text style={styles.closeBtn}>Close</Text>
                    </TouchableHighlight>

                </Modal>
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

    },
    title: {
      color: '#ff414e',
      fontWeight: '700',
      fontSize: 32,
      textAlign: "center",
      marginBottom: 20
    },
    searchBox:{
      fontSize: 21,
      padding: 20,
      width: '92%',
      backgroundColor: '#fff',
      borderRadius: 15,
    },
    results: {
      flex: 1,
    },
    popup: {
      padding: 50,
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
    watchLater:{
        padding: 15,
        margin: 30,
        backgroundColor: '#ff414e',
        borderRadius: 10,
    }

  })