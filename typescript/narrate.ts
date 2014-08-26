/**
 * @author Sean Taylor Hutchison
 * @email seanthutchison@gmail.com
 * @website http://taylorhutchison.com
 * @created 8/25/2014
 * @last_modified 8/25/2014
 */
/// <reference path="interfaces.ts"/>

class narrate {
    private static settings:INarrateSettings = {
        version: 0.1,
        narrationElemCollection: [],
        debug:false,
        modulator:undefined,
        audioPath:undefined,
        autoplay:false,
        timings:[],
        control:undefined,
        position:0
    };

    private static go(position:number):number {
        var elementCount = narrate.settings.narrationElemCollection.length;
        if(position%elementCount==0){
            return 0;
        }
        else if(position>=0 && position<=elementCount-1){
            return position;
        }
        else if(position>=0){
            return Math.abs(position % elementCount);
        }
        else {
            return elementCount-Math.abs(position%elementCount);
        }
    }

    static getGo(position:number){
        console.log(narrate.go(position));
    }


    private static play(start:number, duration:number){

    }

    static get options():INarrateSettings{
        return narrate.settings;
    }

    static set debug(debug_bool:boolean){
        if(typeof(debug_bool)=="boolean"){
            narrate.settings.debug = debug_bool;
            narrate.logIfDebugging("Debugging mode has be turned on");
        }
    }

    static set modulator(modObj){
        //Check if modObj is valid
        if(modObj) {
            narrate.settings.modulator = modObj;
        }
    }

    static set audioPath(path){
        //Check if its a full, valid path
        if(path){
            narrate.settings.audioPath = path;
            narrate.setupAudio();
        }
    }

    static jump(position:any){
        if(typeof(position)=="number"){
            narrate.go(position);
        }
        else if (position instanceof HTMLElement){
            narrate.go(position);
        }
        return narrate;
    }

    static previous(){
        return narrate;
    }

    static next(){
        return narrate;
    }

    static logIfDebugging(message:string, force?:boolean){
        if(narrate.settings.debug || force==true){
            console.log(message);
        }
        return narrate;
    }

    static setupAudio(){
        return narrate;
    }

    static config(configObj){
        for(var prop in configObj){
            if(narrate.settings.hasOwnProperty(prop)){
                narrate.settings[prop] = configObj[prop];
            }
        }
        return narrate;
    }

    static getAllMatchingElements(name:string,docElements:any){
        var counter:number = 0;
        for(var counter=0;counter<docElements.length;counter++){
            if(docElements[counter].hasAttribute(name) || docElements[counter].className.indexOf(name) > -1){
                narrate.settings.narrationElemCollection.push(docElements[counter]);
            }
        }
        narrate.logIfDebugging(narrate.settings.narrationElemCollection.length + " elements added to the narration matching \""+name+"\"");
    }

    constructor(name:string,config?:any){
        if(config!=undefined){
            narrate.config(config);
        }
        if(name!=undefined){
            narrate.getAllMatchingElements(name,document.all);
        }
        else {
            narrate.logIfDebugging("You must supply a name to match class or attribute values against. Try narrate(\"mystory\")",true);
        }
        return narrate;
    }

}
