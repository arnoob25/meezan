/* import { Icon } from "@iconify-icon/react/dist/iconify.js"; */
import useMainPageContext from "../../pages/main-page/helpers/contexts";

const NavbarBottom = () => {
    const { activeView, setActiveView } = useMainPageContext()

    return (
        <div className="nav-bottom-container bg-light1 rounded-t-lg px-5 py-3 flex justify-between items-center gap-3">
            <div className="w-32 flex justify-start">
                <button onClick={() => setActiveView(false)} className={`px-2 py-1 rounded-lg ${activeView ? "" : "bg-light2 font-semibold"}`}>
                    Today
                </button>
            </div>
            <button className="bg-light2 rounded-full size-7 flex justify-center items-center">
                x {/* <Icon icon="hugeicons:plus-sign" /> */}
            </button>
            <div className="w-32 flex justify-end items-center gap-3">
                <button
                    className={`px-2 py-1 rounded-lg ${activeView ? "bg-light2 font-semibold" : ""}`}
                    onClick={() => setActiveView(true)}
                >
                    Spaces
                </button>
            </div>
        </div>
    );
};

export default NavbarBottom;
