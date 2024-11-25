import ListCard from "./ListCard";

const ListsContainer = ({ lists, tasks, cardRefs, containerRef, showNewTaskModal, onEdit, onDelete, onEditList, onDeleteList, onCompleted }) => {
    return (
        <div className="bg-[#D4EBF8] w-full h-full">
            <h2 className="font-bold px-5 py-2 border-b-[2px] border-[#1F509A]">
                My Lists
            </h2>

            <div
                ref={ containerRef }
                className="h-full py-5 pl-5 flex gap-3 items-start overflow-x-scroll pr-[600px] lg:pr-[300px]"
            >
                {lists.map((listItem) => (
                    <ListCard
                        key={listItem.id}
                        list={listItem}
                        tasks={tasks.filter((task) => task.listId === listItem.id)}
                        showNewTaskModal={showNewTaskModal}
                        onDeleteTask = { onDelete }
                        onEditTask = { onEdit }
                        onEditList = { onEditList }
                        onDeleteList = { onDeleteList }
                        onCompleted = { onCompleted }
                        ref={(el) => (cardRefs.current[listItem.id] = el)} // Attach ref to each card
                    />
                ))}
            </div>
        </div>
    );
};

export default ListsContainer;