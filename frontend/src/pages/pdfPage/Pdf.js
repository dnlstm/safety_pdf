import React from 'react';
import {Document, Page, Text, View, StyleSheet, Font} from '@react-pdf/renderer';
import Pretendard from './Pretendard-Regular.ttf';

// Pretendard 폰트 등록
Font.register({
    family: 'Pretendard',
    src: Pretendard
});

const styles = StyleSheet.create({
    page: {
        padding: 20,
        display: 'flex',

        fontFamily: 'Pretendard'
    },
    table: {
        display: 'flex',
        flexDirection: 'column',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0
    },
    tableRow: {
        flexDirection: 'row'
    },
    tableColHeader: {
        flex: 1,
        borderStyle: 'solid',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        backgroundColor: '#00529b',
        color: 'white',
        padding: 5,
        textAlign: 'center'
    },
    tableCol: {
        flex: 1,
        borderStyle: 'solid',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        padding: 5
    },
    tableCellHeader: {
        fontSize: 12,
        fontWeight: 'bold',
        color: 'white'
    },
    tableCell: {
        fontSize: 10,
        padding: 5
    },
    sectionHeader: {
        backgroundColor: '#0077c0',
        color: 'white',
        padding: 5,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14
    },
    verticalText: {
        writingMode: 'vertical-rl',
        fontSize: 10,
        textAlign: 'center',
        lineHeight: '10px'
    },
    section: {
        flex: 0.3, // View 컴포넌트가 flexbox에 의해 균등하게 배치되도록 설정
        margin: 10,
        padding: 10,
        border: '1pt solid black',
        backgroundColor: '#ffffff'
    }
});

const MyDocument = () => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.sectionHeader}>
                <Text>소화설비 현황</Text>
            </View>
            <View style={styles.table}>
                <View style={styles.tableRow}>
                    <View style={[styles.tableColHeader, {flex: 0.1}]}>
                        <Text style={styles.tableCellHeader}>항목</Text>
                    </View>
                    <View style={styles.tableColHeader}>
                        <Text style={styles.tableCellHeader}>소화설비명</Text>
                    </View>
                    <View style={styles.tableColHeader}>
                        <Text style={styles.tableCellHeader}>해당여부</Text>
                    </View>
                    <View style={styles.tableColHeader}>
                        <Text style={styles.tableCellHeader}>특기사항</Text>
                    </View>
                    <View style={styles.tableColHeader}>
                        <Text style={styles.tableCellHeader}>비고</Text>
                    </View>
                </View>

                <View style={styles.tableRow}>
                    <View style={[styles.tableCol, {flex: 0.1, backgroundColor: '#d3e6f2'}]}>
                        <Text style={styles.verticalText}>소화설비</Text>
                    </View>
                    <View style={{flex: 0.9}}>
                        {['수동식소화기구', '자동식소화기구', '간이스프링클러설비', '옥내소화전설비', '호스', '호스릴'].map((item, index) => (
                            <View style={styles.tableRow} key={index}>
                                <View style={[styles.tableCol, {flex: 0.25}]}>
                                    <Text style={styles.tableCell}>{index === 0 ? '소화기구' : ''}</Text>
                                </View>
                                <View style={[styles.tableCol, {flex: 0.25}]}>
                                    <Text style={styles.tableCell}>{item}</Text>
                                </View>
                                <View style={[styles.tableCol, {flex: 0.25}]}>
                                    <Text style={styles.tableCell}>해당</Text>
                                </View>
                                <View style={[styles.tableCol, {flex: 0.25}]}>
                                    <Text style={styles.tableCell}>해당 없음</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>

                <View style={styles.tableRow}>
                    <View style={[styles.tableCol, {flex: 0.1, backgroundColor: '#d3e6f2'}]}>
                        <Text style={styles.verticalText}>물분무 소화설비 등</Text>
                    </View>
                    <View style={{flex: 0.9}}>
                        {['포소화전', '이산화탄소소화설비', '할론소화설비', '할로겐화합물/불활성기체', '고체에어로졸', '물분무·미분무소화설비', '분말·소화설비'].map((item, index) => (
                            <View style={styles.tableRow} key={index}>
                                <View style={[styles.tableCol, {flex: 0.25}]}>
                                    <Text style={styles.tableCell}>{index === 0 ? '포소화설비' : ''}</Text>
                                </View>
                                <View style={[styles.tableCol, {flex: 0.25}]}>
                                    <Text style={styles.tableCell}>{item}</Text>
                                </View>
                                <View style={[styles.tableCol, {flex: 0.25}]}>
                                    <Text style={styles.tableCell}>해당</Text>
                                </View>
                                <View style={[styles.tableCol, {flex: 0.25}]}>
                                    <Text style={styles.tableCell}>해당 없음</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            </View>
        </Page>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <Text>소화설비 현황</Text>
            </View>
            <View style={styles.section}>
                <Text>소화설비 현황</Text>
            </View>
        </Page>
    </Document>
);

export default MyDocument;
