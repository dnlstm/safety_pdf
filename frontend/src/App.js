import EvaluatePageWaterResult from 'pages/evaluatePageWaterResult/EvaluatePageWaterResult';
import IdSearchPage from 'pages/idSearchPage/IdSearchPage';
import InquiryPage from 'pages/inquiryPage/InquiryPage';
import LoginPage from 'pages/loginPage/LoginPage';
import Layout from 'pages/mainPage/Layout';
import ListPage from 'pages/mainPage/ListPage';
import OptionPage from 'pages/optionPage/OptionPage';
import PwSearchPage from 'pages/pwSearchPage/PwSearchPage';
import RegisterPage from 'pages/registerPage/RegisterPage';
import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import PdfView from 'pages/pdfPage/PdfView';
import EvaluateSituation from 'pages/evaluatePageSituation/EvaluateSituation';
import Gnb from 'components/main/gnb/Gnb';
import {NavigateTo} from 'lib/navigateTo/NavigateTo';
import EquipmentSituation from 'pages/equipmentSituation/EquipmentSituation';
import EvaluatePageWaterResult2 from 'pages/evaluatePageWaterResult2/EvaluatePageWaterResult2';
import EvaluatePageGasResult from 'pages/evaluatePageGasResult/EvaluatePageGasResult';
import {NavigateTo2} from 'lib/navigateTo/NavigateTo2';
import {Navigateresult2} from 'lib/navigateTo/Navigateresult2';
import Table from 'components/main/table/Table';
import IsLogin from 'pages/islogin/IsLogin';
// import './assets/sass/style.scss';

const App = () => {
    return (
        <Routes>
            <Route element={<IsLogin />}>
                <Route path="/" element={<LoginPage />} />
                <Route path="/id" element={<IdSearchPage />} />
                <Route path="/pw" element={<PwSearchPage />} />
                <Route path="/register" element={<RegisterPage />} />
            </Route>

            <Route path="/list" element={<ListPage />} />
            <Route path="/:id/pdfView" element={<PdfView />} />

            <Route element={<Layout />}>
                <Route element={<Gnb />}>
                    <Route path="/:id/buildingSituation" element={<EvaluateSituation />} />
                    <Route path="/:id/equipmentSituation" element={<EquipmentSituation />} />
                    <Route path="/:id/evaluate/water/result/:page" element={<EvaluatePageWaterResult />} />
                    <Route path="/:id/evaluate/water/result2/:page" element={<EvaluatePageWaterResult2 />} />
                    <Route path="/:id/evaluate/gas/result/:page" element={<EvaluatePageGasResult />} />
                    <Route path="/:id/evaluate/water/result/" element={<NavigateTo />} />
                    <Route path="/:id/evaluate/water/result2/" element={<Navigateresult2 />} />
                    <Route path="/:id/evaluate/gas/result/" element={<NavigateTo2 />} />
                    <Route path="*" element={<Navigate to={'/list'} replace />} />
                </Route>
                <Route path="/inquiry" element={<InquiryPage />} />

                <Route path="/option" element={<OptionPage />} />
                <Route path="*" element={<Table />} />
            </Route>

            <Route path="*" element={<LoginPage />} />
        </Routes>
    );
};

export default App;
