
let audioContext: AudioContext | null = null;
let fartBuffer: AudioBuffer | null = null;
let loadAttempted = false;

// Fallback: 파일 로드 실패 시 브라우저 자체 기능으로 방구 소리 합성 (신디사이저)
const playSyntheticFart = (ctx: AudioContext) => {
  const osc = ctx.createOscillator();
  const gainNode = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  // 랜덤성 부여 (길이, 높낮이)
  const duration = 0.1 + Math.random() * 0.4;
  const startFreq = 150 + Math.random() * 100; // 시작 음높이
  const endFreq = 50 + Math.random() * 50;   // 끝 음높이

  osc.type = 'sawtooth'; // 톱니파가 방구 소리와 가장 비슷함
  osc.frequency.setValueAtTime(startFreq, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(endFreq, ctx.currentTime + duration);

  // 필터로 소리를 약간 먹먹하게 만듦 (리얼함 증가)
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(800, ctx.currentTime);
  filter.frequency.linearRampToValueAtTime(300, ctx.currentTime + duration);

  // 볼륨 엔벨로프 (점점 작아지게)
  gainNode.gain.setValueAtTime(0.5, ctx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

  // 연결: 오실레이터 -> 필터 -> 게인 -> 스피커
  osc.connect(filter);
  filter.connect(gainNode);
  gainNode.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + duration);
};

export const playFartSound = async () => {
  try {
    // AudioContext 초기화 (싱글톤)
    if (!audioContext) {
      audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }

    // 브라우저 정책상 사용자 제스처 후 resume 필요
    if (audioContext.state === 'suspended') {
      await audioContext.resume();
    }

    // 파일 로드를 시도하지 않았다면 시도
    if (!fartBuffer && !loadAttempted) {
      loadAttempted = true;
      try {
        // 루트 경로와 상대 경로 모두 시도
        const possiblePaths = ['./gas.mp3', '/gas.mp3'];
        let response = null;

        for (const path of possiblePaths) {
            try {
                const res = await fetch(path);
                if (res.ok) {
                    response = res;
                    break;
                }
            } catch (e) { continue; }
        }

        if (response) {
          const arrayBuffer = await response.arrayBuffer();
          fartBuffer = await audioContext.decodeAudioData(arrayBuffer);
        } else {
          console.warn("gas.mp3 파일을 찾을 수 없어 합성음을 사용합니다.");
        }
      } catch (e) {
        console.error("방구 소리 로드 중 오류:", e);
      }
    }

    // 버퍼가 있으면 파일 재생, 없으면 합성음 재생
    if (fartBuffer) {
      const source = audioContext.createBufferSource();
      source.buffer = fartBuffer;
      
      // 매번 피치(재생 속도)를 약간씩 다르게 설정 (0.8배 ~ 1.2배)
      source.playbackRate.value = 0.8 + Math.random() * 0.4;
      
      const gainNode = audioContext.createGain();
      gainNode.gain.value = 0.9; 

      source.connect(gainNode);
      gainNode.connect(audioContext.destination);
      source.start(0);
    } else {
      // 파일이 없거나 로드 실패 시 합성음 재생
      playSyntheticFart(audioContext);
    }
  } catch (error) {
    console.error("Audio playback error", error);
  }
};
