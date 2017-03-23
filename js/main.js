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
        barWidth: 3

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

        $('#timewave').click(function () {
            wavesurfer.playPause();
        });
    });


    /** GRAPH **/

    /** RANGE SLIDER **/

    /** TABS **/

    $('.tab').click(function () {
        $(this).toggleClass('clicked-tab');

    });

    $('.simpletab').click(function () {
        $(this).toggleClass('selectedsimpletab');

    });

    /** AUDIO ?? **/


    var music = document.getElementById('music'); // id for audio element
    var duration = music.duration; // Duration of audio clip, calculated here for embedding purposes
    var pButton = document.getElementById('pButton'); // play button
    var playhead = document.getElementById('playhead'); // playhead
    var timeline = document.getElementById('timeline'); // timeline

    // timeline width adjusted for playhead
    var timelineWidth = timeline.offsetWidth - playhead.offsetWidth;

    // play button event listenter
    pButton.addEventListener("click", play);

    // timeupdate event listener
    music.addEventListener("timeupdate", timeUpdate, false);

    // makes timeline clickable
    timeline.addEventListener("click", function (event) {
        moveplayhead(event);
        music.currentTime = duration * clickPercent(event);
    }, false);

    // returns click as decimal (.77) of the total timelineWidth
    function clickPercent(event) {
        return (event.clientX - getPosition(timeline)) / timelineWidth;
    }

    // makes playhead draggable
    playhead.addEventListener('mousedown', mouseDown, false);
    window.addEventListener('mouseup', mouseUp, false);

    // Boolean value so that audio position is updated only when the playhead is released
    var onplayhead = false;

    // mouseDown EventListener
    function mouseDown() {
        onplayhead = true;
        window.addEventListener('mousemove', moveplayhead, true);
        music.removeEventListener('timeupdate', timeUpdate, false);
    }

    // mouseUp EventListener
    // getting input from all mouse clicks
    function mouseUp(event) {
        if (onplayhead == true) {
            moveplayhead(event);
            window.removeEventListener('mousemove', moveplayhead, true);
            // change current time
            music.currentTime = duration * clickPercent(event);
            music.addEventListener('timeupdate', timeUpdate, false);
        }
        onplayhead = false;
    }
    // mousemove EventListener
    // Moves playhead as user drags
    function moveplayhead(event) {
        var newMargLeft = event.clientX - getPosition(timeline);

        if (newMargLeft >= 0 && newMargLeft <= timelineWidth) {
            playhead.style.marginLeft = newMargLeft + "px";
        }
        if (newMargLeft < 0) {
            playhead.style.marginLeft = "0px";
        }
        if (newMargLeft > timelineWidth) {
            playhead.style.marginLeft = timelineWidth + "px";
        }
    }

    // timeUpdate
    // Synchronizes playhead position with current point in audio
    function timeUpdate() {
        var playPercent = timelineWidth * (music.currentTime / duration);
        playhead.style.marginLeft = playPercent + "px";
        if (music.currentTime == duration) {
            pButton.className = "";
            pButton.className = "play";
        }
    }

    //Play and Pause
    function play() {
        // start music
        if (music.paused) {
            music.play();
            // remove play, add pause
            pButton.className = "";
            pButton.className = "pause";
        } else { // pause music
            music.pause();
            // remove pause, add play
            pButton.className = "";
            pButton.className = "play";
        }
    }

    // Gets audio file duration
    music.addEventListener("canplaythrough", function () {
        duration = music.duration;
    }, false);

    // getPosition
    // Returns elements left position relative to top-left of viewport
    function getPosition(el) {
        return el.getBoundingClientRect().left;
    }

    function readableDuration(seconds) {
        sec = Math.floor(seconds);
        min = Math.floor(sec / 60);
        min = min >= 10 ? min : '0' + min;
        sec = Math.floor(sec % 60);
        sec = sec >= 10 ? sec : '0' + sec;
        return min + ':' + sec;
    };


    $('#trackduration').text(readableDuration(duration));

    /** CIRCLE STATS**/
    

    var bar00 = new ProgressBar.Circle(container00, {
        color: 'white',
        // This has to be the same size as the maximum width to
        // prevent clipping
        strokeWidth: 6,
        trailWidth: 6,
        trailColor: 'rgba(255,255,255,0.2)',
        easing: 'easeInOut',
        duration: 1400,
        text: {
            autoStyleContainer: false
        },
        from: {
            color: 'rgba(255,255,255,1)',
            width: 6
        },
        to: {
            color: 'rgba(255,255,255,1)',
            width: 6
        },
        // Set default step function for all animate calls
        step: function (state, circle) {
            circle.path.setAttribute('stroke', state.color);
            circle.path.setAttribute('stroke-width', state.width);

            var value = Math.round(circle.value() * 100);
            circle.setText(15);
            console.log(circle);
        }
        
    });
    
       var bar01 = new ProgressBar.Circle(container01, {
        color: 'white',
        // This has to be the same size as the maximum width to
        // prevent clipping
        strokeWidth: 6,
        trailWidth: 6,
        trailColor: 'rgba(255,255,255,0.2)',
        easing: 'easeInOut',
        duration: 1400,
        text: {
            autoStyleContainer: false
        },
        from: {
            color: 'rgba(255,255,255,1)',
            width: 6
        },
        to: {
            color: 'rgba(255,255,255,1)',
            width: 6
        },
        // Set default step function for all animate calls
        step: function (state, circle) {
            circle.path.setAttribute('stroke', state.color);
            circle.path.setAttribute('stroke-width', state.width);

            var value = Math.round(circle.value() * 100);
            circle.setText(40);
            console.log(circle);
        }
        
    });
    
       var bar02 = new ProgressBar.Circle(container02, {
        color: 'white',
        // This has to be the same size as the maximum width to
        // prevent clipping
        strokeWidth: 6,
        trailWidth: 6,
        trailColor: 'rgba(255,255,255,0.2)',
        easing: 'easeInOut',
        duration: 1400,
        text: {
            autoStyleContainer: false
        },
        from: {
            color: 'rgba(255,255,255,1)',
            width: 6
        },
        to: {
            color: 'rgba(255,255,255,1)',
            width: 6
        },
        // Set default step function for all animate calls
        step: function (state, circle) {
            circle.path.setAttribute('stroke', state.color);
            circle.path.setAttribute('stroke-width', state.width);

            var value = Math.round(circle.value() * 100);
            circle.setText(60);
            console.log(circle);
        }
        
    });
    
    
   
    
    bar00.animate(0.15);
    bar01.animate(0.40);
    bar02.animate(0.60);

});