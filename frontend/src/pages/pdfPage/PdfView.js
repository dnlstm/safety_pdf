import {PDFViewer} from '@react-pdf/renderer';
import styles from './PdfView.module.scss';
import Pdf from './Pdf';
import React from 'react';

const PdfView = () => {
    return (
        <PDFViewer className={styles.pdfviewWer}>
            <Pdf />
        </PDFViewer>
    );
};

export default React.memo(PdfView);
