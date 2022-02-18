import React from 'react';

function Hero() {
  return (
    <div className="hero">
      <div className="hero-box">
        <h1>MERN Application</h1>
        <p>
          Praesent dapibus, neque id cursus ucibus, 
          tortor neque egestas augue, eu vulputate magna eros eu erat. 
          Aliquam erat volutpat. Nam dui mi, tincidunt quis, 
          accumsan porttitor, facilisis luctus, metus
        </p>
        <button className="button button-priamry">Shop Now</button>
      </div>
      <div className="hero-image">
        <img src="images/headphone-1.png" />
      </div>
    </div>
  );
}

export default Hero;
