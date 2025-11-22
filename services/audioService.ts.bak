
let audioContext: AudioContext | null = null;
let fartBuffer: AudioBuffer | null = null;
let isLoading = false;

export const playFartSound = async () => {
  try {
    if (!audioContext) {
      audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }

    // 브라우저 정책상 사용자 제스처 후 resume 필요
    if (audioContext.state === 'suspended') {
      await audioContext.resume();
    }

    // 버퍼가 없으면 로드 시도 (최초 1회)
    if (!fartBuffer) {
      if (isLoading) return; // 중복 로드 방지
      isLoading = true;
      
      try {
        const response = await fetch('./gas.mp3');
        if (!response.ok) {
             throw new Error(`gas.mp3 파일을 찾을 수 없습니다. (Status: ${response.status})`);
        }
        const arrayBuffer = await response.arrayBuffer();
        fartBuffer = await audioContext.decodeAudioData(arrayBuffer);
      } catch (e) {
        console.error("방구 소리 로드 실패:", e);
      } finally {
        isLoading = false;
      }
    }

    // 버퍼가 준비되었으면 재생
    if (fartBuffer) {
      const source = audioContext.createBufferSource();
      source.buffer = fartBuffer;
      
      // 재미를 위해 매번 피치(재생 속도)를 약간씩 다르게 설정 (0.85배 ~ 1.15배)
      source.playbackRate.value = 0.85 + Math.random() * 0.3;
      
      // 볼륨 조절을 위한 GainNode
      const gainNode = audioContext.createGain();
      gainNode.gain.value = 0.8; // 기본 볼륨 80%

      source.connect(gainNode);
      gainNode.connect(audioContext.destination);
      source.start(0);
    }
  } catch (error) {
    console.error("Audio playback error", error);
  }
};
