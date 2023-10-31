import React, { useState, useEffect, useRef } from 'react';
import './Marquee.css';

const headerList = ["名称", "金额(万元)"];

const data = [
    {
      title: 'Ant Design Title 1',
      amount: 1,
      index: 1
    },
    {
      title: 'Ant Design Title 2',
      amount: 2,
      index: 2
    },
    {
      title: 'Ant Design Title 3',
      amount: 3,
      index: 3
    },
    {
      title: 'Ant Design Title 4',
      amount: 4,
      index: 4
    },
    {
        title: 'Ant Design Title 5',
        amount: 5,
        index: 5
    },
    {
        title: 'Ant Design Title 6',
        amount: 6,
        index: 6
    }
  ];
interface IListItem {
    title: string;
    amount: number;
    index: number;
}

interface MarqueeProps {
    hasAnim?: boolean;
    marqueeList?: IListItem[];
    headerList?: string[];
    itemHeight?: number,
    headerHeight?: number,
    showNumber?: number
}

const Marquee: React.FC<MarqueeProps> = ({
    hasAnim = true,
    itemHeight = 50,
    headerHeight = 50,
    showNumber = 4
}: MarqueeProps) => {
    const [animate, setAnimate] = useState<boolean>(false);
    const [list, setList] = useState<IListItem[]>(data);
    const [marginTop, setMarginTop] = useState<number>(0);
    const [timer, setTimer] = useState<NodeJS.Timeout>();
    const height: number = itemHeight * showNumber + (headerList.length ? headerHeight : 0);
    const listRef = useRef<HTMLUListElement>(null);


    const showMarquee = () => {
        setAnimate(true);
        setMarginTop(-itemHeight);
        setTimeout(() => {
            setList((prevList) => {
                const newList = [...prevList];
                const firstItem = newList.shift();
                newList.push(firstItem as IListItem);
                return newList;
            });
            setMarginTop(0);
            setAnimate(false)
        }, 1600);
    };

    const startAnim = () => {
        if (hasAnim) {
            const nowtimer = setInterval(showMarquee, 2000);
            console.log('timer', nowtimer);
            setTimer(nowtimer);
        }
    };

    const stopAnim = () => {
        console.log('stopdasd', timer)
        clearInterval(timer);
    };

    const handleStop = () => {
        stopAnim();
    }

    const handleUp = () => startAnim();

    useEffect(() => {
        startAnim();
    }, [hasAnim]);
   
    const headerListItems = headerList.map((item, index) => <div key={index}>{item}</div>);
    const listItems = list.map((item, index) =>
        <li
            className={'item' + item.index}
            key={index}
            
          >
            <div className="name">
              <span>{ item.title }</span>
            </div>
            <div> { item.amount } </div>
          </li>
        );

  return (
    <div className="vueBox">
    <div className="marquee" style={{ height: height + 'px' }} >
      <div className="marquee_box" onMouseEnter={handleStop}
            onMouseLeave={handleUp}>
        <div className="title" style={{ height: headerHeight + 'px', lineHeight: headerHeight + 'px' }}>
            {headerListItems}
        </div>
        <ul ref={listRef} style={{marginTop: marginTop + 'px'}} className={['marquee_list', animate ? 'marquee_top' : ''].join(' ')}>
          {listItems}
        </ul>
      </div>
    </div>
  </div>
  );
};

export default Marquee;
