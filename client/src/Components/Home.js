import React, { useState, useEffect } from "react";
import "./Home.css";
import axios from "axios";

function Home() {
  const [pizza, setPizza] = useState({ pizza: [] });
  const [sauce, setSauce] = useState({ sauce: [] });
  const [breadStick, setBreadStick] = useState({ breadStick: [] });

  useEffect(() => {
    axios.get("/api/allProducts/pizza").then((res) => {
      setPizza({ pizza: res.data });
      console.log("res.data: " + res.data);
    });
    axios.get("/api/allProducts/sauce").then((res) => {
      setSauce({ sauce: res.data });
      console.log(res.data);
    });
    axios.get("/api/allProducts/breadStick").then((res) => {
      setBreadStick({ breadStick: res.data });
    });
  }, []);

  return (
    <div>
      <div className="homeFirstDiv">
        <div className="homeTitleDiv">
          <h1 className="homeTitleText">Pizza Section</h1>
        </div>
        <div className="homeSecondDiv">
          <div className="homeThirdDiv">
            {pizza.pizza.map((pizza, i) => {
              return (
                <div className="productFirstDiv">
                  <div className="productImageDiv">
                    <img className="productImage" src={pizza.image}></img>
                  </div>
                  <div className="productDiscreptioinDiv">
                    <h2>{pizza.productTitle}</h2>
                    <p>{pizza.description}</p>
                  </div>
                  <div className="productRatingDiv">Rating: 5/5</div>
                  <div className="productFooterDiv">
                    <button>Add to cart</button>
                    <button>More Info</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="homeSecondDiv">
          <div className="homeTitleDiv">
            <h1 className="homeTitleText">Sauce Section</h1>
          </div>
          <div className="homeThirdDiv">
            {sauce.sauce.map((sauce, i) => {
              return (
                <div className="productFirstDiv">
                  <div className="productImageDiv">
                    <img className="productImage" src={sauce.image}></img>
                  </div>
                  <div className="productDiscreptioinDiv">
                    <h2>{sauce.productTitle}</h2>
                    <p>{sauce.description}</p>
                  </div>
                  <div className="productRatingDiv">Rating: 5/5</div>
                  <div className="productFooterDiv">
                    <button>Add to cart</button>
                    <button>More Info</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="homeSecondDiv">
          <div className="homeTitleDiv">
            <h1 className="homeTitleText">Bread Sticks Section</h1>
          </div>
          <div className="homeThirdDiv">
            {breadStick.breadStick.map((breadStick, i) => {
              return (
                <div className="productFirstDiv">
                  <div className="productImageDiv">
                    <img className="productImage" src={breadStick.image}></img>
                  </div>
                  <div className="productDiscreptioinDiv">
                    <h2>{breadStick.productTitle}</h2>
                    <p>{breadStick.description}</p>
                  </div>
                  <div className="productRatingDiv">Rating: 5/5</div>
                  <div className="productFooterDiv">
                    <button>Add to cart</button>
                    <button>More Info</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
