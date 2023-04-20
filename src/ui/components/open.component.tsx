import { useNavigate } from 'react-router-dom'

export const OpenComponent = () => {
  const navigate = useNavigate()

  const handleOpenSave = async () => {
    const success = await window.HLSE.openSave()

    if (success) {
      navigate('/edit')
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-base-200">
      <label htmlFor="dropzone-file"
             className="shadow-[0px_0px_20px_22px_#00000024] mx-auto cursor-pointer flex w-full max-w-lg flex-col items-center rounded-xl border-2 border-solid border-pink bg-secondary p-6 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none"
             viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
        </svg>

        <h2 className="mt-4 text-xl font-medium text-white tracking-wide">Save file</h2>

        <p className="mt-2 text-white tracking-wide">Upload your hogwarts legacy save file</p>

        <hr className="rounded"/>
        <p className="mt-2 text-[9px] text-white tracking-wide">Non cracked users save file location: %localappdata%/Hogwarts Legacy/Saved/SaveGames/...</p>
        <p className="mt-2 text-[9px] text-white tracking-wide">Cracked users save file location: %localappdata%/Phoenix/Saved/SaveGames/...</p>
        <button id="dropzone-file" className="hidden" onClick={handleOpenSave}/>
      </label>
    </main>
  );
}
