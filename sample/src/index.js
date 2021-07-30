
const api=require("moonriderlib");
require('./scene.html');
require('./index.css');

api.startApi();

window.onload=function(){
    const buttonBegin = document.getElementById('begin');
    const buttonPlay=document.getElementById('testPlay');
    const buttonPause=document.getElementById('pause');
    const buttonRestart=document.getElementById('restart');
    const buttonResume=document.getElementById('resume');
    const buttonExit=document.getElementById('exit');
    

    const selectListSongs=document.getElementById('listSongs');
    selectListSongs.addEventListener('change',function(){
        api.objet_api.listDifficulties('listSongs','listDifficulties');
    })

    buttonBegin.addEventListener('click',function(){
       
        buttonBegin.style.opacity = 0;
        buttonBegin.disabled=true;
        api.objet_api.start();    
        api.objet_api.listSongs("listSongs");
        api.objet_api.listDifficulties("listSongs","listDifficulties");
    });
    
    buttonPlay.addEventListener('click',function(){
        api.objet_api.playMusic('listSongs','listDifficulties');
    });

    buttonPause.addEventListener('click',function(){
        api.objet_api.pause();
    })

    buttonRestart.addEventListener('click',function(){
        api.objet_api.restart();
    })
    buttonResume.addEventListener('click',function(){
        api.objet_api.resume();
    })
    buttonExit.addEventListener('click',function(){
        api.objet_api.exit();
    })
};