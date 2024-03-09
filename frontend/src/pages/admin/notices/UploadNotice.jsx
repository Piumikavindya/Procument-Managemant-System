import { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import React from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import InputForm from "../../../components/NoticeInputForm";
import ManageNotices from './ManageNotices';


export default function UploadNotice() {

    const [open, setOpen] = useState(true);
    const cancelButtonRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    const { enqueueSnackbar } = useSnackbar();
  
    const handleOutsideClick = () => {
      setOpen(false);
      navigate("/ManageNotice");
    };
    
    return (
      <div>
        <ManageNotices/>
        <Transition.Root show={open} as={Fragment}>
        <Dialog
            as="div"
            className="fixed inset-0 z-10 overflow-y-auto "
            initialFocus={cancelButtonRef}
            onClose={() => handleOutsideClick()} // Use onClose to handle both closing and navigating
            static // Add the static prop here
          >   
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>
  
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div >
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                <Dialog.Panel>
                <InputForm/>
  
                  </Dialog.Panel>
                  {/* Render the PreviewUserCom component here */}
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      </div>
    );
}