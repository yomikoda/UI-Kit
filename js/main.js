/** CLOCK **/

function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('time').innerHTML =
        "<p>" + h + "</p><p>" + m + "</p><p>" + s + "</p";
    var t = setTimeout(startTime, 500);
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i
    }; // add zero in front of numbers < 10
    return i;
}



$(function () {

    /** TAGS **/

    $('#tags>p').click(function () {
        $(this).css({
            'opacity': '0'
        });
        $(this).css({
            'padding-right': '0px',
            'transition': 'all ease 1s'
        })
    });
    /**CALENDAR**/
    
    
 var example = flatpickr('#flatpickr');
    

    
    
    /**SLIDER**/
    /** SOUNDCLOUNDY THINGY **/
    
    var wavesurfer = WaveSurfer.create({
        container: '#waveform',
        waveColor: 'rgba(255,255,255,0.2)',
        progressColor: 'white',
        cursorWidth: 0,
        barWidth : 3

    });

    wavesurfer.load('https://wavesurfer-js.org/example/media/demo.wav');
    
    var formatTime = function (time) {
        return [
        Math.floor((time % 3600) / 60), // minutes
            ('00' + Math.floor(time % 60)).slice(-2) // seconds
    ].join(':');
    };

    // Show current time
    wavesurfer.on('audioprocess', function () {
        $('#timewave').text(formatTime(wavesurfer.getCurrentTime()));
    });

    // Show clip duration
    wavesurfer.on('ready', function () {
        
//        wavesurfer.playPause();
        
        $('#timewave').click(function(){
            wavesurfer.playPause();
        });
    });


/** GRAPH **/
    
/** RANGE SLIDER **/
    
/** TABS **/
    
    $('.tab').click(function () {
        $(this).toggleClass('clicked-tab');
        
    });
    
    

});