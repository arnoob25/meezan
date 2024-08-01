import SpacesPage from "../spaces-page/SpacesPage";
import NavBottom from "../spaces-page/components/NavBottom";
import ModalSpaces from "../spaces-page/components/ModalSpaces";
import { MainContextProvider } from "./helpers/contexts";
import TodayPage from "../today-page/TodayPage";

const MainPage = () => {
    return (
        <div className="md:max-w-[500px] md:mx-auto bg-light2 h-screen flex flex-col gap-3">
            <MainContextProvider>
                <ModalSpaces />
                <TodayPage/>
                <SpacesPage />
                <NavBottom />
            </MainContextProvider>
        </div>
    );
};

export default MainPage;
