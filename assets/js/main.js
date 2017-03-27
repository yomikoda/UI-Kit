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

                wavesurfer.playPause();
        wavesurfer.setMute(true); // MUTE THE AUDIO
       

        $('#timewave').click(function () {
            wavesurfer.playPause();
            
            
        });
    });


    /** GRAPH **/

    var chart = new CanvasJS.Chart("chartContainer", {
        backgroundColor: "transparent",


        axisY: {
            labelFontColor: "rgba(255,250,250,0)",
            interlacedColor: "rgba(255,250,250,0)",
            tickColor: "rgba(255,250,250,0)",
            lineColor: "rgba(255,250,250,0)",
            gridColor: "rgba(255,250,250,0)",

        },
        dataPointWidth: 10,
        axisX: {
            labelFontColor: "rgba(255,250,250,1)",
            tickColor: "rgba(255,250,250,0)",
            lineColor: "rgba(255,250,250,0)",
        },
        data: [{
                type: "stackedColumn100", //or stackedArea100
                color: "rgba(255,250,250,1)",
                dataPoints: [
                    {
                        x: 01,
                        y: 10
                    },
                    {
                        x: 02,
                        y: 30
                    },
                    {
                        x: 03,
                        y: 40
                    },
                    {
                        x: 04,
                        y: 80
                    },
                    {
                        x: 05,
                        y: 100
                    },
                    {
                        x: 06,
                        y: 90
                    },
                    {
                        x: 07,
                        y: 75
                    },
                    {
                        x: 08,
                        y: 85
                    },
                    {
                        x: 09,
                        y: 65
                    },
                    {
                        x: 10,
                        y: 70
                    },
                    {
                        x: 11,
                        y: 20
                    }
        ]
      }, {
                type: "stackedColumn100", //or stackedArea100
                color: "rgba(255,255,255,0.2)",
                dataPoints: [

                    {
                        x: 01,
                        y: 90
                    },
                    {
                        x: 02,
                        y: 70
                    },
                    {
                        x: 03,
                        y: 60
                    },
                    {
                        x: 04,
                        y: 20
                    },
                    {
                        x: 05,
                        y: 0
                    },
                    {
                        x: 06,
                        y: 10
                    },
                    {
                        x: 07,
                        y: 25
                    },
                    {
                        x: 08,
                        y: 15
                    },
                    {
                        x: 09,
                        y: 35
                    },
                    {
                        x: 10,
                        y: 30
                    },
                    {
                        x: 11,
                        y: 80
                    }
        ]
      }
      ]
    });

    chart.render();





    /** RANGE SLIDER **/
    $('input[type="range"]:last-child').on("change", function () {
        
        var selectedval = this.value,
            value01 = $(".rangevalues>li:first-child").attr('value'),
            value02 = $(".rangevalues>li:nth-child(2)").attr('value'),
            value03 = $(".rangevalues>li:nth-child(3)").attr('value'),
            value04 = $(".rangevalues>li:nth-child(4)").attr('value'),
            value05 = $(".rangevalues>li:last-child").attr('value');
        
        if (selectedval == value01) {
                $(".rangevalues>li").removeClass("rangevalue");
               $(".rangevalues>li:first-child").addClass('rangevalue');
        }
        if (selectedval == value02) {
                $(".rangevalues>li").removeClass("rangevalue");
               $(".rangevalues>li:nth-child(2)").addClass('rangevalue');
        }
        if (selectedval == value03) {
                $(".rangevalues>li").removeClass("rangevalue");
               $(".rangevalues>li:nth-child(3)").addClass('rangevalue');
        }
        if (selectedval == value04) {
                $(".rangevalues>li").removeClass("rangevalue");
               $(".rangevalues>li:nth-child(4)").addClass('rangevalue');
        }
        if (selectedval == value05) {
                $(".rangevalues>li").removeClass("rangevalue");
               $(".rangevalues>li:last-child").addClass('rangevalue');
        }
        
        // There's probably a better way to do this, but, if it looks stupid and it works, it's not stupid ¯\_(ツ)_/¯ 
    });

 

    /** TABS **/

    $('.tab').click(function () {
        $('.tab').removeClass('clicked-tab');
        $(this).toggleClass('clicked-tab');

    });

    $('.simpletab').click(function () {
        $('.simpletab').removeClass('selectedsimpletab');
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

    
    console.log(duration);
    $('#trackduration').text(readableDuration(duration)); 
    
    //WORKED BEFORE, BUT NOW IT WON'T -_-
    
    $('#trackduration').text("01:45");







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
        }

    });




    bar00.animate(0.15);
    bar01.animate(0.40);
    bar02.animate(0.60);

    /** DIAGRAM **/


    var chart = new CanvasJS.Chart("chartContainer02", {
        backgroundColor: "transparent",


        axisY: {
            labelFontColor: "rgba(255,250,250,0)",
            interlacedColor: "rgba(255,250,250,0)",
            tickColor: "rgba(255,250,250,0)",
            lineColor: "rgba(255,250,250,0)",
            gridColor: "rgba(255,250,250,0)",

        },

        axisX: {
            valueFormatString: "DDD",
            interval: 1,
            intervalType: "day",
            labelFontColor: "rgba(255,250,250,1)",
            tickColor: "rgba(255,250,250,0)",
            lineColor: "rgba(255,250,250,0)",
        },
        data: [
            {
                color: "rgba(255,250,250,0.2)",
                markerType: "circle",
                markerColor: "#00aced",
                markerBorderColor: "white",
                markerBorderThickness: 2,
                indexLabelFontColor: "white",
                markerSize: 10,
                lineThickness: 1,
                fillOpacity: 1,
                lineColor: "white",
                type: "area",
                dataPoints: [ //array
                    {
                        x: new Date(2013, 00, -1),
                        y: 50
                    },
                    {
                        x: new Date(2013, 00, 0),
                        y: 120
                    },
                    {
                        x: new Date(2013, 00, 1),
                        y: 80
                    },
                    {
                        x: new Date(2013, 00, 2),
                        y: 150
                    },
                    {
                        x: new Date(2013, 00, 3),
                        y: 100
                    },
                    {
                        x: new Date(2013, 00, 4),
                        y: 200
                    },
                    {
                        x: new Date(2013, 00, 5),
                        y: 120
                    }
        ]
      }
      ]
    });
    chart.render();

    
    
    /** ANIMATIONS ? **/
    

    
 $('#bubbles p:first-child').animate({height:"30px",width:"45px",opacity: 1}, 500, function() {
  $('#bubbles p:nth-child(2)').animate({ height:"45px",width:"135px",opacity: 1}, 1000, function() {
      $('#bubbles p:nth-child(3)').animate({ height:"30px",width:"150px",opacity: 1}, 1500,function(){
          $('#bubbles p:last-child').animate({height:"45",width:"135px",opacity: 1}, 2000);
      });
   });
});   
    
    
    
});