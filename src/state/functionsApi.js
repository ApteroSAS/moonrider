const { search } = require("superagent");
const playlists = require("../constants/playlists");
import utils from '../utils';

export var obj={

    start(){
        //To update the state, we can manually dispatch an action using an event: here startgame 
        //The binding components will automatically and selectively update the entities in response to state changes
        AFRAME.scenes[0].systems.state.dispatch('startgame');
        AFRAME.scenes[0].systems.state.dispatch('menuopeningend');    
    },
    
    genres(){
        AFRAME.scenes[0].systems.state.dispatch('genremenuopen');
    },
    
    clearGenre(){
        AFRAME.scenes[0].systems.state.dispatch('genreclear');
    },
    
    difficulties(){
        AFRAME.scenes[0].systems.state.dispatch('difficultyfiltermenuopen');
    },
    
    options(){
        AFRAME.scenes[0].systems.state.dispatch('optionsmenuopen');
    },
    
    searchMusic(){
        AFRAME.scenes[0].systems.state.dispatch('keyboardopen');
    },
    
    playlistsChoice(){
        AFRAME.scenes[0].systems.state.dispatch('playlistmenuopen');
    },
    
    clearPlaylist(){
        AFRAME.scenes[0].systems.state.dispatch('playlistclear');
    },
    
    back(){
        AFRAME.scenes[0].systems.state.dispatch('menuback');
    },
    
    addList(sId,element){
        var list=document.getElementById(sId); 
        var newLi=document.createElement("option");
        var newEl=document.createTextNode(element);
    
        newLi.appendChild(newEl);
        list.appendChild(newLi);
        return newLi;
    },
    
    listSongs(sId){
        var i;
        var results=AFRAME.scenes[0].systems.state.state.search.results;
        document.getElementById(sId).length = 0;
        for(i=0;i<results.length;i++){
            if(results[i].songSubName=="Unknown Artist"){
                obj.addList(sId,results[i].author + " ; " + results[i].songName + " ; " + results[i].id);
             
            }
            else{
                obj.addList(sId,results[i].songSubName + " ; " + results[i].songName + " ; " + results[i].id);
            }
            
        }
    },
    
    getIdMusic(idListSongs){
        var music=document.getElementById(idListSongs).value;
        music=music.split(' ; ');
        return music[2];
    },
    
    getDifficultiesTab(idMusic){
        var results=AFRAME.scenes[0].systems.state.state.search.results;
        for(let i=0 ; i < results.length ; i++){
            if(results[i].id==idMusic){
               return results[i].difficulties;
            }
        }
    },
    
    listDifficulties(idListSongs,sId){
        var nbDifficulties;
        var musicId=obj.getIdMusic(idListSongs);
        var difficulties=obj.getDifficultiesTab(musicId);
        nbDifficulties=difficulties.length;
        document.getElementById(sId).length = 0;
        for(var i=0 ; i<nbDifficulties ; i++){
            obj.addList(sId,difficulties[i]);
        }
    },
    
    getDifficulty(idListD){
        return document.getElementById(idListD).value;
    },
    
    getSrcImage(id){
        const results=AFRAME.scenes[0].systems.state.state.search.results;
        for(let i=0 ; i < results.length ; i++){
            if(results[i].id==id){
                return utils.getS3FileUrl(results[i].id, 'image.jpg');
            }
        }
    },
    
    selectMusic(id){
        AFRAME.scenes[0].systems.state.dispatch('menuchallengeselect',id);
    },
    
    selectDifficulty(difficulty){
        AFRAME.scenes[0].systems.state.dispatch('menudifficultyselect',difficulty);
    },
    
    play(id){
        AFRAME.scenes[0].systems.state.dispatch('playbuttonclick',id);
    },
    
    playMusic(idLSongs,idLDifficulties){
        var idMusic=obj.getIdMusic(idLSongs);
        var difficulty=obj.getDifficulty(idLDifficulties);
        obj.selectMusic(idMusic);
        obj.selectDifficulty(difficulty);
        obj.play(idMusic);
    },
    
    pause(){
        AFRAME.scenes[0].systems.state.dispatch('pausegame');
    },
    
    resume(){
        AFRAME.scenes[0].emit('gamemenuresume');
    },
    
    restart(){
        AFRAME.scenes[0].emit('gamemenurestart');
        AFRAME.scenes[0].emit('cleargame');
    },
    
    exit(){
        AFRAME.scenes[0].emit('gamemenuexit');
        AFRAME.scenes[0].emit('cleargame');
    },  
};
