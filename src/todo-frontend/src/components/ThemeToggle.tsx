import { Icon, NonCancelableCustomEvent, Toggle, ToggleProps } from '@cloudscape-design/components';
import { applyMode, Mode } from '@cloudscape-design/global-styles';
import React, { useEffect, useState } from 'react';
import * as designTokens from '@cloudscape-design/design-tokens';
import useAsync from '../services/useAsync';
import * as localStorage from '../services/localStorage';

const ThemeToggle: React.FunctionComponent = () => {

    const [darkMode, setDarkMode] = useState<boolean>(false);

    const themeLocalStorageKey = "theme";

    const safeAsync = useAsync<string>();



    useEffect(() => {
        safeAsync(localStorage.load(themeLocalStorageKey))
            .then(value => {
                if (value === Mode.Dark) {
                    setDarkMode(true);
                    applyMode(Mode.Dark);
                } else if (value === Mode.Light) {
                    setDarkMode(false);
                    applyMode(Mode.Light);
                } else {
                    localStorage.save(themeLocalStorageKey, darkMode ? Mode.Dark : Mode.Light);
                }
            })
            .catch(error => {
                localStorage.save(themeLocalStorageKey, darkMode ? Mode.Dark : Mode.Light);
            })
    }, [safeAsync]);


    const handleDarkModeChange = (event: NonCancelableCustomEvent<ToggleProps.ChangeDetail>) => {
        setDarkMode(event.detail.checked);
        applyMode(event.detail.checked ? Mode.Dark : Mode.Light);
        localStorage.save(themeLocalStorageKey, event.detail.checked ? Mode.Dark : Mode.Light);
    }

    return (
        <div style={{ position: 'fixed', right: 0, zIndex: 90, padding: designTokens.spaceScaledL }}>
            <Toggle
                onChange={handleDarkModeChange}
                checked={darkMode}
            >
                <Icon svg={<svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M12.8166 9.79921C12.8417 9.75608 12.7942 9.70771 12.7497 9.73041C11.9008 10.164 10.9392 10.4085 9.92054 10.4085C6.48046 10.4085 3.69172 7.61979 3.69172 4.17971C3.69172 3.16099 3.93628 2.19938 4.36989 1.3504C4.39259 1.30596 4.34423 1.25842 4.3011 1.28351C2.44675 2.36242 1.2002 4.37123 1.2002 6.67119C1.2002 10.1113 3.98893 12.9 7.42901 12.9C9.72893 12.9 11.7377 11.6535 12.8166 9.79921Z"
                        fill="white"
                        stroke="white"
                        strokeWidth="2"
                        className="filled"
                    />
                </svg>} />
            </Toggle>
        </div>
    );
}
export default ThemeToggle;