import React from 'react';
import AWSIcon from './AWSIcon';
import * as designTokens from '@cloudscape-design/design-tokens';


const Footer: React.FunctionComponent = () => {
    const today = new Date();


    return (
        <div style={{ paddingTop: designTokens.spaceScaledXl, paddingBottom: designTokens.spaceScaledXl }} >
            <div style={{ paddingLeft: designTokens.spaceScaledXxl, paddingRight: designTokens.spaceScaledXxl, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p>© {today.getFullYear()}, Amazon Web Services, Inc. or its affiliates. All rights reserved.</p>
            </div>
        </div>
    );
}

export default Footer;