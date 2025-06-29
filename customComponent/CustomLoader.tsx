import React from 'react';

type LoaderProps = {
    size?: number | string;
    position?: 'center' | 'left' | 'right' | 'inline';
    className?: string;
    loaderImage?: React.ReactNode; // Accepts JSX like <img />, <svg />, etc.
};

const Loader: React.FC<LoaderProps> = ({
    size = 40,
    position = 'center',
    className,
    loaderImage,
}) => {
    const loaderSize = typeof size === 'number' ? `${size}px` : size;

    const wrapperStyle: React.CSSProperties = {
        display: position === 'inline' ? 'inline-flex' : 'flex',
        alignItems: 'center',
        justifyContent:
            position === 'center'
                ? 'center'
                : position === 'left'
                    ? 'flex-start'
                    : position === 'right'
                        ? 'flex-end'
                        : undefined,
        padding: '8px',
    };

    const defaultLoader = (
        <img
            src="/assets/loader.svg" // Adjust path to your default loader
            alt="Loading..."
            style={{ width: loaderSize, height: loaderSize }}
        />
    );

    return (
        <div style={wrapperStyle} className={className}>
            {loaderImage ? (
                React.cloneElement(loaderImage as React.ReactElement, {
                    style: { width: loaderSize, height: loaderSize, ...(loaderImage as any).props?.style },
                })
            ) : (
                defaultLoader
            )}
        </div>
    );
};

export default Loader;



/**
    * Default Loader: <Loader size={60} position="center" />
    * Custom Inline SVG: <Loader
    size={30}
    position="inline"
    loaderImage={
        <svg viewBox="0 0 50 50">
        <circle cx="25" cy="25" r="20" stroke="#333" strokeWidth="5" fill="none" />
        </svg>
    }
    />
    *Custom Image: <Loader
    size={40}
    position="right"
    loaderImage={<img src="/custom/spinner.gif" alt="spinner" />}
    />

 */
