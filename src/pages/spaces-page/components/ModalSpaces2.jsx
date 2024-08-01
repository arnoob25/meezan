"use client";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import React, { useState } from 'react';

const ModalSpaces = () => {

    const [modal, setModal] = useState(0);

    function openModal() {
        setModal(1);
    }
    function closeModal() {
        setModal(0);
    }

    return (
        <div className="modal-spaces-container">
            <div className={`modal-container bg-light1 rounded-t-lg w-full flex flex-col z-10 ${modal ? "absolute bottom-0 left-0" : "hidden"}`}>
                <div className="flex justify-between items-center gap-3 px-5 py-4">
                    <div className="title text-xs">Spaces</div>
                    <button className="bg-light2 rounded-full size-7 flex justify-center items-center">
                        <Icon icon="hugeicons:plus-sign" />
                    </button>
                </div>
                <div className="flex flex-col max-h-[70svh] overflow-y-scroll">
                    <button className="text-left font-semibold bg-light2 px-5 py-4 flex justify-between items-center gap-3">
                        Learning
                        <div className="flex items-center gap-3 text-lg">
                            <button className="bg-light1 rounded-full size-10 flex justify-center items-center">
                                <Icon icon="hugeicons:pencil-edit-02" />
                            </button>
                            <button className="bg-light1 rounded-full size-10 flex justify-center items-center">
                                <Icon icon="hugeicons:delete-03" />
                            </button>
                        </div>
                    </button>
                    <button className="text-left font-semibold px-5 py-4 flex justify-between items-center gap-3">
                        Exercise
                        <div className="flex items-center gap-3 text-lg">
                            <button className="bg-light2 rounded-full size-10 flex justify-center items-center">
                                <Icon icon="hugeicons:pencil-edit-02" />
                            </button>
                            <button className="bg-light2 rounded-full size-10 flex justify-center items-center">
                                <Icon icon="hugeicons:delete-03" />
                            </button>
                        </div>
                    </button>
                </div>
            </div>
            <button className={`modal-close cursor-default w-screen h-screen bg-dark1/30 backdrop-blur-lg ${modal ? "absolute top-0 left-0" : "hidden"}`} onClick={closeModal}></button>
            <button className="modal-trigger w-full text-xl text-left font-semibold px-3 pt-2 flex items-center gap-1" onClick={openModal}>Learning<Icon className="mt-1" icon="hugeicons:arrow-down-01" /></button>
        </div>
    );
};

export default ModalSpaces;