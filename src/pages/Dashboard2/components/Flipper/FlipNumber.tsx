import React, { useState, useEffect, useRef } from "react";
import Flipper from "./Flipper";
import './index.css';

const SUM_COUNT = 90;

type IFlipType = string;

const FlipNumber: React.FC<{
  initNum: number;
}> = ({ initNum }) => {
  const flipObjs = useRef<Map<number, Flipper | null>>(new Map()); ;
  const flipObjsLen = 9;
  const initNumStr = initNum.toString();
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const isFlipDown = (flipType: IFlipType) => flipType === "down";

  const setNextNum = (flipType: IFlipType, cur: number, step: number) => {
    return isFlipDown(flipType) ? cur + step : cur - step;
  };

  const getAnmiInfo = (initNum: number, nextNum: number) => {
    const diff = Math.abs(nextNum - initNum);
    const flipType = nextNum - initNum > 0 ? "down" : "up";
    let duration = 1000;
    let step = Math.floor(diff / SUM_COUNT);
    const left = diff % SUM_COUNT;
    if (diff < SUM_COUNT) {
      duration = (SUM_COUNT / diff) * 1000;
      step = 1;
    }
    return { step, duration, left, diff, flipType };
  };

  const setFlipper = (
    nextShowNum: number,
    nowStr: string,
    flipType: IFlipType
  ) => {
    const nextTimeStr = nextShowNum.toString();
    let index = flipObjsLen;

    for (let i = nextTimeStr.length - 1; i >= 0 && index >= 0; i--) {
      index--;

      if (nowStr[i] === nextTimeStr[i]) {
        continue;
      }

      if (flipType === "down") {
        flipObjs.current?.get(index).flipDown(nowStr[i], nextTimeStr[i]);
      } else {
        flipObjs.current?.get(index).flipUp(nowStr[i], nextTimeStr[i]);
      }
    }
  };

  const run = (initNum: number, nextNum: number) => {
    clearInterval(timer);

    const { step, duration, left, diff, flipType } = getAnmiInfo(
      initNum,
      nextNum
    );
    let nowStr = initNumStr;
    let nextShowNum = initNum;
    let counter = 0;

    const newTimer = setInterval(() => {
      if (diff > SUM_COUNT) {
        if (counter < SUM_COUNT - left) {
          nextShowNum = setNextNum(flipType, nextShowNum, step);
        } else {
          nextShowNum = setNextNum(flipType, nextShowNum, step + 1);
        }
      } else {
        nextShowNum = setNextNum(flipType, nextShowNum, step);
      }

      if (
        (isFlipDown(flipType) && nextShowNum >= nextNum) ||
        (!isFlipDown(flipType) && nextShowNum <= nextNum)
      ) {
        clearInterval(newTimer);
      }
      counter++;

      setFlipper(nextShowNum, nowStr, flipType);
      nowStr = nextShowNum.toString();
    }, duration);

    setTimer(newTimer);
  };

  useEffect(() => {
    run(0, initNum);
  }, []);

  function getMap() {
    if (!flipObjs.current) {
      // 首次运行时初始化 Map。
      flipObjs.current = new Map();
    }
    return flipObjs.current;
  }

  return (
    <div className="FlipNumber">
      {Array(flipObjsLen).fill(0).map((_, i) => (
        <Flipper key={i} ref={node => {
			const map = getMap();
			if (node) {
			  // 添加到 Map
			  map?.set(i, node);
			} else {
			  // 从 Map 删除
			  map?.delete(i);
			}
		  }} /> 
      ))}
      <em></em>
    </div>
  );
};

export default FlipNumber;
