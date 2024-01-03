import { _decorator, assetManager, AudioClip, AudioSource, Component, error, isValid, Node, resources, tween } from "cc";
const { ccclass, property } = _decorator;

@ccclass('AudioManager')
export class AudioManager extends Component {
    private _musicAudio: AudioSource;
    private _effectAudio: AudioSource;
    private static instance: AudioManager;
    // private constructor() { } 
    private isInit: Boolean = false;
    private _audioSources: Array<AudioSource> = [];
  
    public static get Instance(): AudioManager {
      if (!this.instance) {
        this.instance = new AudioManager();
      }
      return this.instance;
    }
  
    init(musicAudio: AudioSource, effectAudio: AudioSource) {
      if (this.isInit) {
        return;
      }
      this._musicAudio = musicAudio;
      this._effectAudio = effectAudio; this._audioSources
      this.isInit = true;
      this._musicAudio.node.on(AudioSource.EventType.ENDED, this.playNextMusic, this);
    }
    /**自动播放下一首音乐 */
    playNextMusic(audioSources: AudioSource, _) {
      //console.log(audioSources, "audioOver", audioSources.name)
  
      //播放时长小于3s是音效
      if (audioSources.duration < 5) {
        //console.log("是音效")
        return
      }
    //   let curMusicData = LevelManager.instance.curGameData.musicData
    //   let len = curMusicData.curMusicList.length
    //   curMusicData.curIndex++;
    //   curMusicData.curIndex = curMusicData.curIndex % len
    //   let nextMusicName = curMusicData.curMusicList[curMusicData.curIndex]
    //   this.playMusicAudio(nextMusicName);
    }
    //播放音乐，传参音乐名称  
    playMusicAudio(name: string) {
      if (!this.isInit) {
        error("无播放器");
        return;
      }
      let self = this;
      assetManager.getBundle("Bundlegame").load("audio/" + name, AudioClip, function (err, data) {
        if (err) {
          error(name)
        }
        console.log("Bundlegame" + "dataaudio")
        let audioClip: AudioClip = data
        if (!audioClip) error("音乐不存在", "audio/" + name);
        if (self._musicAudio.playing) {
          self._musicAudio.stop();
        }
        self.resumeMusicVolume();
        self._musicAudio.clip = audioClip;
        self._musicAudio.play();
      })
    }
    /**Home View的设置界面调节音乐音量时候需要播放一个以音乐音频的音效来查看是否调节的实际音量大小 */
    playMusicAudioInSetView(name: string) {
      let audioClip: AudioClip = resources.get("audio/" + name, AudioClip);
      this._musicAudio.clip = audioClip;
      this._musicAudio.play();
    }
    /**暂存FadeIn_Out时候的真实音量 */
    useToFadeIn_Out = -1; // 为-1表示没有进行调用fadeIn_out
    /**恢复Music的音量 */
    resumeMusicVolume() {
      if (this.useToFadeIn_Out >= 0) {
        this._musicAudio.volume = this.useToFadeIn_Out;
      }
    }
    async pauseMusic() {
      this.useToFadeIn_Out = this._musicAudio.volume
  
      //await this.fadeVolume(0, 500);
      this._musicAudio.pause();
    }
    async resumeMusic() {
      this._musicAudio.play();
      //console.log(this._musicAudio.volume, "resumeMusic")
      // await this.fadeVolume(this.useToFadeIn_Out, 500);
    }
    // private async fadeVolume(targetVolume: number, duration: number): Promise<void> {
    //   const startVolume = this._musicAudio.volume;
    //   const startTime = Date.now();
    //   while (Date.now() - startTime < duration) {
    //     const elapsed = Date.now() - startTime;
    //     const progress = Math.min(1, elapsed / duration);
  
    //     this._musicAudio.volume =startVolume + (targetVolume - startVolume) * progress;
  
    //     await new Promise((resolve) => setTimeout(resolve, 16)); // Delay for about 1 frame
    //   }
  
    //   this._musicAudio.volume = targetVolume;
    // }
  
    //播放音效，传参音效名称
    playEffectAudio(name: string) {
      if (!this.isInit) {
        error("无播放器");
        return;
      }
      let audioClip: AudioClip = resources.get("audio/" + name, AudioClip);
      if (!audioClip) error("音效不存在");
      if (this._effectAudio.playing) {
        this._effectAudio.stop();
      }
      this._effectAudio.clip = audioClip;
      this._effectAudio.play();
    }
    //关闭音乐
    stopMusicAudio() {
      if (this._musicAudio.playing) {
        this._musicAudio.stop();
      }
    }
    //关闭音效
    stopEffectAudio() {
      if (this._effectAudio.playing) {
        this._effectAudio.stop();
      }
    }
    //设置音乐音量
    setMusicVolume(volume: number) {
      console.log(this._musicAudio.volume, volume)
  
      this._musicAudio.volume = volume;
      this.useToFadeIn_Out = this._musicAudio.volume;
      console.log(this._musicAudio.volume)
    }
    //得到音乐音量
    getMusicVolume() {
      return this._musicAudio.volume;
    }
    //设置音效音量
    setEffectVolume(volume: number) {
      this._effectAudio.volume = volume;
    }
    //得到音效音量
    getEffectVolume() {
      return this._effectAudio.volume;
    }
  
    //得到音乐音量
    getMusicVolumeByIndex(index: number) {
      if (index > this._audioSources.length - 1) {
        //console.log("索引超出范围");
        return;
      }
      return this._audioSources[index].volume;
    }
  
    /**
     * 回退音乐播放至backTime 秒前,如果回退到小于0s前取消播放音乐
     * @param backTime 
     * @returns 
     */
    backMusicByTime(backTime: number) {
      if (!this._musicAudio.playing) {
        //console.log("没有可以播放的音乐")
        return;
      }
      let currentTime = this.getMusicCurTime();
      if (currentTime - backTime >= 0) {
        this._musicAudio.currentTime = currentTime - backTime;
      }
      else {
        return;
      }
    }
    getMusicCurTime(): number | undefined {
      if (!this._musicAudio) {
        return
      }
      return this._musicAudio.currentTime;
    }
  
}


