export const ModalStyles = (width, height, bgcolor) => {
    return {
        overlay: {
            backgroundColor: ' rgba(0, 0, 0, 0.8)',
            width: '100%',
            height: '100vh',
            zIndex: '10',
            position: 'fixed',
            top: '0',
            left: '0'
        },
        content: {
            width: width,
            height: height,
            zIndex: '150',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: '10px',
            // boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.25)',
            backgroundColor: bgcolor,
            // justifyContent: 'center',
            overflow: 'auto',
            animation: 'fade-top 0.5s ease-in-out',
            border: 'none',
            padding: '0'
        }
    };
};
