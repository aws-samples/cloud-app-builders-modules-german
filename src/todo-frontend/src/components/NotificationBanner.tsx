import { Flashbar } from "@cloudscape-design/components";
import React, { useContext } from "react";
import { NotificationContext } from "../App";
import * as designTokens from '@cloudscape-design/design-tokens';


const NotificationBanner: React.FunctionComponent = () => {

    const notificationContext = useContext(NotificationContext);
    
    if (notificationContext.notifications.length > 0) {
        return (
            <div style={{ padding: designTokens.spaceScaledXl, position: 'fixed', width: '100%', zIndex: 100, boxSizing: 'border-box' }}>
                <Flashbar items={notificationContext.notifications} />
            </div>
        );
    }
    return null;
}

export default NotificationBanner;