
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
        api.object_api.listDifficulties('listSongs','listDifficulties');
    })

    buttonBegin.addEventListener('click',function(){
       
        buttonBegin.style.opacity = 0;
        buttonBegin.disabled=true;
        api.object_api.start();    
        api.object_api.listSongs("listSongs");
        api.object_api.listDifficulties("listSongs","listDifficulties");
    });
    
    buttonPlay.addEventListener('click',function(){
        api.object_api.playMusic('listSongs','listDifficulties');
    });

    buttonPause.addEventListener('click',function(){
        api.object_api.pause();
    })

    buttonRestart.addEventListener('click',function(){
        api.object_api.restart();
    })
    buttonResume.addEventListener('click',function(){
        api.object_api.resume();
    })
    buttonExit.addEventListener('click',function(){
        api.object_api.exit();
    })
};