import React, { useState, useEffect } from "react";
import { Button, Input, Empty } from "antd";
import { AddressInput } from "./";

export default function PrivateLibrary({ writeContracts, tx, privateLibrary, mainnetProvider }) {
  const [shareToAddresses, setShareToAddresses] = useState({});
  const [searchEvents, setSearchEvents] = useState(privateLibrary);
  const [val, setVal] = useState("");
  const onSearch = e => {
    setVal(e.target.value);
    console.log(val);
    setSearchEvents(privateLibrary.filter(item => item.name.includes(val)));
  };

  return (
    <div style={{ backgroundColor: "#636C78" }}>
      <section id="#Library" data-w-id="9a8c8c5e-18d4-aeb9-bc37-bac71fe0745b" className="section mod--hero ">
        <h1 className="heading--center" style={{ color: "#fff" }}>
          Private Library
        </h1>
        <Input placeholder="search by title" onChange={onSearch} value={val} style={{ width: "70%", margin: "20" }} />
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {searchEvents?.length ? (
            searchEvents.map((item, index) => (
              <div key={index + "_" + item.address} style={{ margin: 10 }}>
                <div data-w-id="23aa82da-d192-8dd9-fd6c-34b1289acbf1" className="content">
                  <div data-w-id="f29f62bd-d2b8-d92f-ba3b-fec3f8494fcb" className="swiper-slide mod--work">
                    <div className="work__card">
                      <div className="work__ico-wrap" style={{ width: "100%" }}>
                        <div className="work__ico-anim">
                          <img
                            src={
                              item.Link ??
                              "https://uploads-ssl.webflow.com/61c1b5d6cb8a0046c7fa6e82/61c1c00a889e5f20911275b4_work_ico-01.svg"
                            }
                            loading="lazy"
                            alt=""
                            className="work__ico"
                            sizes="(max-width: 479px) 100vw, (max-width: 767px) 100vw, (max-width: 991px) 100vw, 100vw"
                          />
                          <img
                            src={
                              item.Link ??
                              "https://uploads-ssl.webflow.com/61c1b5d6cb8a0046c7fa6e82/61c1c00a889e5f20911275b4_work_ico-01.svg"
                            }
                            loading="eager"
                            alt=""
                            className="work__ico mod--over"
                            sizes="(max-width: 479px) 100vw, (max-width: 767px) 100vw, (max-width: 991px) 100vw, 100vw"
                          />
                        </div>
                      </div>
                      <h3 className="work__title">{item.name}</h3>
                      <p className="work__p">{item.description}</p>
                      <a href={`${item.Link}`} download={item.name} target="_blank">
                        View
                      </a>

                      <div>
                        <AddressInput
                          ensProvider={mainnetProvider}
                          placeholder="share to address"
                          value={shareToAddresses[index]}
                          onChange={val => {
                            const update = {};
                            update[index] = val;
                            setShareToAddresses({ ...shareToAddresses, ...update });
                          }}
                        />
                        {/* <Input
                          placeholder="share to address"
                          value={shareToAddresses[index]}
                          onChange={e => {
                            const update = {};
                            update[index] = e.target.value;
                            setShareToAddresses({ ...shareToAddresses, ...update });
                          }}
                        /> */}
                        <Button
                          style={{ margin: 10 }}
                          onClick={() => {
                            console.log("writeContracts", writeContracts);
                            // let id = 1;
                            tx(writeContracts.Library.share([shareToAddresses[index]], index + 1));
                          }}
                        >
                          share
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <Empty />
          )}
        </div>
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
