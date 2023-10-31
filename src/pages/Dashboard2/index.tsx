import React from "react";
import Marquee from "./components/Marquee";
import FlipNumber from "./components/Flipper/FlipNumber";
import DataBar from './components/DataBar';
import { Row, Col } from "antd";

const Dashboard2: React.FC = () => {
  return (
    <React.Fragment>
      <Row wrap style={{ marginTop: 20 }}>
        <Col span={24} style={{ background: "white", padding: 10 }}>
          <Marquee />
        </Col>
      </Row>
      <FlipNumber initNum={999} />
      <DataBar />
    </React.Fragment>
  );
};

export default Dashboard2;
