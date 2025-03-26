import React from 'react';
import { Storage_Url } from './constants';

const App = () => {
  return (
    <div className="mx-auto font-sans max-w-7xl">
      <header className="flex justify-between p-4">
        <a href="/" className="text-2xl font-semibold">
          QuickFill
        </a>
        <a
          className="link link:hover"
          href="https://github.com/atulsmania/quick-fill/releases/tag/v1.0.0"
        >
          v1.0.0
        </a>
      </header>

      <section className="flex flex-col items-center max-w-5xl gap-4 mx-auto pt-28">
        <div className="flex flex-col justify-between gap-8 px-4 text-center">
          <h1 className="flex flex-col text-3xl font-bold md:text-6xl">
            Save your shortcuts <br />
            Replace effortlessly in any input field.
          </h1>
          <p className="text-xl md:text-2xl text-neutral-500">
            Creating your own shortcuts has never been easier, faster, and more secure. <br />
            Add, remove, edit, and enjoy.
          </p>
          <div className="flex justify-center">
            <a
              role="button"
              className="btn btn-neutral"
              href="https://github.com/atulsmania/quick-fill"
            >
              Learn More
            </a>

            <button
              className="ml-4 btn"
              onClick={() => document.getElementById('video_modal').showModal()}
            >
              Watch Video
            </button>

            <dialog id="video_modal" className="modal">
              <div className="max-w-3xl p-0 modal-box">
                <video className="w-full h-full" controls muted autoPlay>
                  <source src={`${Storage_Url}/1717711378800.mp4`} type="video/mp4" />
                </video>
              </div>
              <form method="dialog" className="modal-backdrop">
                <button>close</button>
              </form>
            </dialog>
          </div>
        </div>
      </section>

      <section className="container max-w-5xl px-6 py-6 mx-auto mt-12">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="p-6 text-center rounded-lg shadow-md ">
            <h3 className="mb-4 text-2xl font-semibold">Store Shortcuts</h3>
            <p>Store shortcuts as key-value pairs for quick access.</p>
          </div>
          <div className="p-6 text-center rounded-lg shadow-md ">
            <h3 className="mb-4 text-2xl font-semibold">Auto-Complete</h3>
            <p>
              Auto-complete values in input fields with a<kbd className="mx-2 kbd">.</kbd>
              symbol.
            </p>
          </div>
          <div className="p-6 text-center rounded-lg shadow-md ">
            <h3 className="mb-4 text-2xl font-semibold">Manage Shortcuts</h3>
            <p>Edit, delete, and add new shortcuts easily.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;
