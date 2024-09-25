export function SearchBar({ placeholder, background = "white" }) {
  let border;
  background == "white" ? (border = "lgray") : (border = "white");
  return (
    <>
      <div
        className={`flex gap-1 p-.5 pl-3 rounded text-gray items-center bg-${background} w-80 border border-${border}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
        <input
          type="text"
          placeholder={placeholder}
          className={`p-2 bg-${background} w-64`}
        />
      </div>
    </>
  );
}
