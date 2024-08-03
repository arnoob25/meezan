"use client";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"


const ModalSpaces = () => {
    return (
        <Drawer>
            <DrawerTrigger>
                <div className="modal-trigger w-full text-xl text-left font-semibold px-3 pt-2 flex items-center gap-1">
                    Learning<Icon className="mt-1" icon="hugeicons:arrow-down-01" />
                </div>
            </DrawerTrigger>
            <DrawerContent>
                <div className="flex justify-between items-center gap-3 px-5 py-4">
                    <div className="title text-xs">Spaces</div>
                    <button className="bg-light2 rounded-full size-7 flex justify-center items-center">
                        <Icon icon="hugeicons:plus-sign" />
                    </button>
                </div>
                <div className="flex flex-col max-h-[70svh] overflow-y-scroll">
                    {/* TODO: 
                        Connect the database here
                        Combine these in one item
                        Using the index numbers, make the background, button colors switch
                        Create dialog boxes for edit and delete buttons
                    */}
                    <ModalSpacesItemOdd />
                    <ModalSpacesItemEven />
                </div>
            </DrawerContent>
        </Drawer>
    );
};


export default ModalSpaces;
const ModalSpacesItemOdd = () => {
    return (
        <button className="text-left font-semibold bg-light2 px-5 py-4 flex justify-between items-center gap-3">
            Learning
            <div className="flex items-center gap-3">
                <button className="bg-light1 rounded-full size-7 flex justify-center items-center">
                    <Icon icon="hugeicons:pencil-edit-02" />
                </button>
                <button className="bg-light1 rounded-full size-7 flex justify-center items-center">
                    <Icon icon="hugeicons:delete-03" />
                </button>
            </div>
        </button>
    )
}

const ModalSpacesItemEven = () => {
    return (
        <button className="text-left font-semibold px-5 py-4 flex justify-between items-center gap-3">
            Exercise
            <div className="flex items-center gap-3">
                <button className="bg-light2 rounded-full size-7 flex justify-center items-center">
                    <Icon icon="hugeicons:pencil-edit-02" />
                </button>
                <button className="bg-light2 rounded-full size-7 flex justify-center items-center">
                    <Icon icon="hugeicons:delete-03" />
                </button>
            </div>
        </button>
    )
}
