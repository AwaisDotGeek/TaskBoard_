const SidePanel = ({ lists, scrollToCard, showNewListModal }) => {
    return (
        <div className="h-full bg-[#1F509A] text-white min-w-[250px] flex flex-col justify-between shadow-md border-r-[1px] border-gray-300">
            {/* Header */}
            <div className="border-b-[2px] border-[#D4EBF8]">
                <h2 className="text-center py-2 font-bold tracking-wide">Lists</h2>
            </div>

            {/* List Items */}
            <ul className="mt-2 flex flex-col max-h-[650px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
                {lists.map((listItem) => (
                    <li
                        className="pl-5 py-2 font-medium tracking-wider cursor-pointer hover:bg-[#0A3981] hover:pl-6 transition-all duration-200"
                        key={listItem.id}
                        onClick={() => scrollToCard(listItem.id)}
                    >
                        {listItem.name}
                    </li>
                ))}
            </ul>

            {/* Footer Button */}
            <div className="w-full flex justify-center py-4 border-t-[1px] border-gray-400">
                <button
                    onClick={() => {
                        showNewListModal(true);
                    }}
                    className="bg-[#E38E49] text-white font-semibold px-6 py-2 rounded-md shadow hover:bg-[#ca742b] transition-colors duration-200"
                >
                    Add New List
                </button>
            </div>
        </div>
    );
};

export default SidePanel;
