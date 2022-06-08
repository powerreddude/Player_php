let playingHowl;
let next;
let queue = [];
let volume;

$(function()
{
    bind_events();

    $("#previous").click(playPrevious);
    $("#next").click(playNext);
    $("#toggle-play").click(togglePlay);
    $("#volume").click(
        function() {
            $("#volume-input-box").animate({width:'toggle'},350);
        }
    ).children().click(function(e) {return false;});


    var clicky;

    $(document).mousedown(function(e) {
        // The latest element clicked
        clicky = $(e.target);
    });

    // when 'clicky == null' on blur, we know it was not caused by a click
    // but maybe by pressing the tab key
    $(document).mouseup(function(e) {
        clicky = null;
    });
    
    $("#volume-input").on("input", changeVolume).blur(
        function(e) {
            // this needs to check if the clicked object is truely outside of the volume 
            if(!e.currentTarget.contains(e.relatedTarget) && !clicky.is("#volume")) {
                $("#volume-input-box").animate({width:'hide'},350);
            }
        }
    );

    $("#volume").blur(
        function(e) {
            if(!e.currentTarget.contains(e.relatedTarget)) {
                $("#volume-input-box").animate({width:'hide'},350);
            }
        }
    );

    setInterval(() => {
        updateProgress(); 
    },300);

    loadpage("/collection.php")
})

function bind_events() 
{
    $(".nav").click(function(e) {
        e.preventDefault();
        href = $(this).attr('href');

        console.log("traveling to", href);

        loadpage(href);
    });

    $(".song").click(function(e) {
        next = $(this).index();

        let children = $(this).parent().children();

        // want a list of songs [('title': "", 'path': ""), ...]

        queue = children.map(function(e) {
            return {'title': $(this).html(), 'path': $(this).attr('href'), 'artist': $(this).attr('artist')};
        });

        playNext();
    });

    $(".collection-toggle").click(function(e) {
        let target = $(this).attr('target');

        $('.collection-target').hide()

        $(`.${target}`).show()
    })
}

function updateProgress() {
    if (playingHowl && playingHowl.playing()) {
        let width = (playingHowl.seek()/playingHowl.duration())*100;
        $("#progress").width(`${width}vw`);
    }
}

function playPrevious() 
{
    if(playingHowl) {
        playingHowl.stop();
    }


    if(next - 2 >= 0) {
        playingHowl = new Howl({
            src: queue[next - 2].path,
            volume: volume,
            html5: true,
            autoplay: true,
            onend: playNext
        });
        $("#toggle-play").html("pause");
        next--;
    } else {
        playingHowl = null;
        $("#toggle-play").html("play_arrow");
    }
    updateSongInfo();
}

//dont think this needs to make new howls
function playNext() 
{
    if(playingHowl) {
        playingHowl.stop();
    }


    if(next < queue.length) {
        playingHowl = new Howl({
            src: queue[next].path,
            volume: volume,
            html5: true,
            autoplay: true,
            onend: playNext
        });
        $("#toggle-play").html("pause");
        next++;
    } else {
        playingHowl = null;
        $("#toggle-play").html("play_arrow");
    }
    updateSongInfo();
}

function togglePlay() 
{
    if(!playingHowl) {
        return;
    }

    if(playingHowl.playing()) {
        playingHowl.pause();
        $("#toggle-play").html("play_arrow")
    } else {
        playingHowl.play();
        $("#toggle-play").html("pause")
    }
}

function changeVolume(e) 
{
    volume = $(this).val();
    if(playingHowl) {
        playingHowl.volume(volume);
    }
    console.log(volume);
}

function updateSongInfo() 
{
    let song = queue[next - 1];
    $("#title").html(song.title);
    $("#artist").html(song.artist);
    $("#thumb-nail").attr('src', `${song.path.substring(0, song.path.lastIndexOf('/'))}/cover.jpg`);
}

function loadpage(url) 
{
    $.ajax({
        url: url,
        success: function(res) {
            $("#content").html(res);
            bind_events();
        }
    })
}