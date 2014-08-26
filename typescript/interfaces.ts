/**
 * @author Sean Taylor Hutchison
 * @email seanthutchison@gmail.com
 * @website http://taylorhutchison.com
 * @created 8/27/2014
 * @last_modified 8/27/2014
 */

interface INarrateSettings {
    version:number;
    narrationElemCollection:Array<HTMLElement>;
    debug:boolean;
    modulator:any;
    audioPath:string;
    autoplay:boolean;
    timings:Array<number>;
    control:HTMLElement;
    position:number;
}
