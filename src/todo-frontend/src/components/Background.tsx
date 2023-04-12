import React from 'react';
import "@cloudscape-design/global-styles/dark-mode-utils.css";

const Background: React.FunctionComponent = () => {

    return (
        <>
            <div className="awsui-util-show-in-dark-mode" style={{ backgroundImage: 'url("./dark.png")', width: '100vw', height: '100vh', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', position: 'fixed', zIndex: -5 }} />
            <div className="awsui-util-hide-in-dark-mode" style={{ backgroundImage: 'url("./bright.png")', width: '100vw', height: '100vh', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', position: 'fixed', zIndex: -5 }} />
        </>
    )
}

export default Background