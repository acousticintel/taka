import { Fragment, useRef, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';
//custom
import { useData } from '../context/dataContext';
import SelectDropdown from './comps/selectdropdown';


export default function Modal() {
  const { modal, onSetModal, uploadPost } = useData();
  const filePickerRef = useRef(null);
  const captionRef = useRef(null);
  const [cat, setCat] = useState('Phone');
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => { }, [])

  const uploadPostCall = () => {
    if (loading) return;
    setLoading(true);
    uploadPost(cat, selectedFile).then(res => {
      if (res.status === 200) {
        onSetModal(false);
        setLoading(false);
        setSelectedFile(null);
      }else if(res.status === 500){
        console.log(res.mes)
      }
    })
  }

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    };

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  const handleChange = (e) => {
    if(e.value) setCat(String(e.value))
  };

  return (
    <Transition.Root show={modal} as={Fragment}>
      <Dialog
        as='div'
        className='fixed z-10 inset-0 overflow-y-auto text-gray-800'
        onClose={onSetModal}
      >
        <div className='flex items-center justify-center min-h-[808px] sm:min-h-screen'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
          </Transition.Child>
          {/* This elenent is to trick the browser into centering the modal contents. */}
          <span
            className='hidden sm:inline-block sm:align-middle sm:h-screen'
            aria-hidden='true'>
            &#8203;
          </ span>

          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            enterTo='opacity-100 translate-y-0 sm:scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 translate-y-0 sm:scale-100'
            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
          >
            <div
              className='inline-block align-bottom bg-white rounded-lg px-4
                pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all
                sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6'>
              <div className='mt-3 text-center sm:mt-5'>
                <Dialog.Title
                  as='h3'
                  className='text-lg leading-6 font-medium text-gray-900'
                >
                  Select a Category
                </Dialog.Title>
                {/**
                 * <div className='mt-4 mb-6'>
                  <input
                    className='border-none p-3 focus:ring-0 w-full text-center'
                    type='text'
                    ref={captionRef}
                    placeholder='Please enter a caption...'
                  />
                </div>
                 */}
                <div>
                  <input
                    ref={filePickerRef}
                    type='file'
                    hidden
                    onChange={addImageToPost}
                  />
                </div>
                <div className='my-6'>
                  <SelectDropdown
                    value={cat}
                    list={['Phone', 'Laptop', 'Computer', 'Other']}
                    change={handleChange}
                  />
                </div>
              </div>
              {
                selectedFile ? (
                  <div className='relative'>
                    <div className='relative max-w-60 h-60 rounded-md overflow-hidden'>
                      <Image src={selectedFile} layout='fill'  alt='' />
                    </div>
                    <button
                      className='absolute z-20 bg-red-400 -top-2 -right-2 p-1 rounded-full
                        transform scale-95 hover:scale-110 duration-200'
                      onClick={() => setSelectedFile(null)}
                    >
                      <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6 text-white' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z' />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <div className='flex justify-center mt-8'>
                    <div className='rounded-lg bg-gray-50 lg:w-1/2'>
                      <div className='m-4'>
                        <Dialog.Title
                          as='h3'
                          className='text-lg text-center leading-6 font-medium text-gray-500 py-4'
                        >
                          Upload Image (jpg,png,svg,jpeg)
                        </Dialog.Title>
                        <div
                          className='flex items-center justify-center w-full'
                          onMouseDown={() => filePickerRef.current.click()}
                        >
                          <label className='flex flex-col w-full h-32 border-4 border-dashed hover:bg-gray-100 hover:border-gray-300'>
                            <div className='flex flex-col items-center justify-center pt-7'>
                              <svg xmlns='http://www.w3.org/2000/svg'
                                className='w-12 h-12 text-gray-400 group-hover:text-gray-600' viewBox='0 0 20 20'
                                fill='currentColor'>
                                <path fillRule='evenodd'
                                  d='M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z'
                                  clipRule='evenodd' />
                              </svg>
                              <p className='pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600'>
                                Select a photo</p>
                            </div>
                            <input type='file' className='opacity-0' />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              }
              <div className='mt-5 sm:mt-6 flex justify-center'>
                <button
                  type='button'
                  disabled={!selectedFile}
                  className='inline-flex justify-center items-center w-2/3 rounded-md
                    border border-transparent shadow-sm px-3 py-4 bg-red-400
                    text-base font-medium focus:ring-2 focus:ring-offset-2
                    focus:ring-red-500 sm:text-sm text-white hover:bg-red-500
                    focus:outline-none disabled:bg-gray-300 
                    disabled:cursor-not-allowed hover:disabled:bg-gray-300
                    transition-all transform scale-95 hover:scale-105 duration-200'
                  onClick={uploadPostCall}
                >
                  {loading ? 'Uploading..' : 'Upload Post'}
                </button>
              </div>

            </div>
          </Transition.Child>
        </div>
      </Dialog >
    </Transition.Root >
  )
}