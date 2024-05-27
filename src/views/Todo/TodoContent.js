import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import AddNewTask from "./components/AddNewTask";
import { useSelector } from "react-redux";
import TodosList from "./components/TodosList";
import { useDispatch } from "react-redux";
import { getTodosList } from "../../redux/services/todo";
import TaskInfo from "./components/TaskInfo";
import { getUsers } from "../../redux/services/users";
import _ from "lodash";

const TodoContent = () => {
  const [usersData, setUsersData] = useState([]);
  const [todosData, setTodosData] = useState([]);
  const [todosData_, setTodosData_] = useState([]);
  const [showTaskInfo, setShowTaskInfo] = useState(false);
  const { token, user } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.user);
  const { todos, todoDetails } = useSelector((state) => state.todo);
  const dispatch = useDispatch();
  useEffect(() => {
    if (users?.length > 0) {
      const data = users?.filter(
        (u) =>
          _.toInteger(u.parent_id) === user.id ||
          _.toInteger(u.client_id) === user.id
      );
      setUsersData(data);
    }
  }, [users, user]);
  useEffect(() => {
    const todosArray = [];
    todos?.length > 0 &&
      todos?.map((todo, index) => {
        todo?.asign_to?.members?.map((mem, index) => {
          if (mem.id === user.id) {
            todosArray.push(todo);
          }
        });
      });

    const data = user?.role === "AGENT" ? todosArray : todos;
    const todosByDate = data?.reduce((acc, todo) => {
      const date = todo.created_at.split("T")[0]; // Assuming created_at is in ISO 8601 format
      acc[date] = acc[date] || [];
      acc[date].push(todo);
      return acc;
    }, {});
    setTodosData(todosByDate);
    setTodosData_(todos);
  }, [todos, user]);
  useEffect(() => {
    dispatch(getTodosList(token));
    dispatch(getUsers(token));
  }, [dispatch, token]);
  const onDataFromChild = (value) => {
    setShowTaskInfo(value);
  };
  const handlePaginationDataFromChild = (data) => {
    // setTodosData_(data);
  };
  return (
    <div class="hk-pg-wrapper pb-0">
      {/* <!-- Page Body --> */}
      <div class="hk-pg-body py-0">
        <div class="todoapp-wrap todoapp-info-active">
          <Sidebar />
          <div class="todoapp-content">
            <div class="todoapp-detail-wrap">
              <Header authUser={user} />
              <div class="todo-body">
                <div data-simplebar class="nicescroll-bar">
                  <TodosList
                    todosData={todosData}
                    token={token}
                    dispatch={dispatch}
                    onDataFromChild={onDataFromChild}
                    todosData_={todosData_}
                    paginationDataFromChild={handlePaginationDataFromChild}
                  />
                </div>
              </div>
              {showTaskInfo && (
                <TaskInfo
                  todoDetails={todoDetails}
                  onDataFromChild={onDataFromChild}
                  dispatch={dispatch}
                  usersData={usersData}
                  token={token}
                />
              )}
            </div>
            {/* <!-- Edit Info --> */}
            <AddNewTask token={token} usersData={usersData} user={user} />
            {/* <!-- /Edit Info --> */}
          </div>
        </div>
      </div>
      {/* <!-- /Page Body --> */}
    </div>
  );
};

export default TodoContent;
