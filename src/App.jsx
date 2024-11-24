import { useEffect, useRef, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import SidePanel from './components/SidePanel'
import ListsContainer from './components/ListsContainer'
import Footer from './components/Footer'
import CreateNewList from './components/CreateNewList'
import CreateNewTask from './components/CreateNewTask'

import mockData from './assets/mockData.json'
function App() {
  const { mock_lists, mock_tasks } = mockData;
  const [lists, setLists] = useState(mock_lists);
  const [tasks, setTasks] = useState(mock_tasks);
  const cardRefs = useRef({});
  const containerRef = useRef(null);

  const [showCreateNewList_Modal, setShowCreateNewList_Modal] = useState(false);
  const [showCreateNewTask_Modal, setShowCreateNewTask_Modal] = useState(false);
  
  const [idOfListTheTaskIsBeingAddedTo, setIdOfListTheTaskIsBeingAddedTo] = useState(0);

  // This function helps scroll to a specific card
  const scrollToCard = (id) => {
    const targetRef = cardRefs.current[id];
    const container = containerRef.current;

    if (targetRef && container) {
      const targetPosition = targetRef.offsetLeft - container.scrollLeft;

      container.scrollTo({
          left: container.scrollLeft + targetPosition - container.clientWidth / 2 + targetRef.clientWidth / 2,
          behavior: "smooth",
      });
  }
  };

  // To show modal for creating new list
  const showNewListModal = (show) => { // show = true | false
    setShowCreateNewList_Modal(show);
  }

  // To show modal for creating new task
  const showNewTaskModal = (show, listId) => { // show = true | false
    setShowCreateNewTask_Modal(show);

    setIdOfListTheTaskIsBeingAddedTo(listId);
  }

  // Add new list
  const getListsFromStorage = () => {
    const storedList = localStorage.getItem('todos-lists');
    return storedList ? JSON.parse(storedList) : [];
  };

  const saveNewListToStorage = (listTitle) => {
    try {  
      const newListId = lists.length + 1; 
      const newList = {
        id: newListId,
        name: listTitle,
      };
  
      const storedList = getListsFromStorage();
      const updatedLists = [...storedList, newList];
  
      localStorage.setItem('todos-lists', JSON.stringify(updatedLists));
      setLists([...lists, newList]);
    } catch (error) {
      console.error('Error saving the new list:', error);
    }
  };

  const handleNewList = (listTitle) => {
    saveNewListToStorage(listTitle);
    // localStorage.clear();
  };

  // Add new Task
  const getTasksFromLocalStorage = () => {
    const storedTasks = localStorage.getItem('todos-tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
  }
  const saveNewTaskToStorage = (listDesc) => {
    try {  
      const newTaskId = tasks[tasks.length - 1].id + 1; 
      const newTask = {
        id: newTaskId,
        title: listDesc,
        listId: idOfListTheTaskIsBeingAddedTo,
        completed: false,
      };
  
      const storedTasks = getTasksFromLocalStorage();
      const updatedTasks = [...storedTasks, newTask];
  
      localStorage.setItem('todos-tasks', JSON.stringify(updatedTasks));
      setTasks([...tasks, newTask]);
    } catch (error) {
      console.error('Error saving the new list:', error);
    }
  };
  const handleNewTask = (taskDesc) => {
    saveNewTaskToStorage(taskDesc);
  }

  // Delete a Task
  const handleDeleteTask = (taskToDelete) => {
    if (taskToDelete.listId > mock_lists.length) {
      // update local storage also
    } else {
      const tasksToKeep = tasks.filter((task) => { return task.id !== taskToDelete.id });
      setTasks([...tasksToKeep]);
    }
  }

  // For Lists
  useEffect(() => {
    const storedLists = getListsFromStorage();
    setLists((prevLists) => {
        const uniqueStoredLists = storedLists.filter(
            (newList) => !prevLists.some((existingList) => existingList.id === newList.id)
        );
        return [...prevLists, ...uniqueStoredLists];
    });
  }, []);

  // For Tasks
  useEffect(() => {
    const storedTasks = getTasksFromLocalStorage();
    setTasks((prevTasks) => {
        const uniqueStoredTasks = storedTasks.filter(
            (newTask) => !prevTasks.some((existingTask) => existingTask.id === newTask.id)
        );
        return [...prevTasks, ...uniqueStoredTasks];
    });
  }, []);

  return (
    <div className='w-screen h-screen overflow-x-hidden flex flex-col justify-between'>
      <Navbar />

      <div className='flex h-full'>
        <SidePanel lists = { lists } scrollToCard = { scrollToCard } showNewListModal = { showNewListModal } />
        <ListsContainer 
          lists = { lists } 
          tasks = { tasks } 
          cardRefs = { cardRefs } 
          containerRef={ containerRef } 
          showNewTaskModal={ showNewTaskModal } 
          onDelete = { handleDeleteTask }
        />
      </div>

      <Footer />

      {/* Create New List Modal */}
      <CreateNewList isModalVisible={showCreateNewList_Modal} onSubmit={handleNewList} onClose={() => setShowCreateNewList_Modal(false)} />
      <CreateNewTask isModalVisible={showCreateNewTask_Modal} onSubmit={handleNewTask} onClose={() => setShowCreateNewTask_Modal(false)}/>
    </div>
  )
}

export default App
