
export const playFartSound = () => {
  const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioContext) return;

  // 싱글톤 패턴처럼 사용하거나 매번 생성 (브라우저 정책에 따라 다름, 여기서는 가볍게 매번 생성하되 닫힘 처리하거나 전역 변수로 관리)
  // 간단한 구현을 위해 전역 변수로 관리
  if (!(window as any).fartAudioCtx) {
    (window as any).fartAudioCtx = new AudioContext();
  }
  const ctx = (window as any).fartAudioCtx as AudioContext;

  if (ctx.state === 'suspended') {
    ctx.resume();
  }

  const t = ctx.currentTime;
  
  // 1. 기본 톤 (Sawtooth 파형으로 "뿌" 소리 구현)
  const osc = ctx.createOscillator();
  const oscGain = ctx.createGain();
  
  osc.type = 'sawtooth';
  
  // 랜덤성 부여: 높낮이, 길이, 떨어지는 정도
  const duration = 0.1 + Math.random() * 0.4; 
  const startFreq = 120 + Math.random() * 150; // 시작 음 높이
  const endFreq = 40 + Math.random() * 40;    // 끝 음 높이
  
  osc.frequency.setValueAtTime(startFreq, t);
  osc.frequency.exponentialRampToValueAtTime(endFreq, t + duration);
  
  oscGain.gain.setValueAtTime(0.3, t);
  oscGain.gain.exponentialRampToValueAtTime(0.01, t + duration);
  
  osc.connect(oscGain);
  oscGain.connect(ctx.destination);
  osc.start(t);
  osc.stop(t + duration);

  // 2. 질감 (Noise 파형으로 "푸쉬쉬" 소리 구현)
  const bufferSize = ctx.sampleRate * duration;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  
  for (let i = 0; i < bufferSize; i++) {
    // White Noise
    data[i] = (Math.random() * 2 - 1);
  }
  
  const noise = ctx.createBufferSource();
  noise.buffer = buffer;
  
  const noiseFilter = ctx.createBiquadFilter();
  noiseFilter.type = 'lowpass';
  noiseFilter.frequency.value = 300 + Math.random() * 200; // 먹먹하게 만듦
  
  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(0.2, t);
  noiseGain.gain.exponentialRampToValueAtTime(0.01, t + duration);
  
  noise.connect(noiseFilter);
  noiseFilter.connect(noiseGain);
  noiseGain.connect(ctx.destination);
  
  noise.start(t);
};
