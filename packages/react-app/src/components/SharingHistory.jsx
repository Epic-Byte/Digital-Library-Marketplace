import React, { useState, useEffect } from "react";
import { Empty, Collapse, Card } from "antd";
import { Address } from "./";

export default function PrivateLibrary({ shareEvents, mainnetProvider, address }) {
  const { Panel } = Collapse;

  const filteredShareEvents = shareEvents.filter(it => address == it.args[0]);

  // console.log(filteredShareEvents);
  const shareEventsReverse = filteredShareEvents.reverse();
  // console.log(shareEventsReverse);
  return (
    <div style={{ backgroundColor: "#636C78" }}>
      <section id="#Library" data-w-id="9a8c8c5e-18d4-aeb9-bc37-bac71fe0745b" className="section mod--hero ">
        <h1 className="heading--center" style={{ color: "#fff" }}>
          Your Sharing History
        </h1>
        {shareEventsReverse?.length ? (
          <Collapse defaultActiveKey={["2"]} onChange={() => console.log("k")}>
            <Panel header="Private Files Transfered" key="2">
              <Card
                headStyle={{
                  borderRadius: 5,
                  background:
                    "linear-gradient(-90deg, rgba(162,34,195,0.5760898109243697) 7%, rgba(45,205,253,0.5312718837535014) 88%)",
                }}
                bodyStyle={{
                  borderRadius: 10,
                  background:
                    "linear-gradient(90deg, rgba(140,34,195,0.5760898109243697) 7%, rgba(45,159,253,0.5312718837535014) 88%)",
                }}
              >
                {shareEventsReverse?.map(item => (
                  <div
                    key={item.blockNumber + item.blockHash}
                    style={{
                      minWidth: "85%",
                      display: "flex",
                      alignContent: "space-between",
                      justifyContent: "space-between",
                      alignItems: "start",
                    }}
                  >
                    <p style={{ marginRight: 6 }}>Shared: {"  "}</p>
                    <span style={{ marginRight: 6, fontWeight: 826 }}>#{item.args[1]} </span>
                    <p style={{ marginLRight: 16 }}>to &nbsp; &nbsp; {"    "}</p>
                    <Address address={item.args[2]} ensProvider={mainnetProvider} fontSize={16} />
                  </div>
                ))}
              </Card>
            </Panel>
          </Collapse>
        ) : (
          <Empty />
        )}

        <div className="bg__grey u-big-grey"></div>
        <div className="bg__img-wrap mod--1">
          <img
            src="https://uploads-ssl.webflow.com/61c1b5d6cb8a0046c7fa6e82/61c1c00ac6231e8007e01811_hero_illustr-01.svg"
            loading="eager"
            style={{
              WebkitTransform:
                "translate3d(-100%, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);-moz-transform:translate3d(-100%, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);-ms-transform:translate3d(-100%, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);transform:translate3d(-100%, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
            }}
            alt=""
            className="bg__img mod--1"
          />
        </div>
        <div className="bg__img-wrap mod--4">
          <img
            src="https://uploads-ssl.webflow.com/61c1b5d6cb8a0046c7fa6e82/61c1c00afa26111b563f2134_hero_illustr-03.svg"
            loading="eager"
            style={{
              WebkitTransform:
                "translate3d(100%, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);-moz-transform:translate3d(100%, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);-ms-transform:translate3d(100%, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);transform:translate3d(100%, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
            }}
            alt=""
            className="bg__img mod--4"
          />
        </div>
      </section>
    </div>
  );
}
