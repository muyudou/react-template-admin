import React, { useState, useImperativeHandle, forwardRef } from 'react';
import './index.css';

interface FlipperProps {
  frontText?: string,
  backText?: string,
  duration?: number
}

interface FlipperRef {
  flipDown: (front: string, back: string) => void;
  flipUp: (front: string, back: string) => void;
  setFront: (text: string) => void;
  setBack: (text: string) => void;
}

const Flipper: React.ForwardRefRenderFunction<FlipperRef, FlipperProps> = ({
  frontText = '0',
  backText = '0',
  duration = 600
}: FlipperProps, ref) => {
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipType, setFlipType] = useState('down');
  const [frontTextFromData, setFrontTextFromData] = useState(frontText);
  const [backTextFromData, setBackTextFromData] = useState(backText);

  function _flip(type: string, front: string, back: string): void {
    // 如果处于翻转中，则不执行
    if (isFlipping) {
      return;
    }
    setFrontTextFromData(front);
    setBackTextFromData(back);
    // 根据传递过来的type设置翻转方向
    setFlipType(type);
    // 设置翻转状态为true
    setIsFlipping(true);
    setTimeout(() => {
      // 设置翻转状态为false
      setIsFlipping(false);
      setFrontTextFromData(back);
    }, duration);
  }

  function flipDown(front: string, back: string): void {
    _flip('down', front, back);
  }
  
  function flipUp(front: string, back: string): void {
    _flip('up', front, back);
  }

  function setFront(text: string): void {
    setFrontTextFromData(text);
  }
  
  function setBack(text: string): void {
    setBackTextFromData(text);
  }

  useImperativeHandle(ref, () => ({
    flipDown,
    flipUp,
    setFront,
    setBack
  }));

  return (
    <div className={`M-Flipper ${flipType} ${isFlipping ? 'go' : ''}`} >
      <div className={`digital front number${frontTextFromData}`}></div>
      <div className={`digital back number${backTextFromData}`}></div>
    </div>
  )
};

export default forwardRef(Flipper);