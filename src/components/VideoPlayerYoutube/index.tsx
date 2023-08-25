import VideoDuration from '@/components/VideoDaration';
import VideoDescription from '@/components/VideoDescription';
import { Fragment, useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player/youtube';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardSubtitle,
  CardTitle,
  Input,
  Progress
} from "reactstrap";
//import screenfull from 'screenfull';


export default function VideoPlayerYoutube({ data }:any) {
  const [playing, setPlaying] = useState(false);
  const [videoDuration, setVideoDuration] = useState(0);
  const [played, setPlayed] = useState(0);
  const [volume, setVolume] = useState(0.2);

  const ref = useRef<any|null>(null);

  useEffect(() => {
    setPlayed(0);
    ref?.current?.seekTo(parseFloat(0));
  }, []);




  const changePlaying = () => {
    setPlaying(!playing);
  }

  const handlePlay = () => {
    if (playing === false) {
      setPlaying(true);
    }
  }

  const handlePause = () => {
    if (playing === true) {
      setPlaying(false);
    }
  }

  const handleVolumeChange = e => {
    setVolume(parseFloat(e.target.value));
  }

  const handleEnded = () => {
    console.log('onEnded');
    // open next video
  }

  const handleOnStart = () => {
    if (played > 0) { setPlayed(0); ref.current.seekTo(parseFloat(0)) }
  }

  const handleDuration = (duration:any) => {
    ref.current.seekTo(parseFloat(0))
    setVideoDuration(duration);
  }

  /*  const handleClickFullscreen = () => {
     screenfull.request(findDOMNode(ref));
   } */

  const handleProgress = state => {
    setPlayed(state.played);
  }


  /*  <b> <VideoDuration seconds={videoDuration * (1 - played)} /> </b> */


  const PlayerController = () => {
    return (
      <Fragment>
        <Card className="mt--3">
          <CardBody>
            <CardTitle tag="h4">
              Duração desta aula
            </CardTitle>
            <CardSubtitle
              className=" text-muted"
              tag="h4"
            >
              <VideoDuration seconds={videoDuration} />
            </CardSubtitle>
          </CardBody>
        </Card>
        <Card className="mt-2">
          <CardBody>
            <CardTitle tag="h4">
              Tempo assistido
            </CardTitle>
            <CardSubtitle
              className=" text-muted"
              tag="h4"
            >
              <VideoDuration seconds={videoDuration * played} />
              <Progress
                className="mt-3"
                max={1}
                animated
                color="primary"
                striped
                value={played}
              />
            </CardSubtitle>
          </CardBody>
        </Card>

        <Card className="mt-2">
          <CardBody>
            <CardTitle tag="h4">
              Volume: {`${volume * 100}% ${volume === 0.1 ? '( mínimo )' : ''}`}
              <Input
                type='range'
                min={0.1}
                max={1}
                step='0.1'
                value={volume}
                onChange={handleVolumeChange}
              />
            </CardTitle>

            <CardFooter>
              <Button
                color={!playing ? "primary" : "danger"}
                className="mt-2"
                onClick={changePlaying}
                block={true}
              >{playing ? 'Pausar' : 'Assistir'}</Button>
            </CardFooter>
          </CardBody>
        </Card>
      </Fragment>
    );
  }

  const youtubeConfigs = {
    youtube: {
      playerVars: {
        showinfo: 0,
        autoplay: 1,
        disablekb: 1,
        modestbranding: 1,
        rel: 0,
      }
    },
  }

  return (
    <Fragment>

      <div className='row'>
        <div className='col-xl-8'>
          <div className='card-body'>
            <ReactPlayer
              ref={ref}
              className="col-xl-12"
              key={data.videoIdentify}
              url={`https://www.youtube.com/watch?v=${data.videoIdentify}`}
              playing={playing}
              onStart={handleOnStart}
              onEnded={handleEnded}
              onError={e => console.log('onError', e)}
              onProgress={handleProgress}
              onDuration={handleDuration}
              onPlay={handlePlay}
              onPause={handlePause}
              volume={volume}

              width='100%'
              height='450px'
              //config={youtubeConfigs}

            />
            <div className='col-xl-12'>
              <div className='row'>
                <VideoDescription data={data} />
              </div>
            </div>
          </div>
        </div>
        <div className='col-xl-4'>
          <PlayerController />
        </div>

      </div>
    </Fragment >);
}