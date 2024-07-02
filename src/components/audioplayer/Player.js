import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
// import 'react-h5-audio-player/lib/styles.less' Use LESS
// import 'react-h5-audio-player/src/styles.scss' Use SASS

const Player = () => (
    <AudioPlayer
        //Set the source of the audio file you want to play
        src="https://live.hunter.fm/lofi_high"
        autoPlayAfterSrcChange={true}
        showFilledVolume={true}
        showJumpControls={false}
        showDownloadProgress={false}
        showSkipControls={false}
        style={
            {
                backgroundColor: 'transparent',
                color: 'white'
            }
        }
        loop={true}
        volume={0.2}
        // other props here
    />
);

export default Player;