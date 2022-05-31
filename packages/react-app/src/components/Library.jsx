import React, { useEffect, useState } from "react";

import { Empty, Input, Checkbox, Button, Switch } from "antd";

export default function Library({ publicLibrary, writeContracts, tx }) {
  const [searchEvents, setSearchEvents] = useState(publicLibrary);
  const [val, setVal] = useState("");
  const [data, setData] = useState(0);
  const onSearch = e => {
    setVal(e.target.value);
    console.log(val);
    setSearchEvents(publicLibrary.filter(item => item.name.includes(val)));
  };

  const getFilePrice = async(x) => {
    let waveTnx;
      // eslint-disable-next-line prettier/prettier
      waveTnx = await tx(writeContracts.Library.assetPrice(x));
      console.log(waveTnx)
      return waveTnx;
  }

  // eslint-disable-next-line prettier/prettier
  const buyFile = async (id) => {
    try {
      getFilePrice(id)
      .then(r => {
        let trx;
        trx = tx(writeContracts.Library.buyItem(id,{value: r }));
      })
      // console.log("writeContracts", writeContracts);
      // let waveTnx;
      // // eslint-disable-next-line prettier/prettier
      // waveTnx = await tx(writeContracts.Library.buyItem(id, { value: (price * 1e18).toString() }));

      // console.log("Minig..", waveTnx.hash);

      // await waveTnx.wait();
      // console.log("Minig---", waveTnx.hash);
    } catch (e) {
      console.log(e);
    }
  };

  const getData = () => {
    fetch("https://api.coinbase.com/v2/exchange-rates?currency=ETH", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        console.log(response);
        return response.json();
      })
      .then(function (myJson) {
        setData(myJson.data.rates.USD);
      });
  };


  useEffect(() => {
    getData();
  }, []);

  return (
    <div style={{ backgroundColor: "#636C78" }}>
      <section id="#Library" data-w-id="9a8c8c5e-18d4-aeb9-bc37-bac71fe0745b" className="section mod--hero ">
        <h1 className="heading--center" style={{ color: "#fff" }}>
          Library
        </h1>
        <Input placeholder="search by title" onChange={onSearch} value={val} style={{ width: "70%", margin: "20" }} />
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {searchEvents?.length ? (
            searchEvents?.map((item, index) => (
              <div key={item.transactionHash + item.blockNumber + "_"}>
                <div className="flex-personal">
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
                        <br />
                        {/* eslint-disable-next-line prettier/prettier */}
                        <p className="work__p">Price: $ {(item.price).toString()}</p>
                        <Button
                          type="button"
                          className="waveButton"
                          style={{ margin: "10px", color: "green" }}
                          // eslint-disable-next-line prettier/prettier
                          onClick={() => buyFile(index)}
                        >
                          Buy File
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
