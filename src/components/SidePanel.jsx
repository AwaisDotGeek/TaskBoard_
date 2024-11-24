const SidePanel = ({ lists, scrollToCard, showNewListModal }) => {
    return (
        <div className="h-full bg-[#1F509A] text-white min-w-[250px] flex flex-col justify-between">
            <div>
                <h2 className="text-center py-2 font-bold tracking-wider border-b-[2px] border-[#D4EBF8]">Lists</h2>
                <ul className="mt-2"> 
                    {
                        lists.map((listItem) => {
                            return(
                                <li className="pl-5 py-1 font-semibold tracking-wider cursor-pointer hover:bg-[#0A3981] hover:tracking-widest"
                                    key={listItem.id}
                                    onClick={() => scrollToCard(listItem.id)}
                                >
                                    { listItem.name }
                                </li>
                            );
                        })
                    }
                </ul>
            </div>

            <div className="w-full flex justify-center py-2 mb-2">
                <button 
                    onClick={() => { showNewListModal(true) }}
                    className="bg-[#E38E49] text-white font-semibold w-50 px-3 py-1 rounded-md">Add New List</button>
            </div>
        </div>
    );
}

export default SidePanel;